const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express()
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
    
})
app.use('/categoryimage',express.static('upload'))

const Category = require('../models/category');
//show all category and brand
router.get('/getcategory', async(req, res, next) => {

    Category.find({}).populate('brand')
        
    .exec()
    .then(docs => {
        
        //const categories = Category.find('', docs);

        res.status(201).json({
            message: docs
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    })
    


});

//post category...
router.post('/addcategory',upload.single("categoryimage"), (req, res, next) => {

    const category = new Category({
        
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        categoryimage: req.file.path
    });

    category.save()
    .then(doc => {
        res.status(201).json({
            category: doc
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });

});
//update category....
router.post('/category/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true};

        const result = await Category.findByIdAndUpdate(id,updates,options);
        res.send(result);
    } catch(error) {
        console.log(error.message);
    }
})

router.put('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given Id : ${req.params.id}');
    var updateData={
        name: req.body.name,
    };
    Category.findByIdAndUpdate(req.params.id, {$set: updateData}, {new: true}, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error in Updating Update : '+JSON.stringify(err, undefined, 2));
    });
});


router.delete('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');
        Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('No record with the given Id : '+JSON.stringify(err, undefined, 2));
    });
});

module.exports = router