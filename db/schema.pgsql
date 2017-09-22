-- ---
-- Table 'items'
-- 
-- ---

DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL NOT NULL,
  name VARCHAR(40),
  brand VARCHAR(20),
  material VARCHAR(15),
  image TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'locations'
-- 
-- ---

DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
  id SERIAL NOT NULL,
  name VARCHAR(40),
  PRIMARY KEY (id)
);

-- ---
-- Table 'instructions'
-- 
-- ---

DROP TABLE IF EXISTS instructions CASCADE;

CREATE TABLE instructions (
  id SERIAL NOT NULL,
  item_name VARCHAR(40) NOT NULL,
  loc_name VARCHAR(40) NOT NULL,
  disposal VARCHAR(10),
  special VARCHAR(10),
  special_text TEXT,
  PRIMARY KEY (id)
);
