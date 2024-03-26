require("dotenv").config();
const morgan = require('morgan'),
    express = require('express'),
    app = express(),
    connectDB = require('./config/db'),
    userRoutes = require("./routes/user-routes"),
    deckRoutes = require("./routes/deck-routes"),
    questionRoutes = require("./routes/question-routes"),
    PORT = process.env.PORT || 3001;

// connect to DB
connectDB();

// Set up logging middleware
app.use(morgan('dev'));
app.use(express.json());

// setup routes
app.use("/api/users", userRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/questions", questionRoutes);

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
