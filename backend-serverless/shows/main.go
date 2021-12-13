package main

import (
	"backend-serverless/shows/controller"
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
	case req.HTTPMethod == "GET" && req.Path == "/shows":
		return controller.GetShows(req, DBclient)
	case req.HTTPMethod == "POST" && req.Path == "/shows":
		return controller.CreateShows(req, DBclient)
	case req.HTTPMethod == "PATCH" && req.Path == "/shows":
		return controller.UpdateShow(req, DBclient)
	case req.HTTPMethod == "DELETE" && req.Path == "/shows":
		return controller.DeleteShow(req, DBclient)
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
