function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export function normalizeText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function numberOrNull(value) {
  return value.trim() === "" ? null : Number(value);
}

function chosenFileName(formData) {
  const file = formData.get("image");
  if (typeof File === "function" && file instanceof File && file.name !== "" && file.size > 0) {
    return file.name;
  }
  return null;
}

export function formDataToItem(formData, context) {
  return {
    id: context.id,
    title: normalizeText(readText(formData, "title")),
    sku: normalizeText(readText(formData, "sku")),
    image: chosenFileName(formData) ?? context.image ?? null,
    imageAlt: context.imageAlt ?? "Фото позиції меню",
    category: readText(formData, "category"),
    price: numberOrNull(readText(formData, "price")),
    volume: numberOrNull(readText(formData, "volume")),
    addedAt: readText(formData, "addedAt"),
    description: normalizeText(readText(formData, "description")),
    inStock: formData.has("inStock"),
    sizes: context.sizes ?? []
  };
}

const VALUE_FIELDS = ["title", "sku", "category", "price", "volume", "addedAt", "description"];

export function fillForm(form, item) {
  for (const name of VALUE_FIELDS) {
    const field = form.elements[name];
    if (!field) {
      continue;
    }
    const value = item[name];
    field.value = value === null || value === undefined ? "" : String(value);
  }
  if (form.elements.inStock) {
    form.elements.inStock.checked = item.inStock === true;
  }
  if (form.elements.id) {
    form.elements.id.value = item.id;
  }
}

export function todayIso(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
