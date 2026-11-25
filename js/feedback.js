import { requireElement } from "./dom.js";
import {
  handleFieldBlur,
  handleFieldChange,
  handleFieldInput,
  handleReset,
  handleSubmit
} from "./form-validation.js";
import { reviewFieldRules } from "./validators.js";

const form = requireElement(document, "#review-form");
const summary = requireElement(document, "#review-errors");
const status = requireElement(document, "#review-status");

let keepStatus = false;

const options = {
  rules: reviewFieldRules,
  summary,
  dependents: {},
  getContext() {
    return {
      items: [],
      currentId: null,
      today: "",
      category: ""
    };
  },
  onInvalid() {
    status.textContent = "";
  },
  onReset() {
    if (keepStatus) {
      keepStatus = false;
      return;
    }
    status.textContent = "";
  },
  onValid(current) {
    keepStatus = true;
    current.reset();
    status.textContent = "Дякуємо, відгук прийнято.";
  }
};

form.noValidate = true;
form.addEventListener("input", (event) => handleFieldInput(event, options));
form.addEventListener("focusout", (event) => handleFieldBlur(event, options));
form.addEventListener("change", (event) => handleFieldChange(event, options));
form.addEventListener("submit", (event) => handleSubmit(event, options));
form.addEventListener("reset", (event) => handleReset(event, options));
