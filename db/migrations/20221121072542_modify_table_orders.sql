-- migrate:up
ALTER TABLE `orders` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;


-- migrate:down

