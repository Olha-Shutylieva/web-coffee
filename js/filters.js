export const DEFAULT_STATE = { query: "", category: "all", sort: "title-asc" };

const CATEGORIES = new Set(["all", "coffee", "tea", "dessert", "seasonal", "snacks"]);
const SORTS = new Set(["title-asc", "price-asc", "price-desc", "date-desc"]);
const QUERY_MAX = 80;

export function readFilterState(form) {
  const data = new FormData(form);
  return {
    query: String(data.get("query") ?? DEFAULT_STATE.query),
    category: String(data.get("category") ?? DEFAULT_STATE.category),
    sort: String(data.get("sort") ?? DEFAULT_STATE.sort)
  };
}

export function readFilterStateFromSearch(search) {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const query = params.get("query");
  const category = params.get("category");
  const sort = params.get("sort");
  return {
    query: query === null ? DEFAULT_STATE.query : query.slice(0, QUERY_MAX),
    category: CATEGORIES.has(category) ? category : DEFAULT_STATE.category,
    sort: SORTS.has(sort) ? sort : DEFAULT_STATE.sort
  };
}

export function writeFilterState(form, state) {
  form.elements.query.value = state.query;
  for (const radio of form.elements.category) {
    radio.checked = radio.value === state.category;
  }
  form.elements.sort.value = state.sort;
}
