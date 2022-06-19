from backend.hotelreview import models, schemas, services


def test_get_hotel(hotels, session):
    hotel = services.get_hotel(session, hotel_id = 1)
    assert hotel.id == 1
    assert hotel.title == 'hotel1'
    assert hotel.thumbnail =='thumbnail1'
    assert hotel.rating == 1
    assert hotel.reviews == []


def test_get_hotels(hotels, session):
    hotels = services.get_hotels(session)
    assert len(hotels) == 2

    hotel2, hotel1 = hotels
    assert hotel1.id == 1
    assert hotel1.title == 'hotel1'
    assert hotel1.thumbnail =='thumbnail1'
    assert hotel1.rating == 1
    assert hotel1.reviews == [] 

    assert hotel2.id == 2
    assert hotel2.title == 'hotel2'
    assert hotel2.thumbnail =='thumbnail2'
    assert hotel2.rating == 2
    assert hotel2.reviews == []     


def test_create_hotel(hotels, session):
    hotel = schemas.HotelCreate(title = 'hotel3', thumbnail = 'thumbnail3', rating = 3)
    hotel = services.create_hotel(session, hotel)

    assert hotel.id == 3
    assert hotel.title == 'hotel3'
    assert hotel.thumbnail == 'thumbnail3'
    assert hotel.rating == 3
    assert hotel.reviews == []

    hotel = session.query(models.Hotel).filter(models.Hotel.title == 'hotel3').first()
    assert hotel.id == 3
    assert hotel.title == 'hotel3'
    assert hotel.thumbnail == 'thumbnail3'
    assert hotel.rating == 3
    assert hotel.reviews == []

    hotels = session.query(models.Hotel).all()
    assert len(hotels) == 3
    assert hotel in hotels


def test_get_hotel_review(reviews, session):
    review = services.get_hotel_review(session, review_id = 1)
    assert review.id == 1
    assert review.title == 'review1'
    assert review.description == 'description1'
    assert review.rating == 1
    assert review.hotel_id == 1


def test_get_hotel_reviews(reviews, session):
    reviews = services.get_hotel_reviews(session)
    assert len(reviews) == 2

    review2, review1 = reviews
    assert review1.id == 1
    assert review1.title == 'review1'
    assert review1.description == 'description1'
    assert review1.rating == 1
    assert review1.hotel_id == 1 

    assert review2.id == 2
    assert review2.title == 'review2'
    assert review2.description == 'description2'
    assert review2.rating == 2
    assert review2.hotel_id == 2


def test_create_hotel_review(reviews, hotels, session):
    review = schemas.ReviewCreate(title = 'review3', description = 'description3', rating = 3)
    review = services.create_hotel_review(session, review, hotel_id = 1)
    assert review.id == 3
    assert review.title == 'review3'
    assert review.description == 'description3'
    assert review.rating == 3
    assert review.hotel_id == 1

    review = session.query(models.Review).filter(models.Review.title == 'review3').first()
    assert review.id == 3
    assert review.title == 'review3'
    assert review.description == 'description3'
    assert review.rating == 3
    assert review.hotel_id == 1    

    reviews = session.query(models.Review).all()
    assert len(reviews) == 3
    assert review in reviews

    hotel = session.query(models.Hotel).get(1)
    assert len(hotel.reviews) == 2
    assert review in hotel.reviews


def test_delete_hotel_review(reviews, hotels, session):
    review_delete = session.query(models.Review).get(2)

    review = services.delete_hotel_review(session, review_id = 2)
    assert review is None

    review = session.query(models.Review).get(2)
    assert review is None

    reviews = session.query(models.Review).all()
    assert len(reviews) == 1
    assert review_delete not in reviews

    hotel = session.query(models.Hotel).get(2)
    assert len(hotel.reviews) == 0