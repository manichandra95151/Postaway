# Postaway

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Key Features](#key-features)
4. [API Endpoints](#api-endpoints)
   - [User Management](#user-management)
   - [Posts](#posts)
   - [Comments](#comments)
   - [Likes](#likes)
   - [Friends](#friends)
   - [OTP](#otp)

## Project Overview
**Postaway** is a robust social media backend REST API designed to enhance user interaction through secure and versatile features. It allows users to post, comment, like, send friend requests, and reset their passwords securely via OTP.

## Technologies Used

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=javascript,mongodb,postman,nodejs,express" />
  </a>
</p>

## Key Features

- **User Authentication**: Secure signup and login functionalities with JWT-based authentication.
- **Password Reset**: Enable users to reset their passwords using OTP (One-Time Password) verification.
- **Create and Manage Posts**: Allow users to create, update, delete, and archive posts, including text and media content.
- **Engagement Features**: Like and comment functionalities for each post to enhance user interaction.
- **Friend Management**: Facilitate friend requests, acceptance/rejection, and friends list management.
- **Bookmarking and Saving**: Allow users to bookmark or save posts for future reference.
- **Post Filtering**: Enable post filtering based on captions to improve discoverability.
- **Pagination**: Optimize API performance by paginating posts and comments retrieval.

## API Endpoints

### User Management

- `POST /api/users/signup`: Register a new user.
- `POST /api/users/signin`: Authenticate an existing user.
- `GET /api/users/logout`: Log out the user from the current device.
- `GET /api/users/logout-all-devices`: Log out the user from all devices.
- `GET /api/users/get-details/:userId`: Retrieve details of a specific user.
- `GET /api/users/get-all-details`: Retrieve details of all users.
- `PUT /api/users/update-details/:userId`: Update user details, including avatar.

### Posts

- `POST /api/posts/`: Create a new post.
- `GET /api/posts/all`: Retrieve all posts in a paginated format.
- `GET /api/posts/:postId`: Retrieve a specific post by `postId`.
- `GET /api/posts/user`: Retrieve posts based on user credentials.
- `PUT /api/posts/:postId`: Update a post by `postId`.
- `DELETE /api/posts/:postId`: Delete a post by `postId`.

### Comments

- `GET /api/comments/:postId`: Retrieve comments for a specific post by `postId`.
- `POST /api/comments/:postId`: Create a comment for a specific post by `postId`.
- `PUT /api/comments/:commentId`: Update a comment by `commentId`.
- `DELETE /api/comments/:commentId`: Delete a comment by `commentId`.

### Likes

- `GET /api/likes/:postId`: Retrieve all likes for a specific post by `postId`.
- `GET /api/likes/toggle/:postId`: Toggle the like status to like or unlike a post.

### Friends

- `GET /api/friends/get-friends/:userId`: Retrieve friends of a user.
- `GET /api/friends/get-pending-requests`: Retrieve pending friend requests for the user.
- `GET /api/friends/toggle-friendship/:friendId`: Toggle friendship status with another user.
- `GET /api/friends/response-to-request/:friendId`: Respond to a friend request.

### OTP

- `POST /api/otp/send`: Send an OTP for password reset.
- `PUT /api/otp/verify`: Verify the OTP for password reset.
