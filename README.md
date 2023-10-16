# whisper-chat-auth
Authentication server for a secure chat application. It is used to secure login users and create new users. All user information is stored in MySQL database, and the users passwords are hashed using bcrypt password-hashing algorithm. After successful login secure http-only cookie is returned to the user.

Secure chat architecture schema: 

![Screenshot from 2023-10-16 22-26-41](https://github.com/StefanErceg/whisper-chat-auth/assets/24877686/00a4f676-fc55-4201-9d89-68b7a2a4438e)
