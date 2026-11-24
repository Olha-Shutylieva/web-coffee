import { findItem, items } from "./data.js";
import { renderDetails, readItemId } from "./details.js";
import { requireElement } from "./dom.js";

const container = requireElement(document, "#item");
const crumb = requireElement(document, "#crumb-current");
const review = requireElement(document, "#review");

renderDetails(container, crumb, review, findItem(items, readItemId(window.location.search)));
