PRAGMA foreign_keys = ON;

CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  password VARCHAR(256) NOT NULL,
  role VARCHAR(20),
  PRIMARY KEY(username)
);

CREATE TABLE search_terms(
  term VARCHAR(20) NOT NULL,
  site VARCHAR(20) NOT NULL,
  PRIMARY KEY(term)
);
