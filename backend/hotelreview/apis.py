from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter, HTTPException, Response, status

from backend.hotelreview import models, schemas, services
from backend.settings.database import SessionLocal, engine


models.Base.metadata.create_all(bind = engine)
router = APIRouter()


# Dependency
def get_database():
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()


# API routes
@router.get("/hotels/", response_model = List[schemas.Hotel])
def read_hotels(skip: int = 0, limit: int = 10, db: Session = Depends(get_database)):
    hotels = services.get_hotels(db, skip = skip, limit = limit)
    return hotels


@router.get("/hotels/{hotel_id}", response_model = schemas.Hotel)
def read_hotel(hotel_id: int, db: Session = Depends(get_database)):
    hotel = services.get_hotel(db, hotel_id = hotel_id)
    if hotel is None:
        raise HTTPException(status_code = 404, detail = "Hotel not found")
    return hotel
    

@router.post("/hotels/", response_model = schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_database)):
    return services.create_hotel(db, hotel = hotel)


@router.post("/hotels/{hotel_id}", response_model = schemas.Review)
def create_review_for_hotel(hotel_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_database)):
    return services.create_hotel_review(db, review = review, hotel_id = hotel_id)


@router.get("/reviews/", response_model = List[schemas.Review])
def read_reviews(skip: int = 0, limit: int = 10, db: Session = Depends(get_database)):
    reviews = services.get_hotel_reviews(db, skip = skip, limit = limit)
    return reviews


@router.get("/reviews/{review_id}", response_model = schemas.Review)
def read_review(review_id: int, db: Session = Depends(get_database)):
    review = services.get_hotel_review(db, review_id = review_id)
    if review is None:
        raise HTTPException(status_code = 404, detail = "Review not found")
    return review


@router.delete("/reviews/{review_id}", status_code = status.HTTP_204_NO_CONTENT)
def delete_review(review_id, db: Session = Depends(get_database)):
    review = services.get_hotel_review(db, review_id = review_id)
    if review is None:
        raise HTTPException(status_code = 404, detail = "Review not found")
    services.delete_hotel_review(db, review_id = review_id)
    return Response(status_code = status.HTTP_204_NO_CONTENT)