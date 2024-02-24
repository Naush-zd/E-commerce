// create a schema for the product model use react type import and export
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true
        },
        quantity: {
            type: Number
        },
        images: {
            type: Array // array of image urls
        },
      
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);


// sample data

// {
//     "name": "Laptop",
//     "description": "This is the best Apple laptop",
//     "price": 1000,
//     "quantity": 10,
//     "images": [
//        "https://res.cloudinary.com/dxkufsejm/image/upload/v1627321233/ecommerce/pc1.jpg",
//        "https://res.cloudinary.com/dxkufsejm/image/upload/v1627321233/ecommerce/pc2.jpg",
//        "https://res.cloudinary.com/dxkufsejm/image/upload/v1627321233/ecommerce/pc3.jpg"
//     ]
//  }




