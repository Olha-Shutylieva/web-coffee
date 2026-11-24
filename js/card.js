import {
  buildDetailsUrl,
  formatAvailability,
  formatCategory,
  formatDate,
  formatPrice,
  formatQuantity,
  volumeUnit
} from "./format.js";

export function createCard(item, template, pageHref) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".card");

  card.dataset.id = item.id;
  card.dataset.inStock = String(item.inStock);

  const link = card.querySelector(".card__title-link");
  link.href = buildDetailsUrl(item.id, pageHref);
  link.textContent = item.title;

  const image = card.querySelector("img");
  image.src = `images/${item.image}`;
  image.alt = item.imageAlt;

  const description = card.querySelector(".card__description-text");
  description.id = `description-${item.id}`;
  description.textContent = item.description;

  const toggle = card.querySelector("[data-action='toggle-description']");
  toggle.setAttribute("aria-controls", description.id);

  card.querySelector(".card__badge").textContent = formatCategory(item.category);

  const status = card.querySelector(".status");
  status.classList.add(item.inStock ? "status--available" : "status--unavailable");
  status.textContent = formatAvailability(item.inStock);

  const price = card.querySelector(".card__price");
  price.value = String(item.price);
  price.textContent = formatPrice(item.price);

  const volume = card.querySelector(".card__volume");
  if (item.volume === null) {
    volume.remove();
  } else {
    volume.value = String(item.volume);
    volume.textContent = formatQuantity(item.volume, volumeUnit(item.category));
  }

  const added = card.querySelector("time");
  added.dateTime = item.addedAt;
  added.textContent = formatDate(item.addedAt);

  return fragment.firstElementChild;
}
