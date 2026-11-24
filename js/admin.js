import { calculateStats, countByCategory } from "./collection.js";
import { items } from "./data.js";
import { requireElement } from "./dom.js";
import { renderStats } from "./stats.js";

const stats = requireElement(document, ".stats");

renderStats(stats, calculateStats(items), countByCategory(items));
