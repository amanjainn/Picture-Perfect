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


var DBclient dynamodbiface.DynamoDBAPI

type Movie struct {
	  MovieId  string  `json:"movieId,omitempty"`
	  MovieName string  `json:"movieName,omitempty"`
	  MovieImage string  `json:"movieImage,omitempty"`
	  MovieDesc string  `json:"movieDesc,omitempty"`
	  Language string `json:"language,omitempty"`
	  Duration string `json:"duration,omitempty"`
	  ReleaseDate  string `json:"releaseDate,omitempty"`
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
const movieTable ="movies"




func handler(req events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse,error){
     switch true {
	 case req.HTTPMethod == "GET" && req.Path =="/movies":
		return getMovies(req)
     case req.HTTPMethod == "POST" && req.Path =="/movies":
		return addMovie(req)
	 case req.HTTPMethod == "PATCH" && req.Path =="/movies":
		return updateMovie(req)
	 case req.HTTPMethod == "DELETE" && req.Path =="/movies":
		return deleteMovie(req)
	default :
	  return handleDefault()
	 }
}

/*******************************************************Api Gateway handlers start  ******************************************   */

func getMovies(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
	   movieId := req.QueryStringParameters["movieId"];
	   if len(movieId) > 0 {
		   result,err := DBFetchMovie(req,movieId);
		   if err!=nil{
			   return sendResponse(http.StatusBadRequest,errors.New(NOTABLETOFETCH))
		   }
		   return sendResponse(http.StatusOK,result);
	   }
	   result,err := DBFetchMovies(req);
	   if err!=nil{
			   return sendResponse(http.StatusBadRequest,errors.New(NOTABLETOFETCH))
	   }
	   return sendResponse(http.StatusOK,result);
}



func addMovie(req events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse,error){
	result,err := DBCreateMovie(req);
	if err!=nil {
		return sendResponse(http.StatusBadRequest,NOTABLETOINSERT)
	}
	return sendResponse(http.StatusOK,result);
}


func updateMovie(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
	 movieId := req.QueryStringParameters["movieId"]
	 result,err := DBUpdateMovie(req,movieId);
	 if err!=nil{
		 return sendResponse(http.StatusBadRequest,errors.New(NOTABLETOUPDATE))
	 }
	 return sendResponse(http.StatusOK,result);
}

func deleteMovie(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse,error){
	movieId := req.QueryStringParameters["movieId"];
	err := DBDeleteMovie(req,movieId);
	if err!=nil{
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE));
	}
	return sendResponse(http.StatusOK,SUCCESS);
}


func handleDefault()(*events.APIGatewayProxyResponse,error){
	return sendResponse(http.StatusBadRequest,errors.New(INVALIDENDPOINT));
}

/* ```````````````````````````````Database Crud operations  ```````````````````````````````````````   */


//Fetch a movie by Id
func DBFetchMovie(req events.APIGatewayProxyRequest,movieId string) (*Movie,error){
   result,err := DBclient.GetItem(&dynamodb.GetItemInput{
	    Key: map[string] *dynamodb.AttributeValue{
			  "movieId":{
				  S: aws.String(movieId),
			  },	
		},
		  TableName : aws.String(movieTable),
   })
   if err!=nil{
	   return nil, errors.New(NOTABLETOFETCH)
   }

   item := new(Movie);
   err = dynamodbattribute.UnmarshalMap(result.Item,&item)
   if err!=nil {
	   return nil,errors.New(NOTABLETOFETCH)
   }
   return item,nil
}

//Fetch all movies
func DBFetchMovies(req events.APIGatewayProxyRequest)(*[]Movie,error){
	result,err := DBclient.Scan(&dynamodb.ScanInput{
		TableName : aws.String(movieTable),
	})
	if err!=nil{
		return nil, errors.New(NOTABLETOFETCH)
	}
	item := new([]Movie)
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items,&item);
	if err!=nil{
		return nil,errors.New(NOTABLETOFETCH)
	}
	return item,nil
}

//Add a movie 
func DBCreateMovie(req events.APIGatewayProxyRequest)(*Movie,error){
	 var u Movie
	 if err:= json.Unmarshal([]byte (req.Body),&u) ; err!=nil{
		  return nil,errors.New(NOTABLETOUNMARSHAL)
	 }
	 var id = ksuid.New();
	 u.MovieId = id.String();
	 data, err := dynamodbattribute.MarshalMap(u);
	 if err!=nil{
		 return nil, errors.New(NOTABLETOMARSHAL)
	 }
	 _,err = DBclient.PutItem(&dynamodb.PutItemInput{
		 Item : data,  
		 TableName: aws.String(movieTable),
	 })
	 if err!=nil {
		 return nil, errors.New(NOTABLETOINSERT)
	 }
     return &u,nil
}

//Update a movie  
func DBUpdateMovie(req events.APIGatewayProxyRequest, movieId string)(*Movie,error){
    var u Movie ;
	if err:=json.Unmarshal([]byte(req.Body),&u); err!=nil {
		 return nil,errors.New(NOTABLETOUNMARSHAL)
	}
	u.MovieId = movieId ;
	data,err := dynamodbattribute.MarshalMap(u);
	if err!=nil{
		return nil,errors.New(NOTABLETOMARSHAL)
	}
	_,err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item : data,
		TableName : aws.String(movieTable),
	})  
	if err!=nil{
		return nil, errors.New(NOTABLETOUPDATE);
	}
	return &u,nil
}

//Delete a movie 

func DBDeleteMovie(req events.APIGatewayProxyRequest,movieId string) (error){
    _,err := DBclient.DeleteItem(&dynamodb.DeleteItemInput{
		Key:  map[string] *dynamodb.AttributeValue{
			"movieId" :{
				S: aws.String(movieId),
			},
		},
		TableName : aws.String(movieTable),
	})
	if err!=nil{
		return errors.New(NOTABLETODELETE);
	}
	return nil;
}


/* `````````````````````````````` Response for API-GATEWAY ```````````````````````````````````````   */

func sendResponse(status int,body interface{}) (*events.APIGatewayProxyResponse,error){
	stringBody,_ :=json.Marshal(body);
	return &events.APIGatewayProxyResponse{
		Headers : map[string]string {"Content-Type" : "application/json"},
		Body : string(stringBody),
		StatusCode: status,
	},nil
}

func main(){
	 awsSession,err := session.NewSession(&aws.Config{
	     Region : aws.String("us-east-2")},	 
	 )
	 if err!=nil{
		 log.Fatal("Unable to create session")
	 }
	 DBclient = dynamodb.New(awsSession)
	 lambda.Start(handler)
}