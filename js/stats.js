import { formatCategory, formatPrice } from "./format.js";

const DASH = "—";

export function renderStats(list, stats, byCategory) {
  const rows = [
    statRow("Кількість", String(stats.count)),
    statRow("Середня ціна", stats.average === null ? DASH : formatPrice(stats.average)),
    statRow("Найнижча ціна", stats.min === null ? DASH : formatPrice(stats.min)),
    statRow("Найвища ціна", stats.max === null ? DASH : formatPrice(stats.max)),
    statRow("У наявності", String(stats.inStock)),
    ...Object.entries(byCategory).map(([category, count]) => statRow(formatCategory(category), String(count)))
  ];
  list.replaceChildren(...rows);
}

function statRow(term, value) {
  const group = document.createElement("div");
  const name = document.createElement("dt");
  name.textContent = term;
  const amount = document.createElement("dd");
  amount.textContent = value;
  group.append(name, amount);
  return group;
}
