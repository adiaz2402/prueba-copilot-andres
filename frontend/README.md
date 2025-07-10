# Angular Frontend Setup

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Angular CLI (`npm install -g @angular/cli`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   ng serve
   ```
3. The app will be available at `http://localhost:4200/`.

## Project Structure
- `src/app/services/product.service.ts`: Service to consume the backend API.
- `src/app/components/product-list/`: Component to list and add products.

## Notes
- The API endpoint is expected to be available at `http://localhost:5000/api/products` by default.
