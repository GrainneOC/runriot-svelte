# RunRiot Svelte - Fullstack Running App

A simple running app built with Svelte that shows how to make a full website with charts and maps.

## What Was Implemented

### Fullstack App
- **Frontend**: Svelte website
- **Backend**: SvelteKit API routes
- **Database**: MongoDB connection
- **Authentication**: JWT token system

### Charts
- Running progress charts using Frappe Charts
- Line and bar charts showing distance over time
- Data pulled from running results in database

### Maps
- Interactive maps using Leaflet
- Shows running locations as map markers
- Click markers to see run details

## Technologies Used

- **Frontend**: Svelte 5, SvelteKit
- **Charts**: Frappe Charts, svelte-frappe-charts
- **Maps**: Leaflet
- **Backend**: SvelteKit API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Simple Flow

1. User logs in → gets JWT token
2. Frontend calls backend APIs with token
3. Backend validates token and queries MongoDB
4. Data returns to frontend
5. Charts and maps display the data

That's the complete stack - frontend, backend, database, charts, and maps all working together.
