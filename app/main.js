// main.js — wires the controls to the deal list: search, category,
// store and discount filters, sorting, and the result count.
// URL parameters (?q=&cat=&store=&min=&sort=) preset the controls,
// so a filtered view is a shareable link and a screenshotable state.

import { CATEGORIES, DEALS, STORES } from "./data.js";
import { compareTable, dealCard, sortDeals, statsBar } from "./views.js";

const params = new URLSearchParams(location.search);

const state = {
  q: params.get("q") || "",
  cat: params.get("cat") || "All",
  store: params.get("store") || "All",
  min: Number(params.get("min") || 0),
  sort: params.get("sort") || "best",
};

const searchBox = document.getElementById("search");
const catBox = document.getElementById("category");
const storeBox = document.getElementById("store");
const minBox = document.getElementById("mindisc");
const sortBox = document.getElementById("sort");
const list = document.getElementById("deals");
const count = document.getElementById("count");
const stats = document.getElementById("stats");
const compare = document.getElementById("compare-slot");

function fillSelect(box, values) {
  for (const v of values) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v === "All" ? "All" : v;
    box.appendChild(opt);
  }
}
fillSelect(catBox, CATEGORIES);
fillSelect(storeBox, STORES);

searchBox.value = state.q;
catBox.value = CATEGORIES.includes(state.cat) ? state.cat : "All";
storeBox.value = STORES.includes(state.store) ? state.store : "All";
minBox.value = String([0, 20, 30, 40, 50].includes(state.min) ? state.min : 0);
sortBox.value = ["best", "discount", "price", "saving"].includes(state.sort)
  ? state.sort
  : "best";
state.cat = catBox.value;
state.store = storeBox.value;
state.min = Number(minBox.value);
state.sort = sortBox.value;

stats.innerHTML = statsBar(DEALS);
compare.innerHTML = compareTable(DEALS);

function filtered() {
  const q = state.q.trim().toLowerCase();
  return DEALS.filter((d) => {
    if (state.cat !== "All" && d.cat !== state.cat) return false;
    if (state.store !== "All" && d.store !== state.store) return false;
    if (state.min > 0 && d.pct < state.min) return false;
    if (q && !(d.name + " " + d.store + " " + d.cat).toLowerCase().includes(q)) return false;
    return true;
  });
}

function render() {
  const rows = sortDeals(filtered(), state.sort);
  list.innerHTML = rows.length
    ? rows.map(dealCard).join("")
    : '<p class="empty">No deals match those filters. Clear the search or lower the minimum discount.</p>';
  count.textContent =
    rows.length + " of " + DEALS.length + " deals · sorted by " + sortBox.options[sortBox.selectedIndex].text;
  const url = new URL(location.href);
  url.searchParams.set("q", state.q);
  url.searchParams.set("cat", state.cat);
  url.searchParams.set("store", state.store);
  url.searchParams.set("min", String(state.min));
  url.searchParams.set("sort", state.sort);
  history.replaceState(null, "", url);
}

for (const [box, key] of [
  [searchBox, "q"],
  [catBox, "cat"],
  [storeBox, "store"],
  [minBox, "min"],
  [sortBox, "sort"],
]) {
  box.addEventListener("input", () => {
    state[key] = key === "min" ? Number(box.value) : box.value;
    render();
  });
}

render();
if (params.get("view") === "compare") {
  const section = document.getElementById("compare");
  if (section) section.scrollIntoView();
}
