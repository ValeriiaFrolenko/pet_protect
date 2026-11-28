// Downloads photos for the shelter into public/img and points seed.sql at them.
//
// Run from the project root:
//   npm i -D sharp
//   node scripts/download-photos.mjs                  (downloads only missing files)
//   node scripts/download-photos.mjs --force          (downloads everything again)
//   node scripts/download-photos.mjs --only=rex,coco  (downloads and overwrites only these)
//
// Sources:
//   - Dog CEO API (https://dog.ceo/dog-api/)        dogs by breed
//   - TheCatAPI (https://thecatapi.com/)            cats by breed
//   - Unsplash CDN (Unsplash License, free to use)  rabbit
//
// Animal photos keep their original aspect ratio (only the size is limited), so the
// catalog and the gallery still get images of different dimensions.

import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const FORCE = process.argv.includes('--force');
const ONLY = new Set(
  (process.argv.find((arg) => arg.startsWith('--only=')) ?? '')
    .replace('--only=', '')
    .split(',')
    .map((slug) => slug.trim().toLowerCase())
    .filter(Boolean),
);
const USER_AGENT = 'Mozilla/5.0 (compatible; pet_protect-photo-script)';

const ANIMALS_DIR = path.join(ROOT, 'public', 'img', 'animals');
const SEED_PATH = path.join(ROOT, 'supabase', 'seed.sql');
const UPDATE_SQL_PATH = path.join(ROOT, 'supabase', 'update-photo-urls.sql');

const ANIMAL_MAX_SIDE = 800;

// source.kind: 'dog' (Dog CEO breed or a list of breeds to try, empty = random),
// 'cat' (TheCatAPI breed id, empty = random),
// 'unsplash' (the "photo-..." part of the images.unsplash.com address).
const ANIMALS = [
  { name: 'Rex', slug: 'rex', source: { kind: 'dog', breed: ['germanshepherd', 'shepherd', 'malinois'] } },
  { name: 'Bella', slug: 'bella', source: { kind: 'dog', breed: 'labrador' } },
  { name: 'Max', slug: 'max', source: { kind: 'dog', breed: 'mix' } },
  { name: 'Luna', slug: 'luna', source: { kind: 'cat', breed: 'siam' } },
  { name: 'Tom', slug: 'tom', source: { kind: 'cat', breed: 'bsho' } },
  { name: 'Milo', slug: 'milo', source: { kind: 'cat', breed: '' } },
  { name: 'Daisy', slug: 'daisy', source: { kind: 'dog', breed: 'beagle' } },
  { name: 'Charlie', slug: 'charlie', source: { kind: 'dog', breed: 'husky' } },
  { name: 'Nala', slug: 'nala', source: { kind: 'cat', breed: 'mcoon' } },
  { name: 'Coco', slug: 'coco', source: { kind: 'unsplash', photo: 'photo-1617398881039-4c977f633b0e' } },
  { name: 'Buddy', slug: 'buddy', source: { kind: 'dog', breed: 'corgi/cardigan' } },
  { name: 'Shadow', slug: 'shadow', source: { kind: 'cat', breed: '' } },
  { name: 'Oscar', slug: 'oscar', source: { kind: 'dog', breed: 'retriever/golden' } },
  { name: 'Cleo', slug: 'cleo', source: { kind: 'cat', breed: 'pers' } },
  { name: 'Rocky', slug: 'rocky', source: { kind: 'dog', breed: 'boxer' } },
  { name: 'Simba', slug: 'simba', source: { kind: 'cat', breed: 'beng' } },
  { name: 'Molly', slug: 'molly', source: { kind: 'dog', breed: 'poodle/standard' } },
  { name: 'Misty', slug: 'misty', source: { kind: 'cat', breed: 'ragd' } },
  { name: 'Archie', slug: 'archie', source: { kind: 'dog', breed: 'pug' } },
  { name: 'Felix', slug: 'felix', source: { kind: 'cat', breed: 'abys' } },
  { name: 'Ruby', slug: 'ruby', source: { kind: 'dog', breed: 'dachshund' } },
  { name: 'Willow', slug: 'willow', source: { kind: 'cat', breed: 'birm' } },
  { name: 'Toby', slug: 'toby', source: { kind: 'dog', breed: 'shiba' } },
  { name: 'Smokey', slug: 'smokey', source: { kind: 'cat', breed: 'rblu' } },
  { name: 'Lola', slug: 'lola', source: { kind: 'dog', breed: 'samoyed' } },
  { name: 'Hazel', slug: 'hazel', source: { kind: 'cat', breed: 'sibe' } },
  { name: 'Duke', slug: 'duke', source: { kind: 'dog', breed: 'rottweiler' } },
  { name: 'Pepper', slug: 'pepper', source: { kind: 'cat', breed: 'bomb' } },
  { name: 'Penny', slug: 'penny', source: { kind: 'dog', breed: ['spaniel/cocker', 'spaniel'] } },
  { name: 'Leo', slug: 'leo', source: { kind: 'cat', breed: 'norw' } },
  { name: 'Bruno', slug: 'bruno', source: { kind: 'dog', breed: 'akita' } },
  { name: 'Ginger', slug: 'ginger', source: { kind: 'cat', breed: '' } },
  { name: 'Zoe', slug: 'zoe', source: { kind: 'dog', breed: 'dalmatian' } },
  { name: 'Oliver', slug: 'oliver', source: { kind: 'cat', breed: '' } },
  { name: 'Teddy', slug: 'teddy', source: { kind: 'dog', breed: 'pomeranian' } },
  { name: 'Mia', slug: 'mia', source: { kind: 'cat', breed: '' } },
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// --only overwrites the listed files and skips the others; --force overwrites everything;
// without flags only missing files are downloaded.
function shouldSkip(slug, fileExists) {
  if (ONLY.size > 0) {
    return !ONLY.has(slug);
  }
  return fileExists && !FORCE;
}

async function fetchOk(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return response;
}

async function fetchJson(url) {
  return (await fetchOk(url)).json();
}

async function fetchBuffer(url) {
  return Buffer.from(await (await fetchOk(url)).arrayBuffer());
}

let dogBreedsPromise;

function loadDogBreeds() {
  dogBreedsPromise ??= fetchJson('https://dog.ceo/api/breeds/list/all').then(
    (data) => data.message ?? {},
  );
  return dogBreedsPromise;
}

// Dog CEO has no stable breed names, so every candidate is checked against its breed list.
async function resolveDogBreed(candidates) {
  const breeds = await loadDogBreeds();

  for (const candidate of [candidates].flat().filter(Boolean)) {
    const [main, sub] = candidate.split('/');
    if (breeds[main] && (!sub || breeds[main].includes(sub))) {
      return candidate;
    }
  }

  return null;
}

async function findDogUrl(breedCandidates) {
  const breed = await resolveDogBreed(breedCandidates);

  if (breed) {
    const data = await fetchJson(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (data.status === 'success' && typeof data.message === 'string') {
      console.log(`  breed: ${breed}`);
      return data.message;
    }
  }

  console.warn(`  no breed found for ${JSON.stringify(breedCandidates)}, using a random dog`);
  const data = await fetchJson('https://dog.ceo/api/breeds/image/random');
  return data.message;
}

async function findCatUrl(breed) {
  const query = breed ? `?breed_ids=${breed}` : '';

  try {
    const data = await fetchJson(`https://api.thecatapi.com/v1/images/search${query}`);
    if (Array.isArray(data) && data[0]?.url) {
      return data[0].url;
    }
  } catch (error) {
    console.warn(`  breed "${breed}" failed (${error.message}), using a random cat`);
  }

  const data = await fetchJson('https://api.thecatapi.com/v1/images/search');
  return data[0].url;
}

// images.unsplash.com is the public image CDN: it needs no login and resizes on request.
function unsplashImageUrl(photo, width) {
  return `https://images.unsplash.com/${photo}?fm=jpg&q=85&w=${width}&fit=max`;
}

async function findSourceUrl(source) {
  if (source.kind === 'dog') {
    return findDogUrl(source.breed);
  }
  if (source.kind === 'cat') {
    return findCatUrl(source.breed);
  }
  return unsplashImageUrl(source.photo, ANIMAL_MAX_SIDE * 2);
}

async function saveAnimal(animal) {
  const target = path.join(ANIMALS_DIR, `${animal.slug}.jpg`);

  if (shouldSkip(animal.slug, await exists(target))) {
    console.log(`skip   ${animal.name}`);
    return true;
  }

  const url = await findSourceUrl(animal.source);
  const buffer = await fetchBuffer(url);

  await sharp(buffer)
    .rotate()
    .resize({
      width: ANIMAL_MAX_SIDE,
      height: ANIMAL_MAX_SIDE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(target);

  console.log(`ok     ${animal.name}`);
  return true;
}

async function patchSeed() {
  if (!(await exists(SEED_PATH))) {
    console.warn('seed.sql not found, skipping');
    return;
  }

  let seed = await readFile(SEED_PATH, 'utf8');

  for (const animal of ANIMALS) {
    const pattern = new RegExp(
      `(\\('${animal.name}',[^\\n]*?)'(?:https://placehold\\.co/[^']*|/img/animals/[^']*)'`,
    );

    if (!pattern.test(seed)) {
      console.warn(`seed.sql: no photo_url found for ${animal.name}`);
      continue;
    }

    seed = seed.replace(pattern, `$1'/img/animals/${animal.slug}.jpg'`);
  }

  await writeFile(SEED_PATH, seed, 'utf8');
  console.log('updated supabase/seed.sql');
}

// For a database that is already seeded: run this file in the Supabase SQL Editor.
async function writeUpdateSql() {
  const lines = ANIMALS.map(
    (animal) =>
      `update public.animals set photo_url = '/img/animals/${animal.slug}.jpg' where name = '${animal.name}';`,
  );

  await writeFile(UPDATE_SQL_PATH, `${lines.join('\n')}\n`, 'utf8');
  console.log('wrote supabase/update-photo-urls.sql');
}

async function main() {
  await mkdir(ANIMALS_DIR, { recursive: true });

  const failures = [];

  for (const animal of ANIMALS) {
    try {
      await saveAnimal(animal);
    } catch (error) {
      console.error(`FAILED ${animal.name}: ${error.message}`);
      failures.push({ file: `public/img/animals/${animal.slug}.jpg`, error });
    }
  }

  await patchSeed();
  await writeUpdateSql();

  if (failures.length > 0) {
    console.error('\nThese files were not downloaded:');
    for (const failure of failures) {
      console.error(`  ${failure.file}`);
    }
    console.error('Run the script again, or put the files in these places by hand.');
    process.exitCode = 1;
  }
}

await main();
