-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(30) NOT NULL,
  nickname varchar(30) NOT NULL UNIQUE,
  password varchar(100) NOT NULL,
  birth DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_status_id INT NOT NULL,
  user_id INT NOT NULL,
  total_price INT NOT NULL
);

CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  order_item_status_id INT NOT NULL,
  product_option_id INT NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE order_status (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE order_item_status (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  UNIQUE (user_id, product_id)
);

CREATE TABLE colors (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE sizes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE product_options (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size_id INT NOT NULL,
  color_id INT NOT NULL,
  price INT NOT NULL,
  stock INT NOT NULL
);

CREATE TABLE product_options_image (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image_url varchar(2083) NOT NULL,
  product_option_id INT NOT NULL
);

CREATE TABLE main_categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE sub_categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  main_category_id INT NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sub_category_id INT NOT NULL,
  gender_id INT NOT NULL,
  name varchar(255) NOT NULL,
  thumbnail_image_url varchar(2083) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE genders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  title varchar(255) NOT NULL,
  content varchar(2000) NOT NULL,
  image_url varchar(2083),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_option_id INT NOT NULL,
  quantity INT NOT NULL,
  UNIQUE (user_id, product_option_id)
);


-- migrate:down
DROP TABLE users;
DROP TABLE orders;
DROP TABLE order_items;
DROP TABLE order_status;
DROP TABLE order_item_status;
DROP TABLE likes;
DROP TABLE colors;
DROP TABLE sizes;
DROP TABLE product_options;
DROP TABLE product_options_image;
DROP TABLE main_categories;
DROP TABLE sub_categories;
DROP TABLE products;
DROP TABLE genders;
DROP TABLE reviews;
DROP TABLE carts;
