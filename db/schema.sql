PRAGMA foreign_keys = ON;

CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  password VARCHAR(256) NOT NULL,
  role VARCHAR(20),
  PRIMARY KEY(username)
);

CREATE TABLE search_terms(
  term VARCHAR(25) NOT NULL,
  site VARCHAR(20) NOT NULL,
  PRIMARY KEY(term)
);

CREATE TABLE mercari_results(
  term VARCHAR(25) NOT NULL,
  url VARCHAR(100) NOT NULL,
  imageURL VARCHAR(100) NOT NULL,
  name VARCHAR(150) NOT NULL,
  price VARCHAR(50) NOT NULL,
  PRIMARY KEY(url)

)