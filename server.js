const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const Database = require("better-sqlite3");

const db = new Database("applications.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

const insertApplication = db.prepare(`
    INSERT INTO applications (name, email, message)
    VALUES (?, ?, ?)
`);


const app = express();
const PORT = process.env.PORT || 3000;
// Request logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
        console.log({
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${Date.now() - startTime}ms`
        });
    });

    next();
});

// Security headers
app.use(helmet());

// Limit incoming request body size
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many requests. Please try again later." }
});

app.use("/api", apiLimiter);

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Health-check endpoint
app.get("/api/health", (req, res) => {
    try {
        db.prepare("SELECT 1").get();

        res.status(200).json({
            status: "OK",
            message: "Secure backend is running",
            database: "Connected"
        });

    } catch (error) {
        console.error("Health check failed:", error);

        res.status(503).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }
});

// Submit application
app.post("/api/applications", (req, res) => {
    const { name, email, message } = req.body || {};

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        return res.status(400).json({
            error: "Please provide valid name, email and message fields."
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (
        cleanName.length < 2 ||
        cleanName.length > 80 ||
        cleanEmail.length > 254 ||
        cleanMessage.length < 10 ||
        cleanMessage.length > 1000
    ) {
        return res.status(400).json({
            error: "Please check the length of your form fields."
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
        return res.status(400).json({
            error: "Please enter a valid email address."
        });
    }

    // Temporary demo response: database storage will be added separately.
    try {
    const result = insertApplication.run(
        cleanName,
        cleanEmail,
        cleanMessage
    );
    console.log("Application saved successfully. ID:", result.lastInsertRowid);

    return res.status(201).json({
        success: true,
        message: "Application received and saved successfully!",
        applicationId: result.lastInsertRowid
    });
} catch (error) {
    console.error("Database error:", error);

    return res.status(500).json({
        error: "Unable to save application. Please try again."
    });
}
});

// Handle unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({ error: "API endpoint not found." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});