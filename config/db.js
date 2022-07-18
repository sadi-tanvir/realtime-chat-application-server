const mongoose = require('mongoose')


const Url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jnizw.mongodb.net/${process.env.MONGO_USER}?retryWrites=true&w=majority`;
mongoose.connect(Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connected`))
    .catch(error => {
        console.log(error)
        process.exit()
    })