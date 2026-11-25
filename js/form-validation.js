import { getNativeMessage } from "./messages.js";

function constraintControl(field) {
  if (field.type !== "radio") {
    return field;
  }
  const group = [...field.form.elements[field.name]];
  return group.find((radio) => radio.required) ?? field;
}

function groupMembers(field) {
  if (field.type !== "radio") {
    return [field];
  }
  return [...field.form.elements[field.name]];
}

function fieldValue(field) {
  if (field.type === "radio") {
    return field.form.elements[field.name].value;
  }
  return field.value;
}

export function validateField(field, rules, context) {
  const control = constraintControl(field);
  for (const item of groupMembers(field)) {
    item.setCustomValidity("");
  }

  const nativeMessage = getNativeMessage(control);
  if (nativeMessage !== "") {
    return nativeMessage;
  }

  const fieldRules = rules[field.name] ?? [];
  for (const rule of fieldRules) {
    const message = rule(fieldValue(field), context);
    if (message !== "") {
      control.setCustomValidity(message);
      return message;
    }
  }
  return "";
}

export function findErrorElement(field) {
  const ids = (field.getAttribute("aria-describedby") ?? "").split(/\s+/);
  for (const id of ids) {
    if (id.endsWith("-error")) {
      const element = document.getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return null;
}

export function showFieldError(field, message) {
  for (const item of groupMembers(field)) {
    item.setAttribute("aria-invalid", "true");
  }
  if (field.type === "radio") {
    field.closest("fieldset")?.setAttribute("aria-invalid", "true");
  }
  const error = findErrorElement(field);
  if (error) {
    error.textContent = message;
  }
}

export function clearFieldError(field) {
  for (const item of groupMembers(field)) {
    item.removeAttribute("aria-invalid");
    item.setCustomValidity("");
  }
  if (field.type === "radio") {
    field.closest("fieldset")?.removeAttribute("aria-invalid");
  }
  const error = findErrorElement(field);
  if (error) {
    error.textContent = "";
  }
}

function labelOf(field) {
  if (field.type === "radio") {
    const legend = field.closest("fieldset")?.querySelector("legend");
    if (legend) {
      return legend.textContent.trim();
    }
  }
  const label = field.labels?.[0];
  if (label) {
    return label.textContent.trim().replace(/\s+/g, " ");
  }
  return field.name;
}

export function renderErrorSummary(container, errors) {
  container.replaceChildren();
  if (errors.length === 0) {
    container.hidden = true;
    return;
  }

  const title = document.createElement("h3");
  title.className = "form-errors__title";
  title.textContent = `У формі є помилки: ${errors.length}`;

  const list = document.createElement("ul");
  list.className = "form-errors__list";
  for (const error of errors) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${error.field.id}`;
    link.textContent = `${labelOf(error.field)}: ${error.message}`;
    item.append(link);
    list.append(item);
  }

  container.append(title, list);
  container.hidden = false;
}

function canValidate(field) {
  return Boolean(field)
    && field.nodeType === 1
    && "validity" in field
    && field.name !== ""
    && !field.disabled
    && field.type !== "hidden"
    && field.type !== "file"
    && field.type !== "range"
    && field.type !== "submit"
    && field.type !== "reset"
    && field.type !== "button";
}

export function validateForm(form, rules, context, summary) {
  const errors = [];
  const seen = new Set();

  for (const field of form.elements) {
    if (!canValidate(field) || seen.has(field.name)) {
      continue;
    }
    seen.add(field.name);
    const message = validateField(field, rules, context);
    if (message === "") {
      clearFieldError(field);
    } else {
      showFieldError(field, message);
      errors.push({ field: constraintControl(field), message });
    }
  }

  renderErrorSummary(summary, errors);
  if (errors.length > 0) {
    summary.focus();
    return false;
  }
  return true;
}

function readField(event) {
  const field = event.target;
  if (!(field instanceof HTMLElement) || !("validity" in field)) {
    return null;
  }
  if (field.form !== event.currentTarget || !canValidate(field)) {
    return null;
  }
  return field;
}

function isTextEntry(field) {
  return field.tagName === "TEXTAREA"
    || ["text", "search", "email", "tel", "url", "password", "number", "date"].includes(field.type);
}

function isChoice(field) {
  return field.type === "radio" || field.type === "checkbox" || field.tagName === "SELECT";
}

function isErrorShown(field) {
  return groupMembers(field).some((item) => item.getAttribute("aria-invalid") === "true");
}

function refreshField(field, options) {
  const message = validateField(field, options.rules, options.getContext());
  if (message === "") {
    clearFieldError(field);
  } else {
    showFieldError(field, message);
  }
}

function refreshDependents(field, options) {
  const names = options.dependents[field.name] ?? [];
  for (const name of names) {
    const dependent = field.form.elements[name];
    if (dependent && "validity" in dependent && isErrorShown(dependent)) {
      refreshField(dependent, options);
    }
  }
}

export function clearFormMessages(form, summary) {
  const seen = new Set();
  for (const field of form.elements) {
    if (!canValidate(field) || seen.has(field.name)) {
      continue;
    }
    seen.add(field.name);
    clearFieldError(field);
  }
  renderErrorSummary(summary, []);
}

export function handleFieldInput(event, options) {
  const field = readField(event);
  if (field === null || !isTextEntry(field) || !isErrorShown(field)) {
    return;
  }
  refreshField(field, options);
  refreshDependents(field, options);
}

export function handleFieldBlur(event, options) {
  const field = readField(event);
  if (field === null || !isTextEntry(field)) {
    return;
  }
  refreshField(field, options);
  refreshDependents(field, options);
}

export function handleFieldChange(event, options) {
  const field = readField(event);
  if (field === null || !isChoice(field)) {
    return;
  }
  refreshField(field, options);
  refreshDependents(field, options);
}

export function handleSubmit(event, options) {
  event.preventDefault();
  const form = event.currentTarget;
  const valid = validateForm(form, options.rules, options.getContext(), options.summary);
  if (!valid) {
    options.onInvalid?.();
    return;
  }
  options.onValid(form);
}

export function handleReset(event, options) {
  const form = event.currentTarget;
  if (options.restore) {
    event.preventDefault();
    options.restore();
    clearFormMessages(form, options.summary);
    options.onReset?.();
    return;
  }
  window.setTimeout(() => {
    clearFormMessages(form, options.summary);
    options.onReset?.();
  }, 0);
}
