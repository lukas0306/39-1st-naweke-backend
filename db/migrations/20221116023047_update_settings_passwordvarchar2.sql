-- migrate:up
ALTER TABLE users MODIFY column password varchar(100) NOT NULL

-- migrate:down

