-- Insert record with ID 1
INSERT INTO albums 
(id, name, cover_url, production_date, release_date, artist_id, description, tracks) 
VALUES 
(1,
 'Charlotta', 
 'http://example.com/cover.jpg', 
 '2005-05-01', 
 '2010-10-03', 
 1, 
 'The debut ambient electronic album by Roderick Shoolbraid, 
 written in a span from 2003 to 2005. Released in 2010.  
 A soundtrack for a dream, and a film that never was.', 
 8);

-- Insert record with ID 2
INSERT INTO albums 
(id, name, cover_url, production_date, release_date, artist_id, description, tracks) 
VALUES 
(2,
 'Objects & Particles', 
 'http://example.com/second_cover.jpg', 
 '2006-03-01', 
 '2010-10-10', 
 1, 
 'Between "Charlotta" & "Glass City of Us" (2004-6), 
 this darker album explored minimal ambient music. 
 It used noise, line hum, record skips, and drone reverbs. 
 Inspired by the idea that objects in math, physics, & chemistry 
 have their own music, if we listen closely.', 
 6);

-- Insert record with ID 3
INSERT INTO albums 
(id, name, cover_url, production_date, release_date, artist_id, description, tracks) 
VALUES 
(3,
 'Glass City of Us', 
 'http://example.com/third_cover.jpg', 
 '2005-4-1', 
 '2010-10-06', 
 1, 
 'This album became the sequel to "Charlotta", composed and engineered over a 2 year period from 2003-2005, 
 finished in the middle of 2005. The concept of "The City" emerged through the rough romantic plot of two people 
 in a massive futuristic city, that seems dwarfed by the sentiments by them both.', 
 6);
