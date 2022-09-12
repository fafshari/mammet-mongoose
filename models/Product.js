import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide a name for this product.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },

    time: {
        type: Number,
        default: 4,
        min: 4,
        max: 8,
        required: [true, "Please provide a craft time for this product."],
    }

})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)