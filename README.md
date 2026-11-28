# Pet Protect

Сайт притулку для тварин (тема 19 персонального проекту: «Сайт, присвячений захисту тварин»).
Це односторінковий застосунок (SPA): перегляд каталогу безпритульних тварин, заявка на
усиновлення, спонсорство тварини, події притулку, галерея і сторінка контактів з картою.

## Стек

- React 19, TypeScript, Vite
- React Router (SPA-навігація)
- TanStack Query (запити, кеш, повторні спроби)
- Supabase (база PostgreSQL, Row Level Security, вхід через Google)
- SCSS (partials у `src/styles`)
- Leaflet + OpenStreetMap (карта на сторінці «Контакти»)
- ESLint, Vitest

## Можливості

- Слайдер зображень у шапці і головне горизонтальне меню з підменю
- Ліве багаторівневе меню (3 рівні, відступ рівня 16px, ширина 256px) з власною прокруткою
- Хлібні крихти; шапка і крихти нерухомі, прокручується тільки блок контенту
- Каталог тварин: пошук, фільтри за видом і статусом, сортування, клієнтська пагінація
  (10 елементів на сторінку); параметри зберігаються в URL
- Сторінка тварини: заявка на усиновлення (з можливістю скасувати), спонсорство, шаринг
- Події притулку, галерея (плитки 300x300, лайтбокс), контакти з картою
- Вхід через Google, ім'я і аватар користувача в шапці
- Шаринг у Facebook, Telegram, X і копіювання посилання

## Запуск

Потрібні Node.js і npm. Для локальної бази ще Supabase CLI і Docker.

```bash
npm install
```

Створи файл `.env.local` за зразком `.env.example`:

```bash
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local
```

| Змінна | Значення |
| --- | --- |
| `VITE_SUPABASE_URL` | адреса Supabase API (локально `http://127.0.0.1:54321`) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | публічний (publishable / anon) ключ проекту |

Без цих змінних застосунок завершується з помилкою `Missing Supabase environment variables`.

```bash
npm run dev
```

Застосунок відкривається на `http://localhost:5173`.

## База даних (Supabase)

Схема лежить у `supabase/migrations`, тестові дані у `supabase/seed.sql`.

**Локально:**

```bash
supabase start
supabase db reset        # застосовує міграції і seed.sql
```

`supabase status` показує URL і ключ для `.env.local`.

**Віддалений проект:**

```bash
supabase link --project-ref <ref>
supabase db push         # застосовує міграції
```

`seed.sql` на віддаленому проекті виконується вручну в SQL Editor.

### Вхід через Google

1. У Supabase Dashboard: Authentication → Providers → Google, увімкнути і вказати Client ID та
   Client Secret з Google Cloud Console.
2. У Authentication → URL Configuration додати адресу застосунку (`http://localhost:5173`
   для розробки) в Site URL і Redirect URLs.
3. У Google Cloud Console в Authorized redirect URIs додати callback-адресу з Supabase
   (вона показана на сторінці провайдера Google).

Для локального Supabase ті самі налаштування задаються в `supabase/config.toml`
(`auth.site_url`, `auth.additional_redirect_urls`, `[auth.external.google]`). Значення
`site_url` за замовчуванням вказує на порт 3000, а Vite запускається на 5173, тому його
треба змінити.

## Скрипти

| Команда | Що робить |
| --- | --- |
| `npm run dev` | dev-сервер Vite |
| `npm run build` | перевірка типів (`tsc -b`) і збірка |
| `npm run preview` | перегляд зібраної версії |
| `npm run lint` | ESLint |
| `npm test` | Vitest у режимі спостереження (`npm test -- --run` для одного запуску) |

## Структура

```
src/
  app/            дані навігації (головне і ліве меню), дані притулку
  components/     загальні компоненти: Modal, Pagination, SelectField, стани, карта
    layout/       шапка, слайдер, меню, хлібні крихти, розкладка сторінки
  features/       код окремих частин: animal, auth, catalog, contacts, events,
                  gallery, home, share
  hooks/          React Query хуки (useAnimals, useEvents, useAdoption, ...)
  lib/            чиста логіка без React: форматування, помилки, пагінація, навігація
  pages/          сторінки, що збирають features
  repositories/   запити до Supabase
  styles/         SCSS partials
  types/          типи даних
supabase/         міграції, seed, конфіг
```

## Архітектурні рішення

- **Шари.** `repositories` (запити до Supabase) → `hooks` (React Query) → `features` і `pages`
  (відображення). Компоненти не звертаються до Supabase напряму.
- **Каталог.** Усі тварини завантажуються одним запитом і кешуються. Пошук, фільтри, сортування
  і пагінація виконуються чистою функцією `buildCatalogPage`, яка покрита тестами. Поле пошуку
  має локальний стан, в URL значення потрапляє через 300 мс після останнього символу.
- **Помилки.** Помилки Supabase перетворюються на `AppError` з типом (`network`, `not_found`,
  `conflict`, `unauthorized`, `unknown`). Інтерфейс показує зрозуміле повідомлення і кнопку
  «Retry» там, де повтор має сенс. Збій завантаження карти не ламає сторінку
  (`ErrorBoundary`).
- **Швидкість.** Leaflet завантажується окремим чанком тільки на сторінці «Контакти».
  Зображення завантажуються ліниво (`loading="lazy"`).
- **Безпека даних.** На всіх таблицях увімкнений Row Level Security. Користувач бачить і
  змінює тільки власні заявки і спонсорства. Резервування тварини виконує тригер у базі.
  Одна активна (`pending`) заявка на користувача гарантується унікальним індексом.

## Дані-заглушки

Контакти притулку (адреса, телефон, email, години роботи, координати) лежать у
`src/app/shelter.ts` і містять тестові значення. Перед здачею заміни їх на реальні.
