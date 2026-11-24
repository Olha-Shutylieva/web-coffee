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

export function calculateStats(items) {
  const initial = { count: 0, total: 0, min: Infinity, max: -Infinity, inStock: 0 };
  const acc = items.reduce((result, item) => ({
    count: result.count + 1,
    total: result.total + item.price,
    min: Math.min(result.min, item.price),
    max: Math.max(result.max, item.price),
    inStock: result.inStock + (item.inStock ? 1 : 0)
  }), initial);

  return {
    count: acc.count,
    average: acc.count === 0 ? null : acc.total / acc.count,
    min: acc.count === 0 ? null : acc.min,
    max: acc.count === 0 ? null : acc.max,
    inStock: acc.inStock
  };
}

export function countByCategory(items) {
  return items.reduce((result, item) => ({
    ...result,
    [item.category]: (result[item.category] ?? 0) + 1
  }), {});
}
