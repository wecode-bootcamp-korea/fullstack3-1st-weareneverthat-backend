-- insert products data
INSERT INTO categories(name) VALUES ('Outerwear'), ('Sweatshirts'), ('Tees'), ('Shirts'), ('Tops'), ('Bottoms'), ('Shorts'), ('Headwear'), ('Bags'), ('Shoes'), ('Accessories'), ('Collaboration');

-- insert product groups data
INSERT INTO product_groups(name, price, discount_price, description, country, categoryId) VALUES ('PERTEX T Down Jacket', 189000, 132300, 'PERTEX QUANTUM fabric Duck down 80%, Duck Feather 20% Logo embroidery on left chest and wrist Logo jacquard zip puller Logo print above the inner pocket Nylon 100%', 'Vietnam', 1);

-- insert product data Black Blue Navy Sage Gray
INSERT INTO products(color, product_group_id) VALUES ('black', 1), ('')