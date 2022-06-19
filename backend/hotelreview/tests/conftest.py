import os
import pytest
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from backend.main import app
from backend.hotelreview import models
from backend.settings.database import Base
from backend.hotelreview.apis import get_database


BASE_DIR = Path(__file__).resolve().parent
DATABASE_FILE = "test_db.sqlite3"
test_database_path = os.path.join(BASE_DIR, DATABASE_FILE)

SQLALCHEMY_TEST_DATABASE_URL = f"sqlite:///{test_database_path}"
test_engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args = {"check_same_thread": False})
TestSessionLocal = sessionmaker()

Base.metadata.create_all(bind = test_engine)


@pytest.fixture(scope = 'session')
def connection():
    connection = test_engine.connect()
    yield connection
    connection.close()
    os.remove(test_database_path)


@pytest.fixture(scope = 'function')
def session(connection):
    transaction = connection.begin()
    session = TestSessionLocal(bind = connection)
    yield session
    session.close()
    transaction.rollback()


@pytest.fixture(scope = 'function')
def client(session):
    app.dependency_overrides[get_database] = lambda: session

    with TestClient(app) as client:
        yield client


@pytest.fixture
def hotels(session):
    hotel1 = models.Hotel(title = 'hotel1', thumbnail = 'thumbnail1', rating = 1)
    hotel2 = models.Hotel(title = 'hotel2', thumbnail = 'thumbnail2', rating = 2)

    session.add(hotel1)
    session.add(hotel2)

    session.commit()


@pytest.fixture
def reviews(session):
    review1 = models.Review(title = 'review1', description = 'description1', rating = 1, hotel_id = 1)
    review2 = models.Review(title = 'review2', description = 'description2', rating = 2, hotel_id = 2)

    session.add(review1)
    session.add(review2)

    session.commit()