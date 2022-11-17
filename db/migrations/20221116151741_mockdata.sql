-- migrate:up

INSERT INTO colors ( id, name ) 
VALUES 
( 1, 'white' ),
( 2, 'black' ),
( 3, 'red' );

INSERT INTO sizes ( id, name ) 
VALUES 
( 1, 'S' ),
( 2, 'M' ),
( 3, 'L' );

INSERT INTO genders ( id, name ) 
VALUES 
( 1, 'man' ),
( 2, 'women' );

INSERT INTO main_categories ( id, name ) 
VALUES 
( 1, 'shoes' ),
( 2, 'clothes' ),
( 3, 'items' );

INSERT INTO sub_categories ( id, main_category_id, name ) 
VALUES 
( 1, 1, 'running'),
( 2, 1, 'soccer' ),
( 3, 1, 'basketball');

-- migrate:down

