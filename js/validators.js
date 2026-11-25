import { normalize } from "./collection.js";

const DRINK_CATEGORIES = ["coffee", "tea", "seasonal"];

function collapsed(value) {
  return normalize(value).replace(/\s+/g, " ");
}

export function trimmedLength(min, max) {
  return function validateTrimmedLength(value) {
    const trimmed = value.trim();
    if (trimmed === "" && value !== "") {
      return "Введіть текст, а не лише пробіли";
    }
    if (trimmed.length < min) {
      return `Введіть щонайменше ${min} символів`;
    }
    if (trimmed.length > max) {
      return `Введіть не більше ${max} символів`;
    }
    return "";
  };
}

export function optionalTrimmedLength(min, max) {
  return function validateOptionalTrimmedLength(value) {
    if (value.trim() === "") {
      return value === "" ? "" : "Введіть текст, а не лише пробіли";
    }
    return trimmedLength(min, max)(value);
  };
}

export function validateTitleUnique(value, context) {
  const needle = collapsed(value);
  if (needle === "") {
    return "";
  }
  const duplicate = context.items.some(
    (item) => item.id !== context.currentId && collapsed(item.title) === needle
  );
  return duplicate ? "Позиція з такою назвою вже є в каталозі" : "";
}

export function validateNotInFuture(value, context) {
  return value !== "" && value > context.today
    ? "Дата додавання не може бути в майбутньому"
    : "";
}

export function validateVolumeForCategory(value, context) {
  const volume = value.trim();
  if (DRINK_CATEGORIES.includes(context.category) && volume === "") {
    return "Вкажіть об'єм для кави, чаю або сезонного напою";
  }
  if (context.category === "dessert" && volume !== "") {
    return "Для десерту об'єм має бути порожнім";
  }
  return "";
}

export function validateRatingChosen(value) {
  return value === "" ? "Оберіть оцінку" : "";
}

export const itemFieldRules = {
  title: [trimmedLength(2, 80), validateTitleUnique],
  description: [trimmedLength(1, 300)],
  addedAt: [validateNotInFuture],
  volume: [validateVolumeForCategory]
};

export const reviewFieldRules = {
  authorName: [optionalTrimmedLength(2, 80)],
  comment: [optionalTrimmedLength(10, 500)],
  rating: [validateRatingChosen]
};
