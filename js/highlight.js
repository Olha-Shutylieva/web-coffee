import { normalize } from "./collection.js";

export function createHighlightedText(text, query) {
  const needle = normalize(query);
  const index = text.toLocaleLowerCase("uk-UA").indexOf(needle);
  if (needle === "" || index === -1) {
    return [text];
  }
  const mark = document.createElement("mark");
  mark.textContent = text.slice(index, index + needle.length);
  return [text.slice(0, index), mark, text.slice(index + needle.length)];
}
