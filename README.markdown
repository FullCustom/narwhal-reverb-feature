# Narwhal Industries Reverb Listings

Welcome to the Narwhal Industries Reverb Listings project! This repository contains a web application that populates a website with gear listings from Reverb, featuring Narwhal Industries products. Your purchases via our affiliate links help fuel our innovation!

## Overview

This site integrates with the Reverb API to display new and used Narwhal Industries pedals from trusted sellers. Built on October 06, 2025, it works seamlessly in Visual Studio and uses a proxy to securely fetch and render listings. The application is designed to run locally using PHP's built-in server and includes responsive styling for an optimal user experience.

## Features

- Fetches Narwhal Industries gear listings from the Reverb API.
- Displays listings in a grid layout with images, prices, and shop details.
- Includes affiliate links to support Narwhal Industries.
- Responsive design that adapts to various screen sizes.
- Secure token handling using a `.env` file.

## Prerequisites

- PHP (with cURL extension enabled)
- Web browser
- Visual Studio or any code editor

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/narwhal-reverb-listings.git
   cd narwhal-reverb-listings
   ```

2. Ensure the `.env` file is present with your Reverb API token:
   - Example `.env`:
     ```
     REVERB_TOKEN=your_api_token_here
     ```
   - Keep `.env` out of version control (add to `.gitignore`).

3. Start the PHP built-in server:
   ```
   php -S localhost:8000
   ```

4. Open your browser and visit `http://localhost:8000/reverb.html`.

## Usage

- The site loads automatically and displays a grid of Narwhal Industries listings.
- Click "Buy Now on Reverb" to visit the product page via an affiliate link.
- If no listings are found, a fallback link to browse overdrive pedals is provided.

## File Tree

```
narwhal-reverb-listings/
│
├── reverb.html          # Main HTML template
├── reverb.css           # Styles for the listing grid and responsive design
├── reverb.js            # JavaScript to fetch and render Reverb listings
├── reverb-proxy.php     # PHP proxy to securely call the Reverb API
├── cacert.pem           # CA certificate bundle for SSL verification
├── .env                 # Environment file for storing the Reverb API token
└── php-error.log        # Log file for PHP errors (generated during runtime)
```

## Development Notes

- The proxy uses `curl` with SSL verification enabled via `cacert.pem`.
- Error logging is configured in `php-error.log` for debugging.
- Test locally with the PHP server; adjust CORS settings for production.

## Contributing

Feel free to submit issues or pull requests. Ensure any changes maintain security (e.g., token handling) and compatibility with the existing setup.

## License

[Add your license here, e.g., MIT License]

## Contact

For support or inquiries, reach out at [your-email@example.com].

*Last updated: October 07, 2025, 10:19 AM EDT*