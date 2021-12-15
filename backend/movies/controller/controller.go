package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"backend-serverless/movies/models"

	"github.com/aws/aws-lambda-go/events"
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

func GetMovies(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	movieId := req.QueryStringParameters["movieId"]
	if len(movieId) > 0 {
		result, err := models.DBFetchMovie(req, movieId,DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
		}
		return sendResponse(http.StatusOK, result)
	}
	result, err := models.DBFetchMovies(req,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
	}
	return sendResponse(http.StatusOK, result)
}

func AddMovie(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	result, err := models.DBCreateMovie(req,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, NOTABLETOINSERT)
	}
	return sendResponse(http.StatusOK, result)
}

func UpdateMovie(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	movieId := req.QueryStringParameters["movieId"]
	result, err := models.DBUpdateMovie(req, movieId,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOUPDATE))
	}
	return sendResponse(http.StatusOK, result)
}

func DeleteMovie(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	movieId := req.QueryStringParameters["movieId"]
	err := models.DBDeleteMovie(req, movieId,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE))
	}
	return sendResponse(http.StatusOK, SUCCESS)
}

func GetReviews(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	movieId := req.QueryStringParameters["movieId"]
	reviewId := req.QueryStringParameters["reviewId"]
	if len(movieId) > 0 {
		result, err := models.DBFetchMovieReviews(req, movieId,DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
		}
		return sendResponse(http.StatusOK, result)
	} else {
		result, err := models.DBFetchReview(req, reviewId,DBclient)
		if err != nil {
			return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOFETCH))
		}
		return sendResponse(http.StatusOK, result)
	}
}

func AddReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	result, err := models.DBCreateReview(req,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOINSERT))
	}
	return sendResponse(http.StatusOK, result)
}

func UpdateReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	result, err := models.DBUpdateReview(req,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETOUPDATE))
	}
	return sendResponse(http.StatusOK, result)
}

func DeleteReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*events.APIGatewayProxyResponse, error) {
	err := models.DBDeleteReview(req,DBclient)
	if err != nil {
		return sendResponse(http.StatusBadRequest, errors.New(NOTABLETODELETE))
	}
	return sendResponse(http.StatusOK, SUCCESS)
}

func HandleDefault() (*events.APIGatewayProxyResponse, error) {
	return sendResponse(http.StatusBadRequest, errors.New(INVALIDENDPOINT))
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
