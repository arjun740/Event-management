const mongoose = require('mongoose')
const app =  require('./app');
const morgan = require("morgan");
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"})
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const port = process.env.PORT || 3030;
app.use(morgan('dev'));


const DB  = 'mongodb://localhost:27017/eventManagement'
mongoose.connect(DB).then(() => console.log("DATABASE  CONNECTED SUCCESSFULLY"))
mongoose.connection.on('error',(err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('unhandled rejection  shutting down...');
    server.close(() => {
        process.exit(1);
    });
});