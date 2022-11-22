-- migrate:up
ALTER TABLE `reviews` ADD `score` INT NOT NULL AFTER `content`;

-- migrate:down
