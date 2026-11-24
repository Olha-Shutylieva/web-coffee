import { createCard } from "./card.js";
import { createHighlightedText } from "./highlight.js";

export function createEmptyState() {
  const item = document.createElement("li");
  item.className = "catalog__empty";
  const message = document.createElement("p");
  message.textContent = "У меню ще немає позицій.";
  item.append(message);
  return item;
}

export function renderCatalog(list, items, template, pageHref, view = {}) {
  const query = view.query ?? "";
  if (items.length === 0) {
    const empty = view.catalogEmpty === false
      ? createFilteredEmptyState(view)
      : createEmptyState();
    list.replaceChildren(empty);
    return 0;
  }

  const cards = items.map((item) => {
    const entry = document.createElement("li");
    entry.className = "catalog__item";
    const card = createCard(item, template, pageHref);
    const title = card.querySelector(".card__title-link");
    title.replaceChildren(...createHighlightedText(item.title, query));
    entry.append(card);
    return entry;
  });

  list.replaceChildren(...cards);
  return cards.length;
}

function createFilteredEmptyState(view) {
  const item = document.createElement("li");
  item.className = "catalog__empty";
  const message = document.createElement("p");
  message.textContent = `За запитом «${view.query}» у категорії «${view.categoryLabel}» нічого не знайдено.`;
  const reset = document.createElement("button");
  reset.className = "button button--secondary";
  reset.type = "reset";
  reset.setAttribute("form", view.formId);
  reset.textContent = "Скинути фільтри";
  item.append(message, reset);
  return item;
}
