const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieparser())

const URI = process.env.MANGODB_URL
mongoose.connect(URI)
.then(() => console.log('connected to mangodb'))
.catch((err) => console.log('connection failed'))

app.use('/user',require('./routes/userRoute'))

// app.use('/',(req, res, next) => {
//     res.json({msg: 'hello'})
// })

// app.use('/user',(req, res, next) => {
//     res.json({msg: 'user'})
// })

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log('server is running on PORT 5000')
})