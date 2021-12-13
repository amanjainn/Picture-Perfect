package models

import (
	"encoding/json"
	"errors"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/segmentio/ksuid"
)

type Show struct {
	ShowId          string `json:"showId,omitempty" `
	TheatreName     string `json:"theatreName,omitempty" `
	TheatreLocation string `json:"theatreLocation,omitempty" `
	CityName        string `json:"cityName,omitempty" `
	ShowName        string `json:"showName,omitempty" `
	ShowImg         string `json:"showImg,omitempty" `
	Time            string `json:"time,omitempty" `
	Date            string `json:"date,omitempty" `
}

const tableName = "shows"

var (
	NOTABLETOFETCH     = "Not able to fetch"
	NOTABLETOINSERT    = "Not able to insert"
	NOTABLETOUPDATE    = "Not able to update"
	NOTABLETODELETE    = "Not able to delete"
	NOTABLETOUNMARSHAL = "Not able to unmarshal"
	NOTABLETOMARSHAL   = "Not able to marshal"
	SUCCESS            = "Success"
	INVALIDENDPOINT    = "Invalid Endpoint"
)

var DBclient dynamodbiface.DynamoDBAPI

//fetch a show
func DBFetchShow(req events.APIGatewayProxyRequest, showId string, DBclient dynamodbiface.DynamoDBAPI) (*Show, error) {
	result, err := DBclient.GetItem(&dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"showId": {
				S: aws.String(showId),
			},
		},
		TableName: aws.String(tableName)})
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}

	item := new(Show)
	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	return item, nil
}

//Update a show
func DBUpdateShow(req events.APIGatewayProxyRequest, showId string, DBclient dynamodbiface.DynamoDBAPI) (*Show, error) {
	var u Show
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}

	u.ShowId = showId
	av, err := dynamodbattribute.MarshalMap(u)
	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}

	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOUPDATE)
	}
	return &u, nil

}

//Delete a show
func DBDeleteShow(req events.APIGatewayProxyRequest, showId string, DBclient dynamodbiface.DynamoDBAPI) error {

	_, err := DBclient.DeleteItem(&dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"showId": {
				S: aws.String(showId),
			},
		},
		TableName: aws.String(tableName),
	})
	if err != nil {
		return errors.New(NOTABLETODELETE)
	}
	return nil
}

//Fetch all shows
func DBFetchShows(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*[]Show, error) {
	result, err := DBclient.Scan(&dynamodb.ScanInput{
		TableName: aws.String(tableName),
	})

	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	item := new([]Show)
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}

	return item, nil
}

//Create a show
func DBCreateShow(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*Show, error) {
	var u Show
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}
	var id = ksuid.New()
	u.ShowId = id.String()
	av, err := dynamodbattribute.MarshalMap(u)
	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}

	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOINSERT)
	}
	return &u, nil
}
