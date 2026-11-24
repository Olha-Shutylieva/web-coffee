import { formatFavoriteCount } from "./format.js";

export function handleCatalogClick(event, counter) {
  const button = event.target.closest("[data-action]");
  if (button === null || !event.currentTarget.contains(button)) {
    return;
  }

  const card = button.closest(".card");
  if (button.dataset.action === "favorite") {
    toggleFavorite(button);
    updateFavoriteCount(counter, event.currentTarget);
  } else if (button.dataset.action === "toggle-description") {
    toggleDescription(button, card);
  }
}

export function updateFavoriteCount(counter, list) {
  const count = list.querySelectorAll("[data-action='favorite'][aria-pressed='true']").length;
  counter.textContent = formatFavoriteCount(count);
}

function toggleFavorite(button) {
  const pressed = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!pressed));
  button.setAttribute("aria-label", pressed ? "У вибране" : "Прибрати з вибраного");
}

function toggleDescription(button, card) {
  const controls = button.getAttribute("aria-controls");
  const panel = card.querySelector(`#${CSS.escape(controls)}`);
  if (panel === null) {
    return;
  }

  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  panel.hidden = expanded;
  button.setAttribute("aria-label", expanded ? "Показати опис" : "Сховати опис");
}
