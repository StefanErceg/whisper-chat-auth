# whisper-chat-auth
Authentication server for a secure chat application. It is used to secure login users and create new users. All user information is stored in MySQL database, and the users passwords are hashed using bcrypt password-hashing algorithm. After successful login secure http-only cookie is returned to the user.

Secure chat architecture schema: 

<a target="_blank" href="https://imageupload.io/Td7dJOjkbVn5y3C"><img  src="https://imageupload.io/ib/03dKesnMfZfJuJK_1697490579.png" alt="Screenshot from 2023-10-16 22-26-41.png"/></a>
