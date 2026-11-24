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
