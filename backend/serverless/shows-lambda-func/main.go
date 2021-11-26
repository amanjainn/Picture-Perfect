package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/segmentio/ksuid"
)

type Show struct {
	 ShowId string    `json:"showId,omitempty" `
	 TheatreName string   `json:"theatreName,omitempty" `
	 TheatreLocation  string  `json:"theatreLocation,omitempty" `
	 CityName string   `json:"cityName,omitempty" `
	 ShowName  string   `json:"showName,omitempty" `
	 ShowImg string   `json:"showImg,omitempty" `
	 Time string   `json:"time,omitempty" `
	 Date  string  `json:"date,omitempty" `

}


var DBclient dynamodbiface.DynamoDBAPI

type Error struct{
	ErrorMsg *string `json:"error,omitempty"`
}

var (
	NOTABLETOFETCH = "Not able to fetch"
	NOTABLETOINSERT = "Not able to insert"
	NOTABLETOUPDATE = "Not able to update"
	NOTABLETODELETE = "Not able to delete"
	NOTABLETOUNMARSHAL = "Not able to unmarshal"
	NOTABLETOMARSHAL = "Not able to marshal"
	SUCCESS = "Success"
	INVALIDENDPOINT = "Invalid Endpoint"
)

const tableName = "shows"

func handler(req  events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse,error){
     switch true{
	 case req.HTTPMethod == "GET" && req.Path =="/shows" :
		return getShows(req);
	 case req.HTTPMethod == "POST" && req.Path == "/shows" :
		return createShows(req);
	 case req.HTTPMethod == "PATCH" && req.Path == "/shows" :
		return updateShow(req);
	 case req.HTTPMethod == "DELETE" && req.Path == "/shows" :
		return deleteShow(req);
	default : 
	  return handleDefault();
	}

}

/*******************************************************Api Gateway handlers start  ******************************************   */

func getShows(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
 
  showId := req.QueryStringParameters["showId"]	

  if len(showId) > 0 {
	  result,err := DBFetchShow(req,showId);
	  if err!=nil{
		  return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
	  }
	  return sendResponse(http.StatusOK,result);
  }
	
   result, err := DBFetchShows(req);
   if err!=nil{
	   return sendResponse(http.StatusBadRequest,Error{aws.String(err.Error())})
   }
   return sendResponse(http.StatusOK,result);

}

func createShows(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
	result,err := DBCreateShow(req);
	if err!=nil{
		return sendResponse(http.StatusBadRequest, Error{aws.String(err.Error())})
	}
	return sendResponse(http.StatusCreated,result) 

}

func updateShow(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
 
  showId := req.QueryStringParameters["showId"]	
  if len(showId) > 0 {
	  result,err := DBUpdateShow(req,showId);
	  if err!=nil{
		  return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOUPDATE))
	  }
	  return sendResponse(http.StatusOK,result);
  }	
   return sendResponse(http.StatusBadRequest,errors.New(NOTABLETOUPDATE));

}

func deleteShow(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
   showId := req.QueryStringParameters["showId"]	
  if len(showId) > 0 {
	  err := DBDeleteShow(req,showId);
	  if err!=nil{
		  return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE))
	  }
	  return sendResponse(http.StatusOK,SUCCESS);
  }	
   return sendResponse(http.StatusBadRequest,errors.New(NOTABLETODELETE));

}


func handleDefault() (*events.APIGatewayProxyResponse,error){
	return sendResponse(http.StatusMethodNotAllowed,INVALIDENDPOINT);
}

/* ```````````````````````````````Database Crud operations  ```````````````````````````````````````   */
//Fetch a show 
func DBFetchShow(req events.APIGatewayProxyRequest,showId  string) (*Show,error){
   result,err := DBclient.GetItem(&dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"showId":{
				S: aws.String(showId),
			},
		},
		TableName : aws.String(tableName)})
	if err!=nil {
		return nil, errors.New(NOTABLETOFETCH)
	}	

	item := new(Show);
	err = dynamodbattribute.UnmarshalMap(result.Item,&item);
	if err!=nil{
		return nil,errors.New(NOTABLETOFETCH)
	}
	return item,nil
}

//Update a show
func DBUpdateShow(req events.APIGatewayProxyRequest,showId  string) (*Show,error){
     var u Show ;
   if err := json.Unmarshal([]byte(req.Body),&u); err!=nil{
	    return nil,errors.New(NOTABLETOUNMARSHAL)
   }

   u.ShowId = showId
   av,err := dynamodbattribute.MarshalMap(u);
   if err !=nil{
	   return nil,errors.New(NOTABLETOMARSHAL)
   }

   _,err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item : av,
		TableName : aws.String(tableName),
     })
   if err !=nil{
	   return nil,errors.New(NOTABLETOUPDATE)
   }
	 return &u, nil;

}

//Delete a show
func DBDeleteShow(req events.APIGatewayProxyRequest,showId  string) (error){
    
	 _,err := DBclient.DeleteItem(&dynamodb.DeleteItemInput{
		 Key : map[string]*dynamodb.AttributeValue{
			  "showId":{
				  S: aws.String(showId),
			  },
		 },
		 TableName : aws.String(tableName),
	 })
	 if err!= nil{
		 return errors.New(NOTABLETODELETE)
	 }
	 return nil;
}

//Fetch all shows
func DBFetchShows (req events.APIGatewayProxyRequest) (*[]Show,error) {
   result,err := DBclient.Scan(&dynamodb.ScanInput{
	   TableName: aws.String(tableName),
   })

   if err!=nil{
		return nil,errors.New(NOTABLETOFETCH)
   }
   item :=  new([]Show)
   err = dynamodbattribute.UnmarshalListOfMaps(result.Items,item)
   if err!=nil{
	   return nil,errors.New(NOTABLETOFETCH)
   }

   return item,nil
}

//Create a show
func DBCreateShow (req events.APIGatewayProxyRequest) (*Show,error) {
   var u Show ;
   if err := json.Unmarshal([]byte(req.Body),&u); err!=nil{
	    return nil,errors.New(NOTABLETOUNMARSHAL)
   }
   var id  = ksuid.New()
   u.ShowId = id.String()
   av,err := dynamodbattribute.MarshalMap(u);
   if err !=nil{
	   return nil,errors.New(NOTABLETOMARSHAL)
   }

   _,err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item : av,
		TableName : aws.String(tableName),
     })
   if err !=nil{
	   return nil,errors.New(NOTABLETOINSERT)
   }
	 return &u, nil;
}

/* `````````````````````````````` Response for API-GATEWAY ```````````````````````````````````````   */

func sendResponse(status int, body interface{}) (*events.APIGatewayProxyResponse,error){
    stringBody,_ :=json.Marshal(body)
	return &events.APIGatewayProxyResponse{
	   Headers : map[string]string {"Content-Type" :"application/json"},
	   StatusCode: status ,
	   Body : string(stringBody),
	},nil	
}

func main(){
	 awsSession, err := session.NewSession(&aws.Config{
		 Region: aws.String("us-east-2")},
	 )
	 if err!=nil{
		 log.Fatal("Not found")
	 }
	 DBclient = dynamodb.New(awsSession)
	 lambda.Start(handler);

}