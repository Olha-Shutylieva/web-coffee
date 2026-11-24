import { handleCatalogClick, updateFavoriteCount } from "./actions.js";
import { renderCatalog } from "./catalog.js";
import { items } from "./data.js";
import { requireElement } from "./dom.js";

const list = requireElement(document, ".catalog__list");
const template = requireElement(document, "#card-template");
const counter = requireElement(document, ".favorites");

renderCatalog(list, items, template, document.baseURI);
updateFavoriteCount(counter, list);

list.addEventListener("click", (event) => {
  handleCatalogClick(event, counter);
});
