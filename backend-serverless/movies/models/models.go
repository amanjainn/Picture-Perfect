package models

import (
	"encoding/json"
	"errors"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/aws/aws-sdk-go/service/dynamodb/expression"
	"github.com/segmentio/ksuid"
)

type Movie struct {
	MovieId     string `json:"movieId,omitempty"`
	MovieName   string `json:"movieName,omitempty"`
	MovieImage  string `json:"movieImage,omitempty"`
	MovieDesc   string `json:"movieDesc,omitempty"`
	Language    string `json:"language,omitempty"`
	Duration    string `json:"duration,omitempty"`
	ReleaseDate string `json:"releaseDate,omitempty"`
}

type Review struct {
	ReviewId    string `json:"reviewId,omitempty"`
	UserName    string `json:"userName,omitempty" `
	MovieId     string `json:"movieId,omitempty" `
	Rating      string `json:"rating,omitempty" `
	Review      string `json:"review,omitempty" `
	LastUpdated string `json:"lastUpdated,omitempty" `
}

const movieTable = "movies"
const reviewTable = "reviews"

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

//Fetch a movie by Id
func DBFetchMovie(req events.APIGatewayProxyRequest, movieId string, DBclient dynamodbiface.DynamoDBAPI) (*Movie, error) {
	result, err := DBclient.GetItem(&dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"movieId": {
				S: aws.String(movieId),
			},
		},
		TableName: aws.String(movieTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}

	item := new(Movie)
	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	return item, nil
}

//Fetch all movies
func DBFetchMovies(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*[]Movie, error) {
	result, err := DBclient.Scan(&dynamodb.ScanInput{
		TableName: aws.String(movieTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	item := new([]Movie)
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	return item, nil
}

//Add a movie
func DBCreateMovie(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*Movie, error) {
	var u Movie
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}
	var id = ksuid.New()
	u.MovieId = id.String()
	data, err := dynamodbattribute.MarshalMap(u)
	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}
	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      data,
		TableName: aws.String(movieTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOINSERT)
	}
	return &u, nil
}

//Update a movie
func DBUpdateMovie(req events.APIGatewayProxyRequest, movieId string, DBclient dynamodbiface.DynamoDBAPI) (*Movie, error) {
	var u Movie
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}
	u.MovieId = movieId
	data, err := dynamodbattribute.MarshalMap(u)
	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}
	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      data,
		TableName: aws.String(movieTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOUPDATE)
	}
	return &u, nil
}

//Delete a movie

func DBDeleteMovie(req events.APIGatewayProxyRequest, movieId string, DBclient dynamodbiface.DynamoDBAPI) error {
	_, err := DBclient.DeleteItem(&dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"movieId": {
				S: aws.String(movieId),
			},
		},
		TableName: aws.String(movieTable),
	})
	if err != nil {
		return errors.New(NOTABLETODELETE)
	}
	return nil
}

//Fetch  a review by review Id
func DBFetchReview(req events.APIGatewayProxyRequest, reviewId string, DBclient dynamodbiface.DynamoDBAPI) (*Review, error) {
	result, err := DBclient.GetItem(&dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"reviewId": {
				S: aws.String(reviewId),
			},
		},
		TableName: aws.String(reviewTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	item := new(Review)
	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	return item, nil
}

// Add a review
func DBCreateReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*Review, error) {
	var u Review
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}
	var id = ksuid.New()
	u.ReviewId = id.String()
	data, err := dynamodbattribute.MarshalMap(u)
	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}
	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      data,
		TableName: aws.String(reviewTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOINSERT)
	}
	return &u, nil
}

//Update a review

func DBUpdateReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) (*Review, error) {
	reviewId := req.QueryStringParameters["reviewId"]
	var u Review
	if err := json.Unmarshal([]byte(req.Body), &u); err != nil {
		return nil, errors.New(NOTABLETOUNMARSHAL)
	}
	u.ReviewId = reviewId
	data, err := dynamodbattribute.MarshalMap(u)

	if err != nil {
		return nil, errors.New(NOTABLETOMARSHAL)
	}
	_, err = DBclient.PutItem(&dynamodb.PutItemInput{
		Item:      data,
		TableName: aws.String(reviewTable),
	})
	if err != nil {
		return nil, errors.New(NOTABLETOUPDATE)
	}
	return &u, nil
}

// Delete a review by review ID
func DBDeleteReview(req events.APIGatewayProxyRequest, DBclient dynamodbiface.DynamoDBAPI) error {
	reviewId := req.QueryStringParameters["reviewId"]
	_, err := DBclient.DeleteItem(&dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"reviewId": {
				S: aws.String(reviewId),
			},
		},
		TableName: aws.String(reviewTable),
	})
	if err != nil {
		return errors.New(NOTABLETODELETE)
	}
	return nil
}

//Fetch all reviews  of a movie

func DBFetchMovieReviews(req events.APIGatewayProxyRequest, movieId string, DBclient dynamodbiface.DynamoDBAPI) (*[]Review, error) {
	filt := expression.Name("movieId").Equal(expression.Value(movieId))
	proj := expression.NamesList(expression.Name("reviewId"), expression.Name("movieId"), expression.Name("userName"), expression.Name("rating"), expression.Name("review"), expression.Name("lastUpdated"))

	expr, _ := expression.NewBuilder().WithFilter(filt).WithProjection(proj).Build()
	result, err := DBclient.Scan(&dynamodb.ScanInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		FilterExpression:          expr.Filter(),
		ProjectionExpression:      expr.Projection(),
		TableName:                 aws.String(reviewTable),
	})

	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	item := new([]Review)
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &item)
	if err != nil {
		return nil, errors.New(NOTABLETOFETCH)
	}
	return item, nil
}
