const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');


//getting new product
router.get('/', (req,res,next) =>{
    Product.find()

    .then((result) =>{
        const response  = {
            producs: result.map(result =>{
                return {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    quantity: result.quantity,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/products/' + result._id,
                        date: result.date
                    }
                }
            })
        }
        res.status(201).json(response);
    })

    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });


})


//posting a new product
router.post('/', (req,res,next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        date: req.body.date
    });

    product
    .save()
    .then((result) =>{
        console.log(result);
        res.status(201).json({
            message: 'Product has been Created',
            createdProduct: {
                _id: result._id,
                date: result.date,
                name: result.name,
                price: result.price,
                quantity: result.quantity
            }
        });
    })


    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

})


//getting specific id
router.get('/:productId', (req,res,next) =>{
    const id = req.params.productId;

    Product.findById(id)

    .then((result) =>{
        console.log(result);
        res.status(201).json({
           message: `Id of ${id} has been fetch`,
           productFetch: {
            _id: result._id,
            date: result.date,
            name: result.name,
            price: result.price,
            quantity: result.quantity
           } 
        })
    })



    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

})


router.delete('/:productId', (req,res,next) =>{
    const id = req.params.productId;

    Product.remove({_id: id})

    .then((result)=>{
        console.log(result);
        res.status(201).json({
            message: `Data has been Deleted ID of ${id}`
        })
    })


    .catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

})

module.exports = router;