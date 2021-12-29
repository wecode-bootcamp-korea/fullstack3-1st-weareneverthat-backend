INSERT INTO categories VALUES (1,'Outerwear'),(2,'Sweatshirts'),(3,'Tees'),(4,'Shirts'),(5,'Tops'),(6,'Bottoms'),(7,'Shorts'),(8,'Headwear'),(9,'Bags'),(10,'Shoes'),(11,'Accessories'),(12,'Collaboration');

-- insert product colors data
INSERT INTO product_colors(color) VALUES ('Black'), ('Blue'), ('Navy');

-- insert product sizes data
INSERT INTO product_sizes(size) VALUES ('S'), ('M'), ('L');

-- insert products data
INSERT INTO 
  products(name, price, discount_price, description, country, category_id)
VALUES 
  ('PERTEX T Down Jacked', 189000, 132300, 'PERTEX QUANTUM fabric', 'Vietnam', 1),
  ('T-Logo Hoodie', 82000, 57400, 'Logo embroidery on front', 'Bangladesh', 2),
  ('Converse x thisisneverthat Tee', 55000, 55000, '240GSM oversized cotton jersey with modern, oversized fit', 'China', 3);

<<<<<<< HEAD
-- insert product details data
INSERT INTO
  product_details(quantity, product_id, product_color_id, product_size_id)
VALUES
  ('10', 1, 1, 1),
  ('20', 1, 1, 2),
  ('30', 1, 1, 3),
  ('10', 1, 3, 1),
  ('20', 1, 3, 2),
  ('30', 1, 3, 3),
  ('10', 2, 1, 1),
  ('20', 2, 1, 2),
  ('30', 2, 1, 3),
  ('10', 2, 2, 1),
  ('20', 2, 2, 2),
  ('30', 2, 2, 3),
  ('10', 3, 2, 1),
  ('20', 3, 2, 2),
  ('30', 3, 2, 3),
  ('10', 3, 3, 1),
  ('20', 3, 3, 2),
  ('30', 3, 3, 3);
=======
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
>>>>>>> develop

-- insert product images data
-- INSERT INTO
--   product_images(image_url, )

-- insert users data
INSERT INTO
  users(email, password, name)
VALUES
  ('dev.taeyeong', '1234', 'TaeYeong'),
  ('dev.minsu', '1234', 'MinSu'),
  ('dev.mingi', '1234', 'MinGi'),
  ('dev.sky', '1234', 'Sky');