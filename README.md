Secure Application Integration

A full-stack web application that connects a frontend application form to a secure backend API with server-side validation, rate limiting, security headers, logging, and SQLite database storage.

Features

- Responsive frontend using HTML and CSS
- JavaScript-based frontend interactions
- REST API built with Node.js and Express.js
- Client-side and server-side form validation
- Application data stored in an SQLite database
- API rate limiting to reduce excessive requests
- Security headers using Helmet
- Parameterized SQL queries to help prevent SQL injection
- Centralized request logging with timestamps, HTTP methods, status codes, and response times
- Health-check endpoint to verify backend and database connectivity
- Error handling for failed requests

Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite (better-sqlite3)
- Helmet
- express-rate-limit

Project Structure

secure-application-integration/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Installation and Setup

1. Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

2. Open the project folder:

cd secure-application-integration

3. Install dependencies:

npm install

4. Start the server:

npm start

5. Open the application in your browser:

http://localhost:3000

API Endpoints

Submit an Application

POST "/api/applications"

Accepts application details, validates the input, and stores valid submissions in the SQLite database.

Health Check

GET "/api/health"

Checks whether the backend server and database are available.

Example response:

{
  "status": "OK",
  "message": "Secure backend is running",
  "database": "Connected"
}

Security Measures

- Client-side and server-side input validation
- Parameterized SQL statements
- Security headers using Helmet
- Rate limiting for API requests
- Request body size restrictions
- Error handling for unsuccessful requests
- Input length validation and email format checking

Logging and Monitoring

The application includes request logging to monitor API activity.

Logged information includes:

- Timestamp
- HTTP request method
- Request path
- Response status code
- Request processing time

Database errors are also logged for easier debugging.

Database

Application records are stored locally in "applications.db".

The database and required table are automatically initialized when the application starts.

Note: The database file and real personal application data should not be committed to a public GitHub repository.

Testing

The following checks are included in the project verification process:

- Successful application submission
- Database record storage verification
- Backend health-check verification
- Request logging verification
- Invalid form input validation
- Security header verification
- Rate-limiting verification
- Responsive layout and browser testing

Author

Developed as part of a Full Stack Developer Internship project.