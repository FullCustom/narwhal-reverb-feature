# Narwhal Industries Reverb Affiliate Listings Page

## Overview
This repository contains a standalone HTML page (`reverb.html`) that displays live Narwhal Industries pedal listings from Reverb.com, integrated with Awin affiliate tracking (publisher ID: 2579497, merchant ID: 2956) for 5% commission on sales (30-day cookie). The page uses Reverb's public search API to fetch up to 6 recent listings for "narwhal industries" and presents them as responsive product cards with images, prices, and "Buy Now" buttons. If no listings are available, it falls back to a tracked link for overdrive pedals ($50-$100 range). The feature supports [Reverb Gives](https://reverb.com/page/reverb-gives) messaging to highlight social impact.

This page is built for testing and debugging in Visual Studio before integration into [narwhalindustries.net](https://narwhalindustries.net). It’s designed to be clean, modern, and compatible with the site’s aesthetic and existing sponsors (Libro.fm, Etsy, Booking.com, HP, NordVPN, Under Armour).

## Repository Structure
```
narwhal-reverb-feature/
├── reverb.html  # Standalone HTML page with API integration and styling
├── README.md    # This file
└── .gitignore   # Ignores Visual Studio build files, e.g., .vs/, node_modules/
```

## Features
- **Dynamic Listings**: Fetches live Narwhal Industries pedals (e.g., Kraken Overdrive ~$75-$100, Pineapple Fuzz ~$150) via Reverb’s API (`https://api.reverb.com/api/listings/search?query=narwhal%20industries`).
- **Awin Tracking**: All links include Awin parameters (`awinmid=2956&awinaffid=2579497`) for click/sale tracking.
- **Responsive Design**: Grid layout with cards (image, title, price, seller, "Buy Now" button) that adapts to mobile/desktop.
- **Fallback**: If no listings, links to overdrive pedals (`https://reverb.com/marketplace?query=overdrive&product_type=effects-and-pedals&price_max=100&price_min=50`).
- **SEO/Accessibility**: Uses `loading="lazy"` for images and descriptive `alt` tags.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd narwhal-reverb-feature
   ```

2. **Open in Visual Studio**:
   - Create a new project (`File > New > Project > Empty Project`) or open the folder directly.
   - Ensure `reverb.html` is in the root.

3. **Run Locally**:
   - Use Visual Studio’s Live Server: Right-click `reverb.html` > “Open with Live Server”.
   - Or open directly in Chrome/Firefox by dragging `reverb.html` into the browser.

4. **Dependencies**:
   - No external libraries required (uses vanilla JS and inline CSS).
   - Reverb API is public for basic queries; no API key needed unless rate limits apply.

## Testing
1. **Verify Display**:
   - Page loads with a “Loading Narwhal Industries gear...” message.
   - If listings exist, expect cards with titles (e.g., “Narwhal Industries Kraken Overdrive”), prices, seller names, and images.
   - If no listings, see: “No current Narwhal Industries listings available—explore overdrive pedals in the meantime!”

2. **Check Affiliate Tracking**:
   - Click “Buy Now” or “Browse Overdrive Pedals” links.
   - URLs should include `awinmid=2956&awinaffid=2579497`.
   - Monitor Awin dashboard (Reports > Clicks) for click data within 24 hours.

3. **Debugging**:
   - Open browser console (F12 > Console):
     - **No Listings**: If “No current listings” shows, check `https://reverb.com/marketplace?query=narwhal%20industries` manually. Add listings via Reverb’s seller dashboard if you control the shop.
     - **API Errors**:
       - `429 Too Many Requests`: Rate limit hit. Email `affiliates@reverb.com` for an API key.
       - `401 Unauthorized`: Add key to JS fetch: `headers: { 'Authorization': 'Token YOUR_KEY' }`.
       - `CORS`: Prepend `https://cors-anywhere.herokuapp.com/` to `apiUrl` or contact for proxy setup.
     - **Image Fails**: Placeholder (`via.placeholder.com`) shows if images are missing. Check `listing.photos[0].medium_url`.

4. **Log Issues**:
   - Screenshot console errors or note exact messages.
   - Share with collaborators or Grok for fixes (e.g., retry logic, fallback tweaks).

## Integration into narwhalindustries.net
Once tested:
1. **Copy Code**:
   - Extract `<section id="reverb-narwhal">` and `<script>` from `reverb.html`.
   - Paste into target page (e.g., `products.html` or homepage).

2. **Move CSS**:
   - Copy `<style>` rules to your site’s stylesheet (e.g., `styles.css`).
   - Adjust colors/fonts to match narwhalindustries.net’s theme (e.g., blue palette).

3. **Git Merge**:
   - If main site is in a repo, merge this feature:
     ```bash
     git checkout main
     git merge origin/main
     ```
   - Resolve conflicts if CSS/JS overlaps.

4. **Re-test**:
   - Confirm listings load and tracking works on the live site.
   - Check Awin for click/sale data.

## Adding Listings
- If you control Narwhal’s Reverb shop, log into Reverb’s seller dashboard.
- Add pedals (e.g., Kraken Overdrive at $75-$100) with prices, photos, and descriptions.
- Listings appear in the feed instantly (API refreshes live).

## Customization
- **More Items**: Edit `per_page=6` in `apiUrl` to fetch more listings (e.g., 12).
- **Styling**: Tweak CSS (e.g., `img { height: 200px }` for larger images, or change `.buy-btn` colors).
- **Fallback**: Swap fallback link in `<a id="view-all-link">` for a different Reverb query.
- Share site URL or CSS for tailored adjustments.

## Known Issues
- **Sparse Listings**: If no Narwhal pedals are listed, the fallback link drives traffic to overdrive pedals.
- **Rate Limits**: Rare for