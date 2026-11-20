# 🌐 Social Media Web Application

A responsive social media web application built using HTML, CSS, and Vanilla JavaScript. The application allows users to create accounts, manage posts, interact with other users, and explore content through a dynamic feed.

## 🚀 Overview

This project was developed as part of a practical web development course. It focuses on building a fully functional frontend application and integrating it with a pre-existing backend API.

The application provides user authentication, post management, comments, user profiles, image uploads, and infinite scrolling for browsing posts.

## ✨ Features

### 🔐 User Authentication

- User registration and login.
- Secure authenticated requests using an access token.
- User logout functionality.

### 📝 Post Management

- View posts in a dynamic feed.
- Create new posts.
- Edit existing posts.
- Delete posts.
- Upload images with posts.
- Users can edit or delete only their own posts.

### 💬 Comments

- Add comments to posts.
- Display comments associated with posts.
- View the total number of comments made by each user.

### 👤 User Profiles

- View user profile information.
- Display the user's posts.
- Show the total number of posts created by the user.
- Show the total number of comments made by the user.

### ⚡ Pagination & Infinite Scrolling

- Posts are retrieved in separate batches.
- Automatically load additional posts as the user approaches the end of the currently displayed feed.
- Provides a smoother browsing experience without loading all posts at once.

### 📱 Responsive Design

- Responsive interface for desktop and mobile devices.
- Multiple application pages.
- User-friendly and interactive interface.

## 🛠️ Technologies Used

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,vite&perline=4" alt="HTML, CSS, JavaScript and Vite" />
</p>

- **HTML5:** Structuring application pages.
- **CSS3:** Styling and responsive layouts.
- **JavaScript (Vanilla JS):** Implementing application functionality and dynamic interactions.
- **Vite:** Development server and build tool.
- **Axios:** Handling HTTP requests and communicating with the backend API.

## 🔗 API Integration

The application integrates with a pre-built backend API using Axios.

The following HTTP methods were used:

- **GET:** Retrieve posts, user information, and comments.
- **POST:** Create new posts, comments, and user accounts.
- **PUT:** Update existing posts.
- **DELETE:** Delete posts.

The application also uses token-based authentication to authorize requests after user login.

## 🏗️ Backend Information

The backend and API were provided by the course instructor.

My contribution focused on developing the frontend application, implementing its functionality, handling API requests, and integrating the user interface with the provided backend services.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OMAR-SATTOUT/social-media-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd social-media-web-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite in your browser.

**Note:** The application requires the provided backend API to be available. Make sure the API base URL is configured correctly in the project before running the application.

## 🏗️ Production Build

To create a production build, run:

```bash
npm run build
```

Vite generates the production files inside the `dist` directory.

## 👨‍💻 Author

**Omar Sattout**

Software Engineering | Aspiring Full-Stack Web Developer

- GitHub: [Omar Sattout](https://github.com/OMAR-SATTOUT)
- Email: [omar.sattout.ite@gmail.com](mailto:omar.sattout.ite@gmail.com)

---

⭐ If you find this project interesting, feel free to explore the repository!
