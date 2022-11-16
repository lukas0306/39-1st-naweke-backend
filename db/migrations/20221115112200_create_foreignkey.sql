-- migrate:up
ALTER TABLE `order_items` ADD FOREIGN KEY (`order_item_status_id`) REFERENCES `order_item_status` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_option_id`) REFERENCES `product_options` (`id`);

ALTER TABLE `product_options` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_options` ADD FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);

ALTER TABLE `product_options` ADD FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `sub_categories` ADD FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`product_option_id`) REFERENCES `product_options` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `product_options_image` ADD FOREIGN KEY (`product_option_id`) REFERENCES `product_options` (`id`);


-- migrate:down

