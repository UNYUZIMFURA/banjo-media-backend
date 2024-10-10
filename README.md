# Social Media Backend(Banjo Media)
- A Full-Featured backend for a social media application in Nodejs

# Features
- User Authentication(Login,Signup)
- Posts Management(Creating Posts, Viewing Posts, Updating Posts, Deleting Posts )
- Comments Management(Adding comments, Viewing comments, Updating comments, Deleting comments)
- Email: Sending Email with code to the user
- Email Verification: Verifying if the code entered by the user is the one we sent to the Email

# Environment Variables
Consider adding these Environment Variables to your .env file to enable your application to run smoothly

- DATABASE_URL="Enter your MongoDB URL"
- JWT_SECRET="Enter a phrase/word to be used by JWT while generating tokens"
- AUTH_EMAIL="Enter the E-mail that will be used to sent email to users"
- AUTH_PASSWORD="Enter the App Password for your Email"
** For the Email to be used by Nodemailer to send emails you need to first enable 2FA(Two-Factor Authentication on it) **
** For the password you need to generate an "App Password", they provide a 16-characters password for you to use **


# Technologies & Tools
- Nodejs
- Expressjs
- MongoDB
- JWT(Managing user tokens)
- Nodemon(Instant server refresh)
