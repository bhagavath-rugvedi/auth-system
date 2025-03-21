const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute')
const app = express();


//Middleware
app.use(express.json());
app.use(cors());


//Route
app.use('/api/auth', authRouter);

//MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication-system')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error("Failed to connect: ",error));

//Global error handler
app.use((err, req, res, next)=>{
    err.statuCode = err.statuCode || 500;
    err.status = err.status || 'error';

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message,  
    });
});

//Server
const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Running on PORT ${PORT}`);
});