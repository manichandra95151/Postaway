# Postaway

Postaway is a social media platform API built using Express.js, Node.js, MongoDB, designed to enable users to perform various social media activities such as user management, posts creation, commenting, liking, friend requests, and enhanced security features, OTP based password reset and more.

Features
User Management: Register and authenticate users.
Post Creation: Users can create posts with text and media.
Commenting: Users can comment on posts.
Liking: Users can like posts.
File Upload: Supports file upload for user avatars and post images.
Error Handling: Graceful handling of errors with appropriate HTTP status codes and error messages.
Authentication: Implements JSON Web Tokens (JWT) for user authentication.
Security: Ensures security measures like data validation and input sanitization.
Scalable Architecture: Uses Express.js for a scalable and modular architecture.
Installation
Clone the repository:

git clone https://github.com/bharatlal124/Postaway-II-API-project.git
cd postaway-api
Install dependencies: npm install

Set up environment variables:

Create a .env file in the root directory with the following variables:
DB_URL=Add database link here
JWT_SECRET_KEY=your = _jwt_secret_key_here
Start the server: node index.js

API Endpoints
User Routes
POST /api/user/register: Register a new user account.
POST /api/user/login: Log in as a user.
POST /api/user/upload-avatar: Upload user avatar.
Post Routes
POST /api/posts: Create a new post.
POST /api/posts/upload-image: Upload post image.
GET /api/posts: Retrieve all posts.
GET /api/posts/:id: Retrieve a specific post by ID.
PUT /api/posts/:id: Update a specific post by ID.
DELETE /api/posts/:id: Delete a specific post by ID.
Comment Routes
POST /api/comments: Create a new comment.
GET /api/comments: Retrieve all comments for a specific post.
PUT /api/comments/:id: Update a specific comment by ID.
DELETE /api/comments/:id: Delete a specific comment by ID.
Like Routes
POST /api/likes: Add a like to a post.
DELETE /api/likes/:id: Remove a like from a post.
GET /api/likes/:postId: Retrieve all likes for a specific post.
Technologies Used
Express.js
Mongoose (for MongoDB object modeling)
JWT (JSON Web Tokens) for authentication
Multer (for handling file uploads)
Bcrypt (for password hashing)
Body-parser (for parsing request bodies)
Axios (for HTTP requests)
ESLint (for code linting)
Winston (for logging)
Helmet (for securing HTTP headers)
Dotenv (for environment variables)
Nodemailer (For sending emails)
Node.js Crypto Module (For generating and verifying OTPs securely)
