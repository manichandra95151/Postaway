# Postaway
Project Overview
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
To Develop a robust social media backend REST API that empowers users to post,comment, like, send friend requests and reset their passwords using OTP for enhanced security.

Technologies Used
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=javascript,mongodb,postman,nodejs,express" />
  </a>
</p>

Key Features
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

• User Authentication: Implement secure signup and signin functionalities using JWT for authentication.
• Password Reset: Enable users to securely reset their passwords via OTP (One-Time Password) verification.
• Create and Manage Posts: Empower users to create, update, delete, and archive posts, including text and media content.
• Engagement Features: Enhance user interaction with like and comment functionalities for each post.
• Friend Management: Facilitate friend requests, acceptance/rejection, and management of friends lists.
• Bookmarking and Saving: Allow users to bookmark or save posts for later reference.
• Filtering: Enhance discoverability by implementing post filtering based on captions.
• Pagination: Optimize performance by paginating posts and comments retrieval.

API Endpoints
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
User Management:
•	POST /api/users/signup: Register a new user.
•	POST /api/users/signin: Authenticate an existing user.
•	GET /api/users/logout: Logout the user from the current device.
•	GET /api/users/logout-all-devices: Logout the user from all devices.
•	GET /api/users/get-details/:userId: Get details of a specific user.
•	GET /api/users/get-all-details: Get details of all users.
•	PUT /api/users/update-details/:userId: Update user details, including avatar

Posts
•	POST /api/posts/: Create a new post.
•	GET /api/posts/all: Retrieve all posts in a paginated format.
•	GET /api/posts/:postId: Retrieve a specific post by postId.
•	GET /api/posts/: Retrieve posts based on user credentials.
•	PUT /api/posts/:postId: Update a post by postId.
•	DELETE /api/posts/:postId: Delete a post by postId.

Comments:
•	GET /api/comments/:postId: Retrieve comments for a specific post by postId.
•	POST /api/comments/:postId: Create a comment for a specific post by postId.
•	PUT /api/comments/:commentId: Update a comment by commentId.
•	DELETE /api/comments/:commentId: Delete a comment by commentId.

Likes:
•	GET /api/likes/:postId: Retrieve all likes for a specific post by postId.
•	GET /api/likes/toggle/:postId: Toggle like feature to like or unlike a post.

Friends:
•	GET /api/friends/get-friends/:userId: Get friends of a user.
•	GET /api/friends/get-pending-requests: Get pending friend requests for the user.
•	GET /api/friends/toggle-friendship/:friendId: Toggle friendship with another user.
•	GET /api/friends/response-to-request/:friendId: Respond to a friend request.

OTP:
•	POST /api/otp/send: Send OTP for password reset.
•	PUT /api/otp/verify: Verify OTP for password reset.


