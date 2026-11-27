// views.js — renders deal cards, the stats bar and the compare table.
// One job: turn deal objects into HTML strings. No state lives here.

import { CHECKED, SIGNAL_RANK } from "./data.js";

export function money(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

export function signalClass(signal) {
  return "sig-" + signal.toLowerCase().replace(/ /g, "-");
}

export function dealCard(d) {
  const save = d.usual - d.sale;
  const pctLabel = d.pct >= 0 ? "-" + d.pct + "%" : "+" + Math.abs(d.pct) + "% over MSRP";
  const saveLabel = save >= 0 ? "Save " + money(save) : "Costs " + money(-save) + " over MSRP";
  return (
    '<article class="card ' + signalClass(d.signal) + '">' +
    '<div class="card-top"><span class="store">' + d.store + '</span>' +
    '<span class="cat">' + d.cat + '</span></div>' +
    '<h3>' + d.name + '</h3>' +
    '<div class="prices"><span class="sale">' + money(d.sale) + '</span>' +
    '<span class="usual">' + money(d.usual) + '</span>' +
    '<span class="pct">' + pctLabel + '</span></div>' +
    '<p class="save-line">' + saveLabel + '</p>' +
    '<p class="signal"><span class="pill">' + d.signal + '</span> ' + d.evidence + '</p>' +
    (d.alsoAt ? '<p class="also">' + d.alsoAt + '</p>' : "") +
    '<p class="meta">Checked ' + CHECKED + ' · Source: <a href="' + d.sourceUrl + '" target="_blank" rel="noopener">' + d.source + '</a></p>' +
    '<a class="cta" href="' + d.link + '" target="_blank" rel="noopener">View at ' + d.store + ' &rarr;</a>' +
    "</article>"
  );
}

export function statsBar(deals) {
  const lows = deals.filter((d) => d.signal === "NEW LOW").length;
  const save = deals.reduce((a, d) => a + Math.max(0, d.usual - d.sale), 0);
  const avg = deals.length
    ? (deals.reduce((a, d) => a + Math.max(0, d.pct), 0) / deals.length).toFixed(0)
    : 0;
  return (
    '<div class="stats">' +
    "<div><b>" + deals.length + "</b><span>deals checked</span></div>" +
    "<div><b>" + lows + "</b><span>new lows</span></div>" +
    "<div><b>" + avg + "%</b><span>average discount</span></div>" +
    "<div><b>" + money(save) + "</b><span>total savings</span></div>" +
    "</div>"
  );
}

export function compareTable(deals) {
  const groups = {};
  for (const d of deals) {
    if (!d.alsoAt) continue;
    (groups[d.name] = groups[d.name] || []).push(d);
  }
  const names = Object.keys(groups);
  if (!names.length) return "";
  let rows = "";
  for (const name of names) {
    for (const d of groups[name]) {
      rows +=
        "<tr><td>" + name + "</td><td>" + d.store + "</td><td>" + money(d.sale) + "</td>" +
        "<td>" + money(d.usual) + "</td><td>" + (d.pct >= 0 ? "-" + d.pct + "%" : "inflated") + "</td>" +
        "<td>" + d.signal + "</td></tr>";
    }
  }
  return (
    '<section id="compare"><h2>Same product, compared across stores</h2>' +
    "<p>Five products in this finder were found at two stores. The cheaper store wins — check the gap before you buy.</p>" +
    '<table><thead><tr><th>Product</th><th>Store</th><th>Sale</th><th>Usual</th><th>Off</th><th>Verdict</th></tr></thead>' +
    "<tbody>" + rows + "</tbody></table></section>"
  );
}

export function sortDeals(deals, sort) {
  const list = deals.slice();
  if (sort === "discount") return list.sort((a, b) => b.pct - a.pct);
  if (sort === "price") return list.sort((a, b) => a.sale - b.sale);
  if (sort === "saving") return list.sort((a, b) => b.usual - b.sale - (a.usual - a.sale));
  return list.sort(
    (a, b) => SIGNAL_RANK[b.signal] - SIGNAL_RANK[a.signal] || b.pct - a.pct,
  );
}
