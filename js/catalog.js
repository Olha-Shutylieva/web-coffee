import { createCard } from "./card.js";

export function createEmptyState() {
  const item = document.createElement("li");
  item.className = "catalog__empty";
  const message = document.createElement("p");
  message.textContent = "У меню ще немає позицій.";
  item.append(message);
  return item;
}

export function renderCatalog(list, items, template, pageHref) {
  if (items.length === 0) {
    list.replaceChildren(createEmptyState());
    return 0;
  }

  const cards = items.map((item) => {
    const entry = document.createElement("li");
    entry.className = "catalog__item";
    entry.append(createCard(item, template, pageHref));
    return entry;
  });

  list.replaceChildren(...cards);
  return cards.length;
}
