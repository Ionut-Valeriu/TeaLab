DROP TYPE IF EXISTS tea_type;
DROP TYPE IF EXISTS products_type;
DROP TYPE IF EXISTS origins;

CREATE TYPE products_type AS ENUM('tea', 'accessory');
CREATE TYPE tea_type AS ENUM( 'green', 'black', 'fermented', 'herbal', 'common');
CREATE TYPE origins AS ENUM('Romania', 'India', 'other');

CREATE TABLE IF NOT EXISTS TEAS (
    id serial PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(300),
    product_type products_type DEFAULT 'tea',
    category tea_type,
    price NUMERIC(8,2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity>=0),
    add_date TIMESTAMP DEFAULT current_timestamp,
    origin origins DEFAULT 'other',
    ingrediente VARCHAR [],
    cardiovascular_risk BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO products (name, description, image, product_type, category, price, quantity, origin, ingrediente, cardiovascular_risk)
VALUES
-- ceaiuri verzi
('Jasmine Green', 'Green tea with a floral jasmine aroma.',
 'images/products/jasmine.jpg', 'tea', 'green', 19.99, 50, 'India',
 ARRAY['green tea', 'jasmine'], false),

('Sencha', 'Japanese-style green tea.',
 'images/products/sencha.jpg', 'tea', 'green', 24.50, 30,
 'other', ARRAY['green tea'], false),



-- ceaiuri negre
('Assam Gold', 'Strong Indian black tea.',
 'images/products/assam.jpg', 'tea', 'black', 22.00, 20,
 'India', ARRAY['black tea'], true),

('Ceylon Delight', 'Ceylon black tea with citrus notes.',
 'images/products/ceylon.jpg', 'tea', 'black', 18.75, 25,
 'other', ARRAY['black tea'], false),



-- ceaiuri fermentate
('Pu-erh Classic', 'Aged fermented tea for digestive health.',
 'images/products/pu-erh.jpg', 'tea', 'fermented', 30.00, 15,
 'other', ARRAY['pu-erh'], true),



-- ceaiuri comune
('Everyday Herbal', 'Affordable herbal blend.',
 'images/products/everyday_herbal.jpg', 'tea', 'common', 9.99, 100,
 'Romania', ARRAY['mint', 'lemon balm'], false),

('Rooibos Vanilla',
 'Sweet herbal tea with rooibos and vanilla.',
 'images/products/rooibos.jpg', 'tea', 'common', 12.49, 60,
 'other', ARRAY['rooibos', 'vanilla'], false),



-- ceaiuri din plante (herbal)
('Chamomile Calm', 'Relaxing chamomile tea.',
 'images/products/chamomile.jpg', 'tea', 'herbal', 11.00, 40,
 'Romania', ARRAY['chamomile'], false),

('Digestive Blend', 'A blend for after meals.',
 'images/products/digestive_blend.jpg', 'tea', 'herbal', 14.30, 20,
 'India', ARRAY['mint', 'fennel', 'ginger'], false),

-- accesorii
('Ceramic Teapot', '500ml teapot in traditional style.',
 'images/products/teapot.jpg', 'accessory', NULL, 35.00, 10,
 'other', NULL, false),

('Tea Strainer', 'Stainless steel strainer for loose leaf.',
 'images/products/strainer.jpg', 'accessory', NULL, 6.50, 80,
 'India', NULL, false),

('Glass Mug', 'Heat-resistant glass mug.',
 'images/products/mug.jpg', 'accessory', NULL, 9.99, 45,
 'Romania', NULL, false),



-- mai multe ceaiuri pentru diversitate
('Spicy Chai', 'Classic masala chai.',
 NULL, 'tea', 'black', 16.75, 35,
 'India', ARRAY['black tea', 'cardamom', 'cloves', 'ginger'], true),

('Forest Fruit Mix', 'Fruit tea with forest berries.',
 'images/products/forest.jpg', 'tea', 'herbal', 13.00, 55,
 'Romania', ARRAY['hibiscus', 'berries'], false),

('Matcha', 'Fine powdered green tea.',
 NULL, 'tea', 'green', 27.50, 10,
 'other', ARRAY['matcha'], false),

('Smoky Lapsang', 'Smoked black tea.',
 NULL, 'tea', 'black', 20.00, 5,
 'other', ARRAY['black tea'], false),

('Mint Fresh', 'Simple mint tea.',
 NULL, 'tea', 'herbal', 8.25, 75,
 'Romania', ARRAY['mint'], false);