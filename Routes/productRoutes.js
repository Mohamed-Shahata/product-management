const express = require("express");
const router = express.Router();
const Product = require("../Models/Product.js");
const upload = require("../Middleware/multerMiddleware.js");
const fs = require("fs");

//Creat Product
router.post("/" , upload.single("image") , async(req , res) => {
  try {
    const {name , price , description} = req.body;
    const  image = req.file.path;
    const product = new Product({
      name,
      price,
      description,
      image
    });

    await product.save();
    res.status(200).json({message:"Created" , product});
  } catch (error) {
    console.log("Creat Product Error => " + error);
  }
});

//Get ALL Product
router.get("/" , async(req , res) => {
  try {
    const products = await Product.find();
    if(!products){
      return res.status(404).json({message: "Proudect Not Found"});
    }
    res.status(200).json({products});
  } catch (error) {
    console.log("Get All Product Error => " + error);
  }
});

//Get Single Product
router.get("/:id" , async(req , res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({message: "Product Not Found"});
    }
    res.status(200).json({product});
  } catch (error) {
    console.log("Get Single Product Error => " + error);
  }
});

//Update Product
router.patch("/:id" , async(req , res) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(id , req.body ,{ new: true });
      if(!updateProduct){
        return res.status(400).json({message: "Product not updated"});
      }
      await updateProduct.save();
      res.status(200).json(updateProduct);
  } catch (error) {
    console.log("Get Update Product Error => " + error);
  }
});

//Delete Product
router.delete("/:id", async(req , res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if(product){
      fs.unlink(product.image , (err) => {
        if(err){
          res.status(500).json({error: "faild to delete image file"})
        }
      })
    }else{
      return res.status(404).json({message: "Product Is Not Found"});
    }
    res.status(200).json({message: "Deleted Successfuly"});
  } catch (error) {
    console.log("Get Delete Product Error => " + error);
  }
});

module.exports = router;