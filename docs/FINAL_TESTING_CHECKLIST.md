# PropSpace Final Testing Checklist

This checklist confirms that the PropSpace Property Listing App was tested according to the project requirements.

## 1. Project Startup Testing

### Backend Server
Where to run: backend terminal

Command:
cd backend
npm run dev

Expected result:
MongoDB Connected: 127.0.0.1
PropSpace backend server running on port 5000

### Frontend Server
Where to run: frontend terminal

Command:
cd frontend
npm run dev

Expected result:
Local: http://localhost:5173/

## 2. Database Seed Testing

Where to run: backend terminal

Command:
cd backend
npm run seed

Expected result:
Seed data inserted successfully.
Demo login details:
Email: demoagent@propspace.com
Password: password123

Purpose:
Creates demo user and sample property listings for testing.

## 3. Backend API Testing

### Health Check
Where to test: Browser or Postman

Request:
GET http://localhost:5000/api/health

Expected result:
200 OK
success: true
PropSpace backend API is running successfully

### Register User
Where to test: Postman

Request:
POST http://localhost:5000/api/auth/register

Body:
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}

Expected result:
201 Created
User registered successfully
JWT token returned

### Login User
Where to test: Postman

Request:
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "testuser@example.com",
  "password": "password123"
}

Expected result:
200 OK
User logged in successfully
JWT token returned

### Get Logged-in User
Where to test: Postman

Request:
GET http://localhost:5000/api/auth/me

Authorization:
Bearer Token

Expected result:
200 OK
Logged-in user details returned

## 4. Property API Testing

### Public Property Feed
Where to test: Browser or Postman

Request:
GET http://localhost:5000/api/properties

Expected result:
200 OK
success: true
Property list returned

### City Filter
Request:
GET http://localhost:5000/api/properties?city=Douala

Expected result:
Only Douala properties are returned

### Price Filter
Request:
GET http://localhost:5000/api/properties?minPrice=100000&maxPrice=300000

Expected result:
Only properties within the selected price range are returned

### Create Property
Where to test: Postman or frontend Add Property page

Request:
POST http://localhost:5000/api/properties

Authorization:
Bearer Token

Expected result:
201 Created
Property created successfully

### My Listings
Request:
GET http://localhost:5000/api/properties/my/listings

Authorization:
Bearer Token

Expected result:
Only properties created by the logged-in user are returned

### Update Property
Request:
PUT http://localhost:5000/api/properties/PROPERTY_ID

Authorization:
Bearer Token

Expected result:
200 OK
Property updated successfully

### Delete Property
Request:
DELETE http://localhost:5000/api/properties/PROPERTY_ID

Authorization:
Bearer Token

Expected result:
200 OK
Property deleted successfully

### Unauthorized Property Creation
Request:
POST http://localhost:5000/api/properties

Authorization:
No Auth

Expected result:
401 Unauthorized
Not authorized, no token provided

## 5. Frontend Page Testing

### Home Page
Where to test:
http://localhost:5173/

Expected result:
Professional homepage displays
Public properties display
Search filters display
Footer displays

### Register Page
Where to test:
http://localhost:5173/register

Expected result:
User can register successfully
User is redirected to dashboard
Navbar changes after login

### Login Page
Where to test:
http://localhost:5173/login

Demo login:
Email: demoagent@propspace.com
Password: password123

Expected result:
User logs in successfully
User is redirected to dashboard

### Dashboard Page
Where to test:
http://localhost:5173/dashboard

Expected result:
Welcome section displays
My Listings count displays
Public Listings count displays
Recent Listings display
Quick Actions display

### My Listings Page
Where to test:
http://localhost:5173/my-listings

Expected result:
Only logged-in user's listings display
Edit and Delete buttons display

### Add Property Page
Where to test:
http://localhost:5173/add-property

Expected result:
User can create a new property
Image URL preview works
New property appears on My Listings
New property appears on Home page

### Edit Property Page
Where to test:
Click Edit from My Listings

Expected result:
Existing property details load
User can update property
Updated property appears on My Listings and Home page

### Profile Page
Where to test:
http://localhost:5173/profile

Expected result:
User can update profile name
User can update phone number
User can update avatar URL
User can change password

### 404 Page
Where to test:
http://localhost:5173/random-page

Expected result:
404 Page Not Found displays
Back to Home button works

## 6. Route Guard Testing

Test these pages after logging out:
/dashboard
/my-listings
/add-property
/edit-property/:id
/profile

Expected result:
Unauthenticated user is redirected to /login

## 7. Form Validation Testing

Expected validation behavior:
Empty register fields show error
Empty login fields show error
Password less than 6 characters shows error
Property form requires title, description, price, city, country, and property type
Negative price is rejected

## 8. Loading, Empty, and Error State Testing

Expected behavior:
Loading message appears while data is fetching
Empty message appears when no listings exist
Error message appears if backend is stopped
Frontend does not crash

## 9. UI and Responsiveness Testing

Expected behavior:
Navbar works on desktop
Navbar works on mobile
Property cards use professional images
Footer displays correctly
Color combination is consistent
Layout looks professional

## 10. Final Build Testing

### Frontend Build
Where to run: frontend terminal

Command:
cd frontend
npm run build

Expected result:
Build completed successfully
No serious errors

### GitHub Status
Where to run: project root terminal

Command:
git status

Expected result:
nothing to commit, working tree clean
