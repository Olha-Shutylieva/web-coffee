import {
  formatAvailability,
  formatCategory,
  formatDate,
  formatPrice,
  formatQuantity,
  volumeUnit
} from "./format.js";

export function readItemId(search) {
  const value = new URLSearchParams(search).get("id");
  if (value === null) {
    return null;
  }
  const id = value.trim();
  return id === "" ? null : id;
}

export function renderDetails(container, crumb, review, item) {
  const found = item !== null;
  review.hidden = !found;
  document.title = found ? `${item.title} – Кав'ярня` : "Позицію не знайдено – Кав'ярня";
  crumb.textContent = found ? item.title : "Позицію не знайдено";
  container.replaceChildren(found ? createItemView(item) : createNotFound());
}

function createNotFound() {
  const article = document.createElement("article");
  article.className = "item";

  const title = document.createElement("h1");
  title.textContent = "Позицію не знайдено";

  const message = document.createElement("p");
  message.textContent = "Позицію не знайдено. Перевірте адресу або поверніться до каталогу.";

  const back = document.createElement("p");
  const link = document.createElement("a");
  link.href = "index.html";
  link.textContent = "Назад до меню";
  back.append(link);

  article.append(title, message, back);
  return article;
}

function createItemView(item) {
  const article = document.createElement("article");
  article.className = "item";

  const title = document.createElement("h1");
  title.textContent = item.title;

  const layout = document.createElement("div");
  layout.className = "item-layout";
  layout.append(createPhoto(item), createSpecs(item));

  article.append(title, createToc(), layout, createDescription(item), createPortions(item), createBackLink());
  return article;
}

function createToc() {
  const nav = document.createElement("nav");
  nav.className = "toc";
  nav.setAttribute("aria-label", "На цій сторінці");

  const heading = document.createElement("h2");
  heading.textContent = "На цій сторінці";

  const list = document.createElement("ul");
  list.className = "toc__list";
  [
    ["#photo", "Фото"],
    ["#specs", "Характеристики"],
    ["#description", "Опис"],
    ["#portions", "Порції та ціни"],
    ["#review", "Відгук"]
  ].forEach(([href, label]) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    item.append(link);
    list.append(item);
  });

  nav.append(heading, list);
  return nav;
}

function createPhoto(item) {
  const section = document.createElement("section");
  section.className = "item-photo";
  section.id = "photo";
  section.setAttribute("aria-labelledby", "photo-title");

  const heading = document.createElement("h2");
  heading.id = "photo-title";
  heading.textContent = "Фото";

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = `images/${item.image}`;
  image.alt = item.imageAlt;
  image.width = 640;
  image.height = 420;
  const caption = document.createElement("figcaption");
  caption.textContent = item.imageAlt;
  figure.append(image, caption);

  section.append(heading, figure);
  return section;
}

function createSpecs(item) {
  const section = document.createElement("section");
  section.className = "item-specs";
  section.id = "specs";
  section.setAttribute("aria-labelledby", "specs-title");

  const heading = document.createElement("h2");
  heading.id = "specs-title";
  heading.textContent = "Характеристики";

  const list = document.createElement("dl");
  list.className = "specs";
  list.append(
    createPair("Категорія", textValue(formatCategory(item.category))),
    createPair("Артикул", textValue(item.sku)),
    createPair("Ціна", dataValue(item.price, formatPrice(item.price)))
  );

  if (item.volume !== null) {
    list.append(createPair("Об'єм", dataValue(item.volume, formatQuantity(item.volume, volumeUnit(item.category)))));
  }

  const added = document.createElement("time");
  added.dateTime = item.addedAt;
  added.textContent = formatDate(item.addedAt);
  list.append(createPair("Дата додавання", added));

  const status = document.createElement("span");
  status.className = item.inStock ? "status status--available" : "status status--unavailable";
  status.textContent = formatAvailability(item.inStock);
  list.append(createPair("Наявність", status));

  section.append(heading, list);
  return section;
}

function createDescription(item) {
  const section = document.createElement("section");
  section.id = "description";
  section.setAttribute("aria-labelledby", "description-title");

  const heading = document.createElement("h2");
  heading.id = "description-title";
  heading.textContent = "Опис";

  const paragraph = document.createElement("p");
  paragraph.textContent = item.description;

  section.append(heading, paragraph);
  return section;
}

function createPortions(item) {
  const section = document.createElement("section");
  section.id = "portions";
  section.setAttribute("aria-labelledby", "portions-title");

  const heading = document.createElement("h2");
  heading.id = "portions-title";
  heading.textContent = "Порції та ціни";

  const scroll = document.createElement("div");
  scroll.className = "table-scroll";

  const table = document.createElement("table");
  table.className = "data-table";

  const caption = document.createElement("caption");
  caption.textContent = `Порції «${item.title}» в меню кав'ярні`;

  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["Порція", "Об'єм", "Ціна", "Калорійність"].forEach((label, index) => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = label;
    if (index > 0) {
      cell.className = "data-table__number";
    }
    headRow.append(cell);
  });
  head.append(headRow);

  const body = document.createElement("tbody");
  item.sizes.forEach((size) => {
    body.append(createSizeRow(size));
  });

  table.append(caption, head, body);
  scroll.append(table);
  section.append(heading, scroll);
  return section;
}

function createSizeRow(size) {
  const row = document.createElement("tr");

  const name = document.createElement("th");
  name.scope = "row";
  name.textContent = size.name;

  const volume = document.createElement("td");
  volume.className = "data-table__number";
  volume.textContent = formatQuantity(size.volume, size.unit);

  const price = document.createElement("td");
  price.className = "data-table__number";
  price.textContent = formatPrice(size.price);

  const calories = document.createElement("td");
  calories.className = "data-table__number";
  calories.textContent = formatQuantity(size.calories, "ккал");

  row.append(name, volume, price, calories);
  return row;
}

function createBackLink() {
  const paragraph = document.createElement("p");
  const link = document.createElement("a");
  link.href = "index.html";
  link.textContent = "Назад до меню";
  paragraph.append(link);
  return paragraph;
}

function createPair(term, value) {
  const pair = document.createElement("div");
  pair.className = "specs__pair";

  const name = document.createElement("dt");
  name.className = "specs__term";
  name.textContent = term;

  const description = document.createElement("dd");
  description.className = "specs__value";
  description.append(value);

  pair.append(name, description);
  return pair;
}

function textValue(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function dataValue(value, text) {
  const data = document.createElement("data");
  data.value = String(value);
  data.textContent = text;
  return data;
}
