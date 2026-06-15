# PropSpace Property Listing App

PropSpace is a full-stack property listing web application built for the Programming in JavaScript final project. The system allows users to register, login, manage their profile, create property listings, view public property listings, filter properties by city and price, and manage their own listings securely.

## Project Description

This project implements a property listing platform where authenticated users can create, update, and delete their own property listings. Public users can browse available properties through a public feed. The system uses JWT authentication, protected routes, MongoDB database storage, and a React frontend.

## Main Features

- User registration and login
- JWT-based authentication
- Protected dashboard routes
- Public property feed
- Search/filter by city and price range
- Add property listing
- Edit property listing
- Delete own property listing
- Private My Listings page
- Profile update
- Password change
- Professional responsive user interface
- Loading, empty, and error states
- Database seed script for demo data

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- cors

## Project Structure

```text
propspace-property-listing-app
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── seed
│   │   ├── services
│   │   ├── utils
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   ├── utils
│   │   └── main.jsx
│   └── package.json
│
└── README.md