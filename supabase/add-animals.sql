-- Adds more animals to an already seeded database. Safe to run more than once.
insert into public.animals (name, species, breed, age_months, sex, description, photo_url, status)
select v.name, v.species, v.breed, v.age_months, v.sex, v.description, v.photo_url, v.status
from (values
  ('Oscar', 'dog', 'Golden Retriever', 28, 'male', 'Patient and happy to learn.', '/img/animals/oscar.jpg', 'available'),
  ('Cleo', 'cat', 'Persian', 30, 'female', 'Calm and enjoys gentle brushing.', '/img/animals/cleo.jpg', 'available'),
  ('Rocky', 'dog', 'Boxer', 40, 'male', 'Playful and full of energy.', '/img/animals/rocky.jpg', 'available'),
  ('Simba', 'cat', 'Bengal', 14, 'male', 'Curious and loves to climb.', '/img/animals/simba.jpg', 'available'),
  ('Molly', 'dog', 'Poodle', 54, 'female', 'Smart and quick to learn commands.', '/img/animals/molly.jpg', 'available'),
  ('Misty', 'cat', 'Ragdoll', 22, 'female', 'Relaxed and likes to be held.', '/img/animals/misty.jpg', 'available'),
  ('Archie', 'dog', 'Pug', 33, 'male', 'Cheerful companion for a flat.', '/img/animals/archie.jpg', 'available'),
  ('Felix', 'cat', 'Abyssinian', 16, 'male', 'Active and always exploring.', '/img/animals/felix.jpg', 'available'),
  ('Ruby', 'dog', 'Dachshund', 45, 'female', 'Brave and attached to her people.', '/img/animals/ruby.jpg', 'available'),
  ('Willow', 'cat', 'Birman', 27, 'female', 'Soft-spoken and friendly.', '/img/animals/willow.jpg', 'available'),
  ('Toby', 'dog', 'Shiba Inu', 19, 'male', 'Independent and tidy.', '/img/animals/toby.jpg', 'available'),
  ('Smokey', 'cat', 'Russian Blue', 50, 'male', 'Reserved at first, loyal later.', '/img/animals/smokey.jpg', 'reserved'),
  ('Lola', 'dog', 'Samoyed', 26, 'female', 'Gentle and loves long walks.', '/img/animals/lola.jpg', 'available'),
  ('Hazel', 'cat', 'Siberian', 38, 'female', 'Confident and good with children.', '/img/animals/hazel.jpg', 'available'),
  ('Duke', 'dog', 'Rottweiler', 62, 'male', 'Steady, needs an experienced owner.', '/img/animals/duke.jpg', 'available'),
  ('Pepper', 'cat', 'Bombay', 9, 'female', 'Young, playful and talkative.', '/img/animals/pepper.jpg', 'available'),
  ('Penny', 'dog', 'Cocker Spaniel', 31, 'female', 'Affectionate and eager to please.', '/img/animals/penny.jpg', 'available'),
  ('Leo', 'cat', 'Norwegian Forest', 44, 'male', 'Calm and enjoys high places.', '/img/animals/leo.jpg', 'available'),
  ('Bruno', 'dog', 'Akita', 58, 'male', 'Quiet and devoted.', '/img/animals/bruno.jpg', 'reserved'),
  ('Ginger', 'cat', 'Mixed', 8, 'female', 'Curious kitten that follows people around.', '/img/animals/ginger.jpg', 'available'),
  ('Zoe', 'dog', 'Dalmatian', 23, 'female', 'Needs daily running and games.', '/img/animals/zoe.jpg', 'available'),
  ('Oliver', 'cat', 'Mixed', 66, 'male', 'Mature cat who prefers a quiet home.', '/img/animals/oliver.jpg', 'available'),
  ('Teddy', 'dog', 'Pomeranian', 15, 'male', 'Small, lively and sociable.', '/img/animals/teddy.jpg', 'available'),
  ('Mia', 'cat', 'Mixed', 34, 'female', 'Gentle and gets used to a new home quickly.', '/img/animals/mia.jpg', 'adopted')
) as v (name, species, breed, age_months, sex, description, photo_url, status)
where not exists (select 1 from public.animals a where a.name = v.name);
