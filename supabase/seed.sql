insert into public.animals (name, species, breed, age_months, sex, description, photo_url, status) values
  ('Rex', 'dog', 'German Shepherd', 36, 'male', 'Calm and well trained.', 'https://placehold.co/600x600?text=Rex', 'available'),
  ('Bella', 'dog', 'Labrador', 24, 'female', 'Very friendly with children.', 'https://placehold.co/600x600?text=Bella', 'available'),
  ('Max', 'dog', 'Mixed', 12, 'male', 'Energetic, needs a yard.', 'https://placehold.co/600x600?text=Max', 'available'),
  ('Luna', 'cat', 'Siamese', 18, 'female', 'Quiet, likes to sit on laps.', 'https://placehold.co/600x600?text=Luna', 'available'),
  ('Tom', 'cat', 'British Shorthair', 48, 'male', 'Independent and clean.', 'https://placehold.co/600x600?text=Tom', 'available'),
  ('Milo', 'cat', 'Mixed', 6, 'male', 'Playful kitten.', 'https://placehold.co/600x600?text=Milo', 'available'),
  ('Daisy', 'dog', 'Beagle', 60, 'female', 'Gentle senior dog.', 'https://placehold.co/600x600?text=Daisy', 'reserved'),
  ('Charlie', 'dog', 'Husky', 30, 'male', 'Needs long daily walks.', 'https://placehold.co/600x600?text=Charlie', 'available'),
  ('Nala', 'cat', 'Maine Coon', 20, 'female', 'Large, fluffy and calm.', 'https://placehold.co/600x600?text=Nala', 'available'),
  ('Coco', 'other', 'Rabbit', 10, 'female', 'Gets along with other pets.', 'https://placehold.co/600x600?text=Coco', 'available'),
  ('Buddy', 'dog', 'Corgi', 42, 'male', 'Loves people and treats.', 'https://placehold.co/600x600?text=Buddy', 'adopted'),
  ('Shadow', 'cat', 'Mixed', 72, 'male', 'Shy at first, then very affectionate.', 'https://placehold.co/600x600?text=Shadow', 'available');

insert into public.events (title, description, starts_at, location, lat, lng, cover_url) values
                                                                                             ('Adoption day', 'Meet animals looking for a home.', now() + interval '7 days', 'Kyiv, Khreshchatyk St', 50.4501, 30.5234, 'https://placehold.co/600x400?text=Adoption+day'),
                                                                                             ('Charity walk', 'Walk with the shelter dogs and support the shelter.', now() + interval '14 days', 'Kyiv, Shevchenko Park', 50.4425, 30.5101, 'https://placehold.co/600x400?text=Charity+walk'),
                                                                                             ('Vaccination day', 'Free checkups for adopted pets.', now() + interval '21 days', 'Kyiv, Podil', 50.4640, 30.5160, 'https://placehold.co/600x400?text=Vaccination+day'),
                                                                                             ('Volunteer meetup', 'Learn how to help the shelter.', now() + interval '30 days', 'Kyiv, Obolon', 50.5010, 30.4980, 'https://placehold.co/600x400?text=Volunteer+meetup'),
                                                                                             ('Winter fundraiser', 'Collecting warm blankets and food.', now() + interval '45 days', 'Kyiv, Lukianivska', 50.4620, 30.4810, 'https://placehold.co/600x400?text=Winter+fundraiser');