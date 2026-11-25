import { handleCatalogClick, updateFavoriteCount } from "./actions.js";
import { createCard } from "./card.js";
import { renderCatalog } from "./catalog.js";
import { applyFilters } from "./collection.js";
import { items } from "./data.js";
import { debounce } from "./debounce.js";
import { requireElement } from "./dom.js";
import { DEFAULT_STATE, readFilterState, readFilterStateFromSearch, writeFilterState } from "./filters.js";
import { formDataToItem, todayIso } from "./form-data.js";
import {
  handleFieldBlur,
  handleFieldChange,
  handleFieldInput,
  handleReset,
  handleSubmit
} from "./form-validation.js";
import { formatFilterCategory, formatFoundCount } from "./format.js";
import { itemFieldRules } from "./validators.js";

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
bindItemForm();

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

function bindItemForm() {
  const itemForm = requireElement(document, "#catalog-add");
  const summary = requireElement(document, "#catalog-add-errors");
  const preview = requireElement(document, "#catalog-add-preview");
  const previewList = requireElement(document, "#catalog-add-preview-list");
  const previewJson = requireElement(document, "#catalog-add-preview-json");
  const options = {
    rules: itemFieldRules,
    summary,
    dependents: { category: ["volume"] },
    getContext() {
      return {
        items,
        currentId: null,
        today: todayIso(),
        category: itemForm.elements.category.value
      };
    },
    onInvalid: hidePreview,
    onReset: hidePreview,
    onValid(current) {
      showPreview(formDataToItem(new FormData(current), {
        id: crypto.randomUUID(),
        image: null,
        imageAlt: "Фото позиції меню",
        sizes: []
      }));
    }
  };

  itemForm.noValidate = true;
  itemForm.addEventListener("input", (event) => handleFieldInput(event, options));
  itemForm.addEventListener("focusout", (event) => handleFieldBlur(event, options));
  itemForm.addEventListener("change", (event) => handleFieldChange(event, options));
  itemForm.addEventListener("submit", (event) => handleSubmit(event, options));
  itemForm.addEventListener("reset", (event) => handleReset(event, options));

  function hidePreview() {
    preview.hidden = true;
    previewList.replaceChildren();
    previewJson.textContent = "";
  }

  function showPreview(item) {
    const entry = document.createElement("li");
    entry.className = "catalog__item";
    entry.append(createCard({
      ...item,
      image: item.image || "logo.svg",
      imageAlt: item.imageAlt
    }, template, document.baseURI));
    previewList.replaceChildren(entry);
    previewJson.textContent = JSON.stringify(item, null, 2);
    preview.hidden = false;
  }
}
