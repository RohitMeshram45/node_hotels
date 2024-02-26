const mongoose = require('mongoose')

 
// Define the peron schem

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        name: ["cheft","subManager" ,"students", "manager"]
        , required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person;