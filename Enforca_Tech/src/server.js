const app = require('./app')

PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})