from sqlalchemy.orm import Session
from backend.hotelreview import models, schemas


def get_hotel(db: Session, hotel_id: int):
    return db.query(models.Hotel).get(hotel_id)


def get_hotels(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Hotel).order_by(models.Hotel.id.desc()).offset(skip).limit(limit).all()


def create_hotel(db: Session, hotel: schemas.HotelCreate):
    db_hotel = models.Hotel(**hotel.dict())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel


def get_hotel_review(db: Session, review_id: int):
    return db.query(models.Review).get(review_id)


def get_hotel_reviews(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Review).order_by(models.Review.id.desc()).offset(skip).limit(limit).all()


def create_hotel_review(db: Session, review: schemas.ReviewCreate, hotel_id: int):
    db_review = models.Review(**review.dict(), hotel_id = hotel_id)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def delete_hotel_review(db: Session, review_id: int):
    db_review = db.query(models.Review).get(review_id)
    db.delete(db_review)
    db.commit()
    return None