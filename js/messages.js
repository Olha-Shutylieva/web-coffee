const MESSAGES = {
  valueMissing: (field) => missingMessage(field),
  typeMismatch: (field) => field.type === "email"
    ? "Введіть адресу у форматі name@example.com"
    : "Введіть значення у правильному форматі",
  patternMismatch: (field) => field.dataset.patternMessage
    || "Введіть значення у правильному форматі",
  tooShort: (field) => `Введіть щонайменше ${field.minLength} символів`,
  tooLong: (field) => `Введіть не більше ${field.maxLength} символів`,
  rangeUnderflow: (field) => rangeMessage(field, "min"),
  rangeOverflow: (field) => rangeMessage(field, "max"),
  stepMismatch: (field) => `Вкажіть значення з кроком ${field.step}`,
  badInput: () => "Введіть число"
};

function missingMessage(field) {
  if (field.dataset.valueMissing) {
    return field.dataset.valueMissing;
  }
  if (field.type === "radio") {
    const required = [...field.form.elements[field.name]]
      .find((radio) => radio.dataset.valueMissing);
    if (required) {
      return required.dataset.valueMissing;
    }
  }
  return "Заповніть це поле";
}

function rangeMessage(field, edge) {
  if (field.name === "price") {
    return `Вкажіть ціну від ${field.min} до ${field.max} грн`;
  }
  if (field.type === "date") {
    return edge === "min"
      ? `Дата має бути не раніше ${field.min}`
      : `Дата має бути не пізніше ${field.max}`;
  }
  return edge === "min"
    ? `Значення має бути не менше ${field.min}`
    : `Значення має бути не більше ${field.max}`;
}

export function getNativeMessage(field) {
  const failed = Object.keys(MESSAGES).find((key) => field.validity[key]);
  return failed === undefined ? "" : MESSAGES[failed](field);
}
