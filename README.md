# black-friday-deal-finder-01

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/kanzaa28/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/kanzaa28/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

# Dealhound — Black Friday 2026 Deal Finder

A static deal-finder site (no build step, no network requests at runtime)
listing **38 real Black Friday / Cyber Monday 2026 deals**, checked on
27 November 2026 (WITA) against the named store or a deals roundup that
names the store.

## What it is

- 38 deals across Tech (14), TVs (7), Gaming & Toys (6), Home & Kitchen (8)
  and Beauty (3), at Amazon, Walmart, Best Buy, Target, Samsung, Sephora
  and Oura.
- Every deal shows product, store, a link to the product at that store
  (store search for the exact product name), sale price, usual price,
  discount % (computed from the two prices — all 38 verified
  arithmetically), check time and the source where the price was read.
- Every deal carries an honest verdict with evidence: **20 NEW LOW,
  14 STRONG PRICE, 3 ROUTINE SALE, 1 INFLATED** (an RTX 5060 Ti listed
  at $799 against a $429 MSRP — flagged as not a deal at all).
- Search + filters by category, store and minimum discount that work;
  sort by best deal, biggest discount, lowest price or biggest saving.
  Five products are compared across two stores in a compare table and
  on their cards (AirPods Pro 3, MacBook Air M5, Dyson V9, Shark
  Navigator, Dyson Airwrap).
- Total savings across the list: $8,409.83 on the 37 genuine deals; average discount 37%.
- Original design (“Dealhound”, navy + amber); desktop + phone layouts;
  first load is 4 small files (index.html, style.css, data.js, main.js,
  views.js), no framework, no images, no web fonts.

## How it was checked

Prices were read on 27 Nov 2026 from roundups that name the store
(TradingView/Benzinga, CNN Underscored, MacRumors, BeeBulletin,
Game Gavel, PopSci, BuyVia, Passion for Savings, Yahoo Shopping,
Top 10 Best, LiveBriefs, ComicBook, Medium). Each card links its source.
Store links point at the store’s own search for the exact product name.
Prices can change or sell out — the site says so in its footer.

## Run it

Serve `app/` with any static server (`node serve.ts` from the kit, or
`python3 -m http.server` inside `app/`), then open
http://localhost:8080. Filter states are shareable links
(`?q=&cat=&store=&min=&sort=`).

## Hand-in

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` via the vendored `vendor/makefun-frontend.ts`.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
