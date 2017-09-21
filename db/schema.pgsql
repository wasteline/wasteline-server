-- ---
-- Table 'items'
-- 
-- ---

DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL NOT NULL,
  name VARCHAR(40),
  category VARCHAR(10),
  clean BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  PRIMARY KEY (id)
);