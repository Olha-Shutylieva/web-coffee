# Словник полів моделі позиції

Назви в колонці `name` стабільні. Їх без змін використовують розмітка форм, валідація JavaScript, типи TypeScript і ключі JSON під час обміну з API.

| Поле | name | Тип даних | Елемент | Обмеження |
| --- | --- | --- | --- | --- |
| Назва | `title` | рядок | text | required, minlength 2, maxlength 80 |
| Артикул | `sku` | рядок | text | required, pattern `^[A-Z]{2}-\d{3}$`, maxlength 6 |
| Зображення | `image` | файл | file | accept SVG, WebP, PNG |
| Категорія | `category` | рядок | select | required; перший пункт порожній |
| Ціна | `price` | число | number | required, min 1, max 9999, step 1 |
| Об'єм або вага | `volume` | число | number | required, min 1, max 1000, step 1 |
| Дата додавання | `addedAt` | дата | date | required, min 2024-01-01, max 2027-12-31 |
| Опис | `description` | рядок | textarea | required, maxlength 300 |
| Наявність | `inStock` | логічне | checkbox | value `true`; знятий прапорець не надсилається |
| Ідентифікатор | `id` | рядок | hidden | лише форма редагування |

Значення `category`: `coffee`, `tea`, `dessert`, `seasonal`.

`volume` — ціле число без одиниць: мілілітри для напоїв або грами для десертів.

Поле `image` у запиті get передає лише ім'я файлу, не вміст.
