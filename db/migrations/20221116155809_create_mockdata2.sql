-- migrate:up
INSERT INTO products ( id, sub_category_id, gender_id, name, thumbnail_image_url ) 
VALUES 
( 1, 1, 1, '나이키운동화','썸네일 이미지' ),
( 2, 2, 1, '추꾸화', '아무튼 썸네일' ),
( 3, 2, 1, '얘도 축구화', '썸네일임' );

-- migrate:down

