const express = require('express')
const routes = require('./routes')
const connectDB = require('./config/mongodb')
const app = express()
const notFoundMiddleware = require('./middlewares/not_found')
const handleErrorMiddleware = require('./middlewares/handler_error')

require('dotenv').config()

const port = process.env.PORT

connectDB()

app.use(express.json());
app.use('/api/v1/uploads', express.static('public/uploads'));

app.use("/api/v1", routes)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})