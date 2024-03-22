const express = require('express')
const app = express()
const morgan  = require('morgan')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const globalErrorHandler = require('./controller/ErrorController')
const AppError = require("./util/AppError");
const eventRoute  = require('./routes/eventRoutes')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/user',userRoute)
app.use('/event',eventRoute)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler)
module.exports = app;