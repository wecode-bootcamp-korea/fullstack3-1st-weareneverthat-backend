-- insert products data
INSERT INTO categories(name) VALUES ('Outerwear'), ('Sweatshirts'), ('Tees'), ('Shirts'), ('Tops'), ('Bottoms'), ('Shorts'), ('Headwear'), ('Bags'), ('Shoes'), ('Accessories'), ('Collaboration');

-- insert products data
INSERT INTO 
  products(name, price, discount_price, description, country, category_id)
VALUES 
  ('PERTEX T Down Jacked', 189000, 132300, 'PERTEX QUANTUM fabric', Vietnam, 1),
  ('PERTEX T Down Jacked', 189000, 132300, 'PERTEX QUANTUM fabric', Vietnam, 1),
  ('T-Logo Hoodie', 82000, 57400, 'Logo embroidery on front', Bangladesh, 2),
  ('T-Logo Hoodie', 82000, 57400, 'Logo embroidery on front', Bangladesh, 2),
  ('Converse x thisisneverthat Tee', 55000, , '240GSM oversized cotton jersey with modern, oversized fit', China, 3),
  ('Converse x thisisneverthat Tee', 55000, , '240GSM oversized cotton jersey with modern, oversized fit', China, 3),
  ('Paint Splatter Denim Shrit', 119000, , 'Hand-painted', China, 4),
  ('Paint Splatter Denim Shrit', 119000, , 'Hand-painted', China, 4),
  ('Argyle Cardigan', 124000, 86800, 'Logo embroidery on chest', Korea, 5),
  ('Argyle Cardigan', 124000, 86800, 'Logo embroidery on chest', Korea, 5),

-- insert product data Black Blue Navy Sage Gray
INSERT INTO products(color, product_group_id) VALUES ('black', 1), ('')