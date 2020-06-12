const categorySchema = mongoose.Schema({
    brand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true  }],
    name: { type: String, required: true },
    createdAt:  { type: Date, default: Date.now },
    categoryimage:{type: String, required:true},
    description: { type: String }
   
});

module.exports = mongoose.model('Category', categorySchema);