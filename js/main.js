import { handleCatalogClick, updateFavoriteCount } from "./actions.js";
import { renderCatalog } from "./catalog.js";
import { applyFilters } from "./collection.js";
import { items } from "./data.js";
import { debounce } from "./debounce.js";
import { requireElement } from "./dom.js";
import { DEFAULT_STATE, readFilterState, readFilterStateFromSearch, writeFilterState } from "./filters.js";
import { formatFilterCategory, formatFoundCount } from "./format.js";

const SEARCH_DELAY_MS = 250;

const list = requireElement(document, ".catalog__list");
const template = requireElement(document, "#card-template");
const counter = requireElement(document, ".favorites");
const form = requireElement(document, "#catalog-filters");
const status = requireElement(document, ".catalog__count");
const resetSort = requireElement(form, "[data-action='reset-sort']");

let state = readFilterStateFromSearch(window.location.search);
writeFilterState(form, state);

function updatePage() {
  const visible = applyFilters(items, state);
  renderCatalog(list, visible, template, document.baseURI, {
    query: state.query,
    category: state.category,
    categoryLabel: formatFilterCategory(state.category),
    catalogEmpty: items.length === 0,
    formId: form.id
  });
  status.textContent = formatFoundCount(visible.length);
  updateFavoriteCount(counter, list);
  resetSort.hidden = state.sort === DEFAULT_STATE.sort;
  syncAddress(state);
}

const renderQuery = debounce(() => {
  state = readFilterState(form);
  updatePage();
}, SEARCH_DELAY_MS);

form.addEventListener("input", (event) => {
  if (event.target.name !== "query") {
    return;
  }
  renderQuery();
});

form.addEventListener("change", (event) => {
  if (event.target.name === "query") {
    return;
  }
  state = readFilterState(form);
  updatePage();
});

resetSort.addEventListener("click", () => {
  form.elements.sort.value = DEFAULT_STATE.sort;
  state = readFilterState(form);
  updatePage();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state = readFilterState(form);
  updatePage();
});

form.addEventListener("reset", () => {
  state = { ...DEFAULT_STATE };
  updatePage();
});

list.addEventListener("click", (event) => {
  handleCatalogClick(event, counter);
});

updatePage();

function syncAddress(nextState) {
  const url = new URL(window.location.href);
  assignParam(url.searchParams, "query", nextState.query, DEFAULT_STATE.query);
  assignParam(url.searchParams, "category", nextState.category, DEFAULT_STATE.category);
  assignParam(url.searchParams, "sort", nextState.sort, DEFAULT_STATE.sort);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    history.replaceState(null, "", next);
  }
}

function assignParam(params, key, value, fallback) {
  if (value === fallback) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
}
