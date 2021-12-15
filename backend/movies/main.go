package main

import (
	"backend-serverless/movies/controller"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
)

var DBclient dynamodbiface.DynamoDBAPI

func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	switch true {
	case req.HTTPMethod == "GET" && req.Path == "/movies":
		return controller.GetMovies(req, DBclient)
	case req.HTTPMethod == "POST" && req.Path == "/movies":
		return controller.AddMovie(req, DBclient)
	case req.HTTPMethod == "PATCH" && req.Path == "/movies":
		return controller.UpdateMovie(req, DBclient)
	case req.HTTPMethod == "DELETE" && req.Path == "/movies":
		return controller.DeleteMovie(req, DBclient)
	case req.HTTPMethod == "GET" && req.Path == "/reviews":
		return controller.GetReviews(req, DBclient)
	case req.HTTPMethod == "POST" && req.Path == "/reviews":
		return controller.AddReview(req, DBclient)
	case req.HTTPMethod == "PATCH" && req.Path == "/reviews":
		return controller.UpdateReview(req, DBclient)
	case req.HTTPMethod == "DELETE" && req.Path == "/reviews":
		return controller.DeleteReview(req, DBclient)
	default:
		return controller.HandleDefault()
	}
}

func main() {
	awsSession, _ := session.NewSession(&aws.Config{
		Region: aws.String("us-east-2")},
	)
	DBclient = dynamodb.New(awsSession)
	lambda.Start(handler)
}
