-- migrate:up
ALTER TABLE `products` ADD `desc` varchar(255) NOT NULL AFTER `name`

-- migrate:down

