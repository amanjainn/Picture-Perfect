package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"backend-serverless/shows/models"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
)

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

type Error struct {
	ErrorMsg *string `json:"error,omitempty"`
}

func GetShows(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {

	showId := req.QueryStringParameters["showId"]

	if len(showId) > 0 {
		result, err := models.DBFetchShow(req, showId, DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
		}
		return sendResponse(http.StatusOK, result)
	}

	result, err := models.DBFetchShows(req, DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, Error{aws.String(err.Error())})
	}
	return sendResponse(http.StatusOK, result)

}

func CreateShows(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	result, err := models.DBCreateShow(req, DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, Error{aws.String(err.Error())})
	}
	return sendResponse(http.StatusCreated, result)

}

func UpdateShow(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {

	showId := req.QueryStringParameters["showId"]
	if len(showId) > 0 {
		result, err := models.DBUpdateShow(req, showId, DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOUPDATE))
		}
		return sendResponse(http.StatusOK, result)
	}
	return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOUPDATE))

}

func DeleteShow(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	showId := req.QueryStringParameters["showId"]
	if len(showId) > 0 {
		err := models.DBDeleteShow(req, showId, DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE))
		}
		return sendResponse(http.StatusOK, SUCCESS)
	}
	return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE))

}

func HandleDefault() (*events.APIGatewayProxyResponse, error) {
	return sendResponse(http.StatusMethodNotAllowed, INVALIDENDPOINT)
}

func sendResponse(status int, body interface{}) (*events.APIGatewayProxyResponse, error) {
	stringBody, _ := json.Marshal(body)
	return &events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Credentials":  "true",
		},
		StatusCode: status,
		Body:       string(stringBody),
	}, nil
}
