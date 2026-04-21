# WTWR (What to Wear?)

This project is a weather-based clothing recommendation app built with React.
It displays weather data and suggests clothing items appropriate for the temperature.

## Features

- Real-time weather data
- Clothing recommendations
- Add/remove clothing items
- Responsive design

## Technologies Used

- React
- JavaScript
- CSS
- OpenWeather API

## Backend Repository

The backend API for this project can be found here:
[Backend Repository](https://github.com/melissapaquette1206-hash/se_project_express.git)

### 1. LoginModal.jsx

- Purpose: Allows existing users to sign in
- What it should do: Display a form with email/password fields, handle form submission, call your authorize function from auth.js
- Why critical: Without this, users can't log into your app!

### 2. RegisterModal.jsx

- Purpose: Allows new users to create accounts
- What it should do: Display a form with name/email/password fields, handle form submission, call your register function from auth.js
- Why critical: Without this, new users can't sign up!

### 3. EditProfileModal.jsx

- Purpose: Allows logged-in users to update their profile information
- What it should do: Display a form pre-filled with current user data, handle updates, call your updateUser API function
- Why critical: Users can't edit their profiles as required by the project brief

### 4. ProtectedRoute Component

- Purpose: Prevents unauthorized users from accessing certain pages (like /profile)
- What it should do: Check if user is logged in, redirect to home page if not authenticated
- Why critical: Without this, anyone can access the profile page, violating security requirements
