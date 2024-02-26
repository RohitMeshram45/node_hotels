const express = require("express")
const router = express.Router()

const MenuItem = require("../models/menu.js")
const { model } = require("mongoose")



router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("data fetch from Menucard")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})
router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log(data)
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})


router.put("/:id", async (req, res) => {

    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // return the updated document
            runValidators: true // run the mongoose validator
        })

        if (!response) {
            res.status(404).json({ error: "Menu Not found" })
        }

        console.log("data updated")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server Error" })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = MenuItem.findByIdAndDelete(menuId)
        if (!response) {
            res.status(404).json({ error: "Menu Not found" })
        }

        res.status(200).json({ message: "data deleted sucessfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server Error" })
    }
})

module.exports = router