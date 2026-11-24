export function requireElement(root, selector) {
  const element = root.querySelector(selector);
  if (element === null) {
    throw new Error(`Не знайдено елемент: ${selector}`);
  }
  return element;
}
