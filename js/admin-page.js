import { createCard } from "./card.js";
import { calculateStats, countByCategory } from "./collection.js";
import { items } from "./data.js";
import { requireElement } from "./dom.js";
import { formDataToItem, todayIso } from "./form-data.js";
import {
  handleFieldBlur,
  handleFieldChange,
  handleFieldInput,
  handleReset,
  handleSubmit
} from "./form-validation.js";
import { renderStats } from "./stats.js";
import { itemFieldRules } from "./validators.js";

const stats = requireElement(document, ".stats");
renderStats(stats, calculateStats(items), countByCategory(items));

const form = requireElement(document, "#add-item");
const summary = requireElement(document, "#add-errors");
const preview = requireElement(document, "#add-preview");
const previewList = requireElement(document, "#add-preview-list");
const previewJson = requireElement(document, "#add-preview-json");
const template = requireElement(document, "#card-template");

const options = {
  rules: itemFieldRules,
  summary,
  dependents: { category: ["volume"] },
  getContext() {
    return {
      items,
      currentId: null,
      today: todayIso(),
      category: form.elements.category.value
    };
  },
  onInvalid: hidePreview,
  onReset: hidePreview,
  onValid(current) {
    const item = formDataToItem(new FormData(current), {
      id: crypto.randomUUID(),
      image: null,
      imageAlt: "Фото позиції меню",
      sizes: []
    });
    showPreview(item);
  }
};

form.noValidate = true;
form.addEventListener("input", (event) => handleFieldInput(event, options));
form.addEventListener("focusout", (event) => handleFieldBlur(event, options));
form.addEventListener("change", (event) => handleFieldChange(event, options));
form.addEventListener("submit", (event) => handleSubmit(event, options));
form.addEventListener("reset", (event) => handleReset(event, options));

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
