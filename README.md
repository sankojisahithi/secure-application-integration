Secure Application Integration

A full-stack web application that connects a frontend application form to a secure backend API with server-side validation, rate limiting, security headers, and SQLite database storage.

Features

- Responsive frontend using HTML and CSS
- JavaScript-based frontend interactions
- REST API built with Node.js and Express
- Client-side and server-side form validation
- Application data stored in an SQLite database
- API rate limiting to reduce excessive requests
- Security headers using Helmet
- Parameterized SQL queries to help prevent SQL injection
- Error handling for failed requests

Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite ("better-sqlite3")
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
   
   "http://localhost:3000"

API

Submit an Application

"POST /api/applications"

Submits an application after validating the input and stores the accepted application in the SQLite database.

Health Check

"GET /api/health"

Checks the API health status, if configured in the backend.

Security Measures

- Input validation on the client and server
- Parameterized SQL statements
- Security headers with Helmet
- Rate limiting for API requests
- Error handling for unsuccessful submissions

Database

Application records are stored locally in "applications.db". This database file is generated when the application initializes its database.

Note: Do not commit the database file or real personal application data to a public repository.

Testing

- Tested successful application submission
- Verified database record storage
- Tested invalid form input
- Checked security response headers
- Verified API rate-limit headers

Author

Developed as part of a Full Stack Developer Internship project.