import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item

const addFood = async (req, res) => {
    // let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "food added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}


//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


//remove food item
// const removeFood = async (req, res) => {
//     try {
//         const id = req.body;
//         const food = await foodModel.findById(id);
//         fs.unlink(`uploads/${food.image}`, () => { })
//         await foodModel.findByIdAndDelete(id);
//         res.json({ success: true, message: "Food Removed" })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }

//remove food item
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            throw new Error("ID is required");
        }

        const food = await foodModel.findById(id);

        if (!food) {
            throw new Error("Food item not found");
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log(err);
            }
        });

        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};



export { addFood, listFood, removeFood }

