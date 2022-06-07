const mongoose = require('mongoose')



mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB Connected`))
.catch(error => {
    console.log(error)
    process.exit()
})