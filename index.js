const express = require ('express')
const expenseRoutes = require('./routes/expense')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
const userRoutes = require('./routes/user')

const app = express() 

app.use(cors());


// middleware
app.use(express.json()) 

// routes               
app.use('/api/expense', expenseRoutes)
app.use('/api/user', userRoutes)

async function connectDB(){
    try{                                
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db listening for requests on port ', process.env.PORT)
        })
    }catch(error){
        console.log(error)
    }
}
connectDB()