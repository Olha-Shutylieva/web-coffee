const priceFormat = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH"
});

const dateFormat = new Intl.DateTimeFormat("uk-UA", {
  dateStyle: "long",
  timeZone: "UTC"
});

const quantityFormat = new Intl.NumberFormat("uk-UA");

const pluralRules = new Intl.PluralRules("uk-UA");

const categoryLabels = {
  coffee: "Кава",
  tea: "Чай",
  dessert: "Десерт",
  seasonal: "Сезонне",
  snacks: "Снеки"
};

const itemForms = {
  one: "позиція",
  few: "позиції",
  many: "позицій",
  other: "позиції"
};

export function formatPrice(amount) {
  return priceFormat.format(amount);
}

export function formatDate(isoDate) {
  return dateFormat.format(new Date(isoDate));
}

export function formatQuantity(value, unit) {
  return `${quantityFormat.format(value)} ${unit}`;
}

export function formatCategory(category) {
  return categoryLabels[category] ?? category;
}

export function formatAvailability(inStock) {
  return inStock ? "є в наявності" : "немає в наявності";
}

export function pluralize(count, forms) {
  return forms[pluralRules.select(count)];
}

const foundForms = {
  one: "позицію",
  few: "позиції",
  many: "позицій",
  other: "позиції"
};

export function formatFavoriteCount(count) {
  return `У вибраному ${quantityFormat.format(count)} ${pluralize(count, itemForms)}`;
}

export function formatFoundCount(count) {
  return `Знайдено ${quantityFormat.format(count)} ${pluralize(count, foundForms)}`;
}

export function formatFilterCategory(category) {
  return category === "all" ? "Усі" : formatCategory(category);
}

export function volumeUnit(category) {
  return category === "dessert" ? "г" : "мл";
}

export function buildDetailsUrl(id, baseHref) {
  const url = new URL("details.html", baseHref);
  url.searchParams.set("id", id);
  return `details.html?${url.searchParams.toString()}`;
}
