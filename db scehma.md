

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ownerId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    lat DECIMAL(9, 6) CHECK (lat BETWEEN -90 AND 90) NOT NULL,
    lng DECIMAL(9, 6) CHECK (lng BETWEEN -180 AND 180) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) CHECK (price > 0) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spotImages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    spotId INTEGER REFERENCES spots(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    spotId INTEGER REFERENCES spots(id) ON DELETE CASCADE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    review TEXT NOT NULL,
    stars INTEGER CHECK (stars >= 1 AND stars <= 5) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_spot_user_review UNIQUE (spot_id, user_id)
);

CREATE TABLE reviewImages (
    id INTEGER PRIMARY KEY,
    reviewId INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    spotId INTEGER REFERENCES spots(id) ON DELETE CASCADE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_spot_user_booking UNIQUE (spot_id, user_id, start_date, end_date)
);

CREATE INDEX idx_reviews_spot_id ON reviews(spot_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_bookings_spot_id ON bookings(spot_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);

CREATE INDEX idx_spots_lat ON spots(lat);
CREATE INDEX idx_spots_lng ON spots(lng);
CREATE INDEX idx_spots_price ON spots(price);