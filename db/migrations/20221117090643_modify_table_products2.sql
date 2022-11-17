-- migrate:up
ALTER TABLE products MODIFY COLUMN gender_id INT NULL

-- migrate:down

