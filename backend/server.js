const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})

// Setting up config file
dotenv.config({ path: 'config/config.env'});

// Connecting to database
connectDatabase();

const server = app.listen(8000, () => {
    console.log(`Server started on PORT: 8000 `);
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    })
});