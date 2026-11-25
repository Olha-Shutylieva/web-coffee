import { createCard } from "./card.js";
import { findItem, items } from "./data.js";
import { readItemId } from "./details.js";
import { requireElement } from "./dom.js";
import { fillForm, formDataToItem, todayIso } from "./form-data.js";
import {
  handleFieldBlur,
  handleFieldChange,
  handleFieldInput,
  handleReset,
  handleSubmit
} from "./form-validation.js";
import { itemFieldRules } from "./validators.js";

const form = requireElement(document, "#edit-item");
const summary = requireElement(document, "#edit-errors");
const preview = requireElement(document, "#edit-preview");
const previewList = requireElement(document, "#edit-preview-list");
const previewJson = requireElement(document, "#edit-preview-json");
const template = requireElement(document, "#card-template");
const heading = requireElement(document, "#edit-title");
const crumb = requireElement(document, "#crumb-current");
const missing = requireElement(document, "#edit-missing");
const currentImage = requireElement(document, "#current-image");
const item = findItem(items, readItemId(window.location.search));

if (item === null) {
  form.hidden = true;
  preview.hidden = true;
  missing.hidden = false;
  heading.textContent = "Позицію не знайдено";
  crumb.textContent = "Позицію не знайдено";
  document.title = "Позицію не знайдено – Кав'ярня";
} else {
  heading.textContent = `Редагування: ${item.title}`;
  crumb.textContent = `Редагування: ${item.title}`;
  document.title = `Редагування: ${item.title} – Кав'ярня`;
  fillForm(form, item);
  currentImage.hidden = false;
  currentImage.textContent = `Поточне зображення: images/${item.image}. Новий файл можна обрати нижче.`;

  const options = {
    rules: itemFieldRules,
    summary,
    dependents: { category: ["volume"] },
    getContext() {
      return {
        items,
        currentId: item.id,
        today: todayIso(),
        category: form.elements.category.value
      };
    },
    restore() {
      fillForm(form, item);
      form.elements.image.value = "";
    },
    onInvalid: hidePreview,
    onReset: hidePreview,
    onValid(current) {
      showPreview(formDataToItem(new FormData(current), {
        id: item.id,
        image: item.image,
        imageAlt: item.imageAlt,
        sizes: item.sizes
      }));
    }
  };

  form.noValidate = true;
  form.addEventListener("input", (event) => handleFieldInput(event, options));
  form.addEventListener("focusout", (event) => handleFieldBlur(event, options));
  form.addEventListener("change", (event) => handleFieldChange(event, options));
  form.addEventListener("submit", (event) => handleSubmit(event, options));
  form.addEventListener("reset", (event) => handleReset(event, options));
}

function hidePreview() {
  preview.hidden = true;
  previewList.replaceChildren();
  previewJson.textContent = "";
}

function showPreview(next) {
  const entry = document.createElement("li");
  entry.className = "catalog__item";
  entry.append(createCard({
    ...next,
    image: next.image || "logo.svg",
    imageAlt: next.imageAlt
  }, template, document.baseURI));
  previewList.replaceChildren(entry);
  previewJson.textContent = JSON.stringify(next, null, 2);
  preview.hidden = false;
}
