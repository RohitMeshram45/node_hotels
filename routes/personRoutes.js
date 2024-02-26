const express = require("express")
const router = express.Router()
const Person = require("../models/Person.js");
const { json } = require("body-parser");


router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data is Fetched")
    res.status(200).json(data)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server " })
  }
})


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get specific data from the person or from Menu


router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype; // Extract the data from the Url parameter

    if (worktype == "waiter" || worktype == "chef" || worktype == "manager" || worktype == "subManager") {
      const response = await Person.find({ work: worktype })
      console.log(response)
      res.status(200).json(response)
    }
    else {
      res.status(404).json("Invalid Work type")
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err: "Internal server error" })
  }

})


router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,       // return the updated documents
      runValidators: true // Run the mongoose validator
    });

    if (!response) {
      res.status(404).json({ error: "Invalid person Id" })
    }

    console.log("data Updated")
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server Error" });
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = Person.findByIdAndDelete(personId)
    if (!response) {
      res.status(404).json({ error: "Person Invalid" })
    }
    console.log("data deleted")
    res.status(200).json({message:"data deleted sucessfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server Error" })
  }
})
module.exports = router