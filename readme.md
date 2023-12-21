# Social Media Backend API Documentation

## Users

### User Signup

- **Method:** `POST`
- **Endpoint:** `/api/users/signup`
- **Description:** Create a new user account.
- **Body:**
  - `form-data`
    - `name` (string): User's name.
    - `email` (string): User's email address.
    - `password` (string): User's password.
    - `gender` (string): User's gender.
    - `profilePicture` (file): User's profile picture.

### User Signin

- **Method:** `GET`
- **Endpoint:** `/api/users/signin`
- **Description:** Authenticate a user.
- **Body:**
  - `raw (json)`
    ```json
    {
      "email": "arjunapr321@gmail.com",
      "password": "me only me"
    }
    ```

### User Logout

- **Method:** `POST`
- **Endpoint:** `/api/users/logout`
- **Description:** Logout the currently authenticated user.

### User Logout All Devices

- **Method:** `POST`
- **Endpoint:** `/api/users/logout-all-devices`
- **Description:** Logout the user from all devices.

### Get All User Details

- **Method:** `GET`
- **Endpoint:** `/api/users/get-all-details`
- **Description:** Get details of all registered users.

### Get User Details

- **Method:** `GET`
- **Endpoint:** `/api/users/get-details/{userId}`
- **Description:** Get details of a specific user by ID.

### Update User Details

- **Method:** `PUT`
- **Endpoint:** `/api/users/update-details`
- **Description:** Update user details.
- **Body:**
  - `form-data`
    - `name` (string): Updated user name.
    - `email` (string): Updated email address.
    - `profilePicture` (file): Updated profile picture.

## Posts

### Create Post

- **Method:** `POST`
- **Endpoint:** `/api/posts`
- **Description:** Create a new post.
- **Body:**
  - `form-data`
    - `caption` (string): Post caption.
    - `postImage` (file): Image attached to the post.

### Delete Post

- **Method:** `DELETE`
- **Endpoint:** `/api/posts/{postId}`
- **Description:** Delete a specific post by ID.

### Fetch All Posts

- **Method:** `GET`
- **Endpoint:** `/api/posts/all`
- **Description:** Get details of all posts.

### Fetch Post by ID

- **Method:** `GET`
- **Endpoint:** `/api/posts/{postId}`
- **Description:** Get details of a specific post by ID.

### Fetch All Users Posts

- **Method:** `GET`
- **Endpoint:** `/api/posts`
- **Description:** Get details of posts by the authenticated user.

### Update Post

- **Method:** `PUT`
- **Endpoint:** `/api/posts/{postId}`
- **Description:** Update a specific post by ID.
- **Body:**
  - `form-data`
    - `caption` (string): Updated post caption.
    - `postImage` (file): Updated post image.

## Comments

### Add Comment

- **Method:** `POST`
- **Endpoint:** `/api/comments/{postId}`
- **Description:** Add a new comment to a specific post.
- **Body:**
  - `raw (json)`
    ```json
    { "comment": "i am a second user how is commenting" }
    ```

### Fetch All Comments of a Specific Post

- **Method:** `GET`
- **Endpoint:** `/api/comments/{postId}`
- **Description:** Get all comments for a specific post.

### Update Comment

- **Method:** `PUT`
- **Endpoint:** `/api/comments/{commentId}`
- **Description:** Update a specific comment by ID.
- **Body:**
  - `raw (json)`
    ```json
    { "comment": "this is an updated comment" }
    ```

### Delete Comment

- **Method:** `DELETE`
- **Endpoint:** `/api/comments/{commentId}`
- **Description:** Delete a specific comment by ID.

## Likes

### Get Likes

- **Method:** `GET`
- **Endpoint:** `/api/likes/{postId}`
- **Description:** Get all likes for a specific post.

### Toggle Like

- **Method:** `PUT`
- **Endpoint:** `/api/likes/{postId}`
- **Description:** Toggle like for a specific post.
- **Body:**
  - `raw (json)`
    ```json
    { "type": "Comment" }
    ```

## Friends

### Get All Friends

- **Method:** `GET`
- **Endpoint:** `/api/friends/get-friends/{userId}`
- **Description:** Get a list of all friends for a specific user.

### Get All Pending Requests

- **Method:** `GET`
- **Endpoint:** `/api/friends/get-pending-requests`
- **Description:** Get a list of pending friend requests for the authenticated user.

### Toggle Friendship

- **Method:** `PUT`
- **Endpoint:** `/api/friends/toggle-friendship/{friendId}`
- **Description:** Toggle friendship status with a specific user.

### Respond to Request

- **Method:** `PUT`
- **Endpoint:** `/api/friends/response-to-request/{friendId}`
- **Description:** Respond to a friend request.
- **Body:**
  - `raw (json)`
    ```json
    { "status": "re" }
    ```

## OTP

### Send OTP

- **Method:** `POST`
- **Endpoint:** `/api/otp/send`
- **Description:** Send OTP to the specified email.
- **Body:**
  - `raw (json)`
    ```json
    { "email": "arjunapr321@gmail.com" }
    ```

### Reset Password

- **Method:** `POST`
- **Endpoint:** `/api/otp/reset-password`
- **Description:** Reset password using OTP.
- **Body:**
  - `raw (json)`
    ```json
    {
      "email": "arjunapr321@gmail.com",
      "otp": 875079,
      "newPassword": "me only me"
    }
    ```
