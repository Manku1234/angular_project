const productSchema = mongoose.Schema({
    brand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true  }],
    name: { type: String, required: true },
    createdAt:  { type: Date, default: Date.now },
    //brand:[{type:mongoose.Schema.ObjectId,Ref:'Brand',required:'true'}],
    productimage:{type: String, required:true},
    description: { type: String }
   
});

module.exports = mongoose.model('Product', productSchema);