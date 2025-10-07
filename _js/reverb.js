 async function loadReverbListings() {
      const apiUrl = 'http://localhost:8000/reverb-proxy.php'; // PHP built-in server endpoint
      const awinMid = 67144;  // Reverb merchant ID
      const awinAffId = 2579497;  // Your publisher ID
      const awinBase = `https://www.awin1.com/cread.php?awinmid=${encodeURIComponent(awinMid)}&awinaffid=${encodeURIComponent(awinAffId)}&ued=`;
      const grid = document.getElementById('reverb-listings-grid');

      try {
        console.log('Attempting proxy fetch...', { url: apiUrl });
        const response = await fetch(apiUrl);

        console.log(`Proxy Response Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Proxy error details: Status ${response.status}, Body: ${errorText.substring(0, 200)}...`);
          throw new Error(`Proxy error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Proxy Data received:', { total: data.total || data._embedded?.listings?.length, listingsCount: data.listings?.length || data._embedded?.listings?.length });

        // Handle HAL-embedded response format
        const listings = data.listings || (data._embedded && data._embedded.listings) || [];
        if (listings.length > 0) {
          const renderedHtml = listings.map(listing => {
            const affLink = `${awinBase}${encodeURIComponent(`https://reverb.com/item/${listing.id}`)}`;
            console.log('Listing details:', { id: listing.id, title: listing.title, photos: listing.photos || 'No photos available' });
            console.log('Generated Awin link:', affLink);
            // Try all possible image fields before fallbacks
            const imageUrl = listing.photos?.[0]?.medium_url || 
                            listing.photos?.[0]?.full_url || 
                            listing.photos?.[0]?.thumbnail_url || 
                            listing.photos?.[0]?.large_url || 
                            listing.photos?.[0]?.supersize_url || 
                            '/_img/narwhal.jpg' || // Local fallback
                            'https://placehold.co/200x150?text=Narwhal+Pedal'; // Temporary fallback
            return `
              <div class="reverb-card">
                <img src="${imageUrl}" alt="${listing.title}" loading="lazy">
                <h3>${listing.title}</h3>
                <p class="price">$${listing.price?.amount || 'Contact Seller'}</p>
                <p class="shop">From: ${listing.shop?.name || 'Reverb Seller'}</p>
                <a href="${affLink}" rel="sponsored noopener" target="_blank" class="buy-btn">Buy Now on Reverb</a>
              </div>
            `;
          }).join('');
          grid.innerHTML = renderedHtml;
          console.log('Listings rendered successfully');
        } else {
          console.log('No listings found');
          grid.innerHTML = '<p>No current Narwhal Industries listings available—<a href="https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2579497&ued=https%3A%2F%2Freverb.com%2Fmarketplace%3Fquery%3Doverdrive%26product_type%3Deffects-and-pedals%26price_max%3D100%26price_min%3D50">explore overdrive pedals</a> to find similar gear!</p>';
        }
      } catch (error) {
        console.error('Reverb API fetch error:', error);
        grid.innerHTML = `<p>Couldn't load listings (check console/proxy). <a href="https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2579497&ued=https%3A%2F%2Freverb.com%2Fmarketplace%3Fquery%3Doverdrive%26product_type%3Deffects-and-pedals%26price_max%3D100%26price_min%3D50">Browse overdrive pedals on Reverb</a> to find similar gear!</p>`;
      }
    }

    // Load when page is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadReverbListings);
    } else {
      loadReverbListings();
    }