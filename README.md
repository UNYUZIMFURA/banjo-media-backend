# Social Media Backend(Banjo Media)
- A Full-Featured backend for a social media application in Nodejs

# Features
- User Authentication(Login,Signup)
- Posts Management(Creating Posts, Viewing Posts, Updating Posts, Deleting Posts )
- Comments Management(Adding comments, Viewing comments, Updating comments, Deleting comments)
- Email: Sending Email with code to the user
- Email Verification: Verifying if the code entered by the user is the one we sent to the Email

# SMTP Email Server Configuration(Via https://myaccount.google.com/security)
- For the Email(AUTH_EMAIL) to be used by Nodemailer to send emails, first enable 2FA(Two-Factor Authentication)
- For the password(AUTH_PASSWORD), generate an "App Password", It's a 16-characters phrase

# Environment Variables
Consider adding these Environment Variables to your .env file to enable your application to run smoothly

- DATABASE_URL="Enter your MongoDB URL"
- JWT_SECRET="Enter a phrase/word to be used by JWT while generating tokens"
- AUTH_EMAIL="Enter the E-mail that will be used to sent email to users"
- AUTH_PASSWORD="Enter the App Password for your Email"


# Technologies & Tools
- Nodejs
- Expressjs
- MongoDB
- JWT(Managing user tokens)
- Nodemon(Instant server refresh)
