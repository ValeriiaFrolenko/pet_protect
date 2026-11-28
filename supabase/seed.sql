insert into public.animals (name, species, breed, age_months, sex, description, photo_url, status) values
  ('Rex', 'dog', 'German Shepherd', 36, 'male', 'Calm and well trained.', '/img/animals/rex.jpg', 'available'),
  ('Bella', 'dog', 'Labrador', 24, 'female', 'Very friendly with children.', '/img/animals/bella.jpg', 'available'),
  ('Max', 'dog', 'Mixed', 12, 'male', 'Energetic, needs a yard.', '/img/animals/max.jpg', 'available'),
  ('Luna', 'cat', 'Siamese', 18, 'female', 'Quiet, likes to sit on laps.', '/img/animals/luna.jpg', 'available'),
  ('Tom', 'cat', 'British Shorthair', 48, 'male', 'Independent and clean.', '/img/animals/tom.jpg', 'available'),
  ('Milo', 'cat', 'Mixed', 6, 'male', 'Playful kitten.', '/img/animals/milo.jpg', 'available'),
  ('Daisy', 'dog', 'Beagle', 60, 'female', 'Gentle senior dog.', '/img/animals/daisy.jpg', 'reserved'),
  ('Charlie', 'dog', 'Husky', 30, 'male', 'Needs long daily walks.', '/img/animals/charlie.jpg', 'available'),
  ('Nala', 'cat', 'Maine Coon', 20, 'female', 'Large, fluffy and calm.', '/img/animals/nala.jpg', 'available'),
  ('Coco', 'other', 'Rabbit', 10, 'female', 'Gets along with other pets.', '/img/animals/coco.jpg', 'available'),
  ('Buddy', 'dog', 'Corgi', 42, 'male', 'Loves people and treats.', '/img/animals/buddy.jpg', 'adopted'),
  ('Shadow', 'cat', 'Mixed', 72, 'male', 'Shy at first, then very affectionate.', '/img/animals/shadow.jpg', 'available');

insert into public.events (title, description, starts_at, location, lat, lng, cover_url) values
                                                                                             ('Adoption day', 'Meet animals looking for a home.', now() + interval '7 days', 'Kyiv, Khreshchatyk St', 50.4501, 30.5234, 'https://placehold.co/600x400?text=Adoption+day'),
                                                                                             ('Charity walk', 'Walk with the shelter dogs and support the shelter.', now() + interval '14 days', 'Kyiv, Shevchenko Park', 50.4425, 30.5101, 'https://placehold.co/600x400?text=Charity+walk'),
                                                                                             ('Vaccination day', 'Free checkups for adopted pets.', now() + interval '21 days', 'Kyiv, Podil', 50.4640, 30.5160, 'https://placehold.co/600x400?text=Vaccination+day'),
                                                                                             ('Volunteer meetup', 'Learn how to help the shelter.', now() + interval '30 days', 'Kyiv, Obolon', 50.5010, 30.4980, 'https://placehold.co/600x400?text=Volunteer+meetup'),
                                                                                             ('Winter fundraiser', 'Collecting warm blankets and food.', now() + interval '45 days', 'Kyiv, Lukianivska', 50.4620, 30.4810, 'https://placehold.co/600x400?text=Winter+fundraiser');
