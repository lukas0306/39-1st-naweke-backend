-- migrate:up
INSERT INTO product_options ( id, product_id, size_id, color_id, price, stock ) 
VALUES 
( 1, 1, 1, 1, 10000, 100 ),
( 2, 1, 2, 2, 55000, 100 ),
( 3, 1, 3, 3, 150000, 100 );

INSERT INTO product_options_image (id, image_url ,product_option_id)
VALUES
(1,'개별상품 이미지',1 ),
(2,'개별상품 이미지2',1 ),
(3,'개별상품 이미지3',1 ),
(4,'개별상품 이미지4',1 );
-- migrate:down

