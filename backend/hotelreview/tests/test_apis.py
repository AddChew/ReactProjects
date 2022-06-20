from fastapi import status
from sqlalchemy import func
from backend.hotelreview import models


def test_read_hotels(hotels, client):
    response = client.get("/hotels/")
    assert response.status_code == status.HTTP_200_OK, response.text

    hotels = response.json()
    assert len(hotels) == 2

    hotel2, hotel1 = hotels

    assert hotel1['id'] == 1
    assert hotel1['title'] == 'hotel1'
    assert hotel1['thumbnail'] =='thumbnail1'
    assert hotel1['rating'] == 1
    assert hotel1['reviews'] == []

    assert hotel2['id'] == 2
    assert hotel2['title'] == 'hotel2'
    assert hotel2['thumbnail'] =='thumbnail2'
    assert hotel2['rating'] == 2
    assert hotel2['reviews'] == []


def test_read_hotel(hotels, client, session):
    # Valid hotel
    response = client.get('/hotels/1')
    assert response.status_code == status.HTTP_200_OK, response.text

    hotel = response.json()
    assert hotel['id'] == 1
    assert hotel['title'] == 'hotel1'
    assert hotel['thumbnail'] =='thumbnail1'
    assert hotel['rating'] == 1
    assert hotel['reviews'] == []

    # Invalid hotel
    invalid_hotel_id = session.query(func.max(models.Hotel.id)).scalar() + 1
    response = client.get(f'/hotels/{invalid_hotel_id}')
    assert response.status_code == status.HTTP_404_NOT_FOUND, response.text

    error_message = response.json()
    assert error_message['detail'] == 'Hotel not found'


def test_create_hotel(hotels, client, session):
    response = client.post(
        '/hotels/', 
        json = {'title': 'hotel3', 'thumbnail': 'thumbnail3', 'rating': 3}
    )
    assert response.status_code == status.HTTP_200_OK, response.text
    
    hotel = response.json()
    assert hotel['id'] == 3
    assert hotel['title'] == 'hotel3'
    assert hotel['thumbnail'] =='thumbnail3'
    assert hotel['rating'] == 3
    assert hotel['reviews'] == []

    hotels = session.query(models.Hotel).all()
    assert len(hotels) == 3

    hotel = session.query(models.Hotel).filter(models.Hotel.title == 'hotel3').first()
    assert hotel.id == 3
    assert hotel.title == 'hotel3'
    assert hotel.thumbnail =='thumbnail3'
    assert hotel.rating == 3
    assert hotel.reviews == []

    response = client.get('/hotels/3/')
    assert response.status_code == status.HTTP_200_OK, response.text

    hotel = response.json()
    assert hotel['id'] == 3
    assert hotel['title'] == 'hotel3'
    assert hotel['thumbnail'] =='thumbnail3'
    assert hotel['rating'] == 3
    assert hotel['reviews'] == []


def test_create_review_for_hotel(hotels, reviews, client, session):
    response = client.post(
        '/hotels/1', 
        json = {'title': 'review3', 'description': 'description3', 'rating': 3}
    )
    assert response.status_code == status.HTTP_200_OK, response.text

    review = response.json()
    assert review['id'] == 3
    assert review['title'] == 'review3'
    assert review['description'] == 'description3'
    assert review['rating'] == 3
    assert review['hotel_id'] == 1

    reviews = session.query(models.Review).all()
    assert len(reviews) == 3

    review = session.query(models.Review).filter(models.Review.title == 'review3').first()
    assert review.id == 3
    assert review.title == 'review3'
    assert review.description == 'description3'
    assert review.rating == 3
    assert review.hotel_id == 1

    hotel = session.query(models.Hotel).get(1)
    assert len(hotel.reviews) == 2

    _, review = hotel.reviews
    assert review.id == 3
    assert review.title == 'review3'
    assert review.description == 'description3'
    assert review.rating == 3
    assert review.hotel_id == 1

    response = client.get('/reviews/3')
    assert response.status_code == status.HTTP_200_OK, response.text

    review = response.json()
    assert review['id'] == 3
    assert review['title'] == 'review3'
    assert review['description'] == 'description3'
    assert review['rating'] == 3
    assert review['hotel_id'] == 1


def test_read_reviews(reviews, client):
    response = client.get('/reviews/')
    assert response.status_code == status.HTTP_200_OK, response.text

    reviews = response.json()
    assert len(reviews) == 2

    review2, review1 = reviews

    assert review1['id'] == 1
    assert review1['title'] == 'review1'
    assert review1['description'] == 'description1'
    assert review1['rating'] == 1
    assert review1['hotel_id'] == 1

    assert review2['id'] == 2
    assert review2['title'] == 'review2'
    assert review2['description'] == 'description2'
    assert review2['rating'] == 2
    assert review2['hotel_id'] == 2


def test_read_review(reviews, client, session):
    # Valid review
    response = client.get('/reviews/1')
    assert response.status_code == status.HTTP_200_OK, response.text

    review = response.json()
    assert review['id'] == 1
    assert review['title'] == 'review1'
    assert review['description'] == 'description1'
    assert review['rating'] == 1
    assert review['hotel_id'] == 1

    # Invalid review
    invalid_review_id = session.query(func.max(models.Review.id)).scalar() + 1
    response = client.get(f'/reviews/{invalid_review_id}')
    assert response.status_code == status.HTTP_404_NOT_FOUND, response.text

    error_message = response.json()
    assert error_message['detail'] == 'Review not found'


def test_delete_review(hotels, reviews, client, session):
    # Valid delete
    response = client.delete('/reviews/1')
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get('/reviews/1')
    assert response.status_code == status.HTTP_404_NOT_FOUND, response.text

    error_message = response.json()
    assert error_message['detail'] == 'Review not found'

    reviews = session.query(models.Review).all()
    assert len(reviews) == 1

    review = session.query(models.Review).get(1)
    assert review is None

    hotel = session.query(models.Hotel).get(1)
    assert hotel.reviews == []
    
    # Invalid delete
    invalid_review_id = session.query(func.max(models.Review.id)).scalar() + 1
    response = client.delete(f'/reviews/{invalid_review_id}')
    assert response.status_code == status.HTTP_404_NOT_FOUND, response.text

    error_message = response.json()
    assert error_message['detail'] == 'Review not found'