# URL Shortener Microservice

A URL shortener microservice built for the Affordmed backend assignment. This service provides functionality to create short URLs, redirect to original URLs, and retrieve analytics for each shortened link. All significant events are logged through custom logging middleware.

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm package manager

### Installation and Setup

1. Install the required dependencies:

```bash
npm install
```

2. Start the server:

```bash
node app.js
```

3. The server will be running at: `http://localhost:3000`

## API Documentation

### Create Short URL

**Endpoint:** `POST /shorturls`

**Request Body:**

```json
{
  "url": "https://instagram.com/cristiano",
  "validity": 30,
  "shortcode": "mycode123"
}
```

**Parameters:**

- `url` (required): The original URL to be shortened
- `validity` (optional): Expiration time in minutes (default: 30 minutes)
- `shortcode` (optional): Custom short code for the URL

**Response:**

```json
{
  "shortLink": "http://localhost:3000/mycode123",
  "expiry": "2025-07-14T11:25:00.000Z"
}
```

### Redirect to Original URL

**Endpoint:** `GET /:shortcode`

**Example:** `GET http://localhost:3000/mycode123`

This endpoint redirects users to the original URL if the short code is valid and has not expired.

### Get URL Statistics

**Endpoint:** `GET /shorturls/:shortcode`

**Example:** `GET http://localhost:3000/shorturls/mycode123`

**Response:**

```json
{
  "originalUrl": "https://instagram.com/cristiano",
  "createdAt": "2025-07-14T10:55:00.000Z",
  "expiry": "2025-07-14T11:25:00.000Z",
  "totalClicks": 1,
  "clicks": [
    {
      "timestamp": "2025-07-14T11:00:00.000Z",
      "referrer": "",
      "location": "::1"
    }
  ]
}
```

## Features

- Create shortened URLs with custom or auto-generated codes
- Set expiration times for URLs
- Track click analytics including timestamps, referrers, and locations
- Comprehensive logging middleware for all significant events
- URL validation and error handling

## Testing

Screenshots demonstrating the API functionality are available in the `screenshots/` directory:

- `create-shorturl-success.png`: Shows successful URL creation
- `redirect-success.png`: Demonstrates successful redirection
- `get-stats-success.png`: Displays statistics retrieval

## Project Structure

This microservice follows best practices for Node.js applications and includes proper error handling, logging, and analytics tracking as specified in the assignment requirements.
