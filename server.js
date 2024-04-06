require("dotenv").config();
const morgan = require('morgan'),
    express = require('express'),
    app = express(),
    connectDB = require('./config/db'),
    rateLimit = require('express-rate-limit'),
    userRoutes = require("./routes/user-routes"),
    deckRoutes = require("./routes/deck-routes"),
    testRoutes = require("./routes/test-routes"),
    reportRoutes = require("./routes/report-routes"),
    searchRoutes = require('./routes/search-routes'),
    questionRoutes = require("./routes/question-routes"),
    favoriteRoutes = require("./routes/favorite-routes");

PORT = process.env.PORT || 3001;

// connect to DB
connectDB();

// Enable 'trust proxy' to allow Express to trust headers set by proxies
app.set('trust proxy', true);

// Define rate limiting options
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

// Set up logging middleware
app.use(morgan('dev'));
app.use(express.json());

// setup routes
app.use("/api/users", userRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/favorites", favoriteRoutes);

// Define a test route
app.get('/test', async (req, res) => {
    try {
        return res.status(200).json({ msg: 'Server working' });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// // Define a set of blacklisted IP addresses
// const blacklist = new Set([]); // Add your blacklisted IPs here

// // Middleware function to block requests from blacklisted IPs
// const blockBlacklistedIPs = (req, res, next) => {
//     const clientIP = req.ip || req.connection.remoteAddress;
//     if (blacklist.has(clientIP)) {
//         // Respond with a 403 Forbidden status code
//         return res.status(403).send('Access Forbidden');
//     }
//     // Allow the request to proceed
//     next();
// };

// // Apply the middleware to all routes
// app.use(blockBlacklistedIPs);