const titleCollator = new Intl.Collator("uk-UA");

export function normalize(text) {
  return text.trim().toLocaleLowerCase("uk-UA");
}

export function matchesQuery(item, query) {
  const needle = normalize(query);
  if (needle === "") {
    return true;
  }
  return normalize(item.title).includes(needle)
    || normalize(item.description).includes(needle);
}

export function filterByQuery(items, query) {
  return items.filter((item) => matchesQuery(item, query));
}

export function filterByCategory(items, category) {
  if (category === "all") {
    return items.slice();
  }
  return items.filter((item) => item.category === category);
}

export function compareByTitle(a, b) {
  return titleCollator.compare(a.title, b.title);
}

export function compareByPriceAsc(a, b) {
  return a.price - b.price;
}

export function compareByDateDesc(a, b) {
  return b.addedAt.localeCompare(a.addedAt);
}

const COMPARATORS = {
  "title-asc": compareByTitle,
  "price-asc": compareByPriceAsc,
  "price-desc": (a, b) => compareByPriceAsc(b, a),
  "date-desc": compareByDateDesc
};

export function getComparator(sortKey) {
  return COMPARATORS[sortKey] ?? compareByTitle;
}

export function applyFilters(items, state) {
  return filterByCategory(filterByQuery(items, state.query), state.category)
    .toSorted(getComparator(state.sort));
}
