const express = require('express')
const routes = require('./routes')
const connectDB = require('./config/mongodb')
const app = express()
const notFoundMiddleware = require('./middlewares/not_found')
const handleErrorMiddleware = require('./middlewares/handler_error')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT

connectDB()

app.use(cors())

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/uploads', express.static('public/uploads'));

app.use("/api/v1", routes)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})