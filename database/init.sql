CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  website VARCHAR(255) UNIQUE,
);