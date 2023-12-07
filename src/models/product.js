import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        unique: true,
    },
    price: Number,
}, { timestamps: true })

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    }
}, { timestamps: true })

const orderSchema = new Schema({
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: "OrderItem"
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema);
export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export const Order = mongoose.model('Order', orderSchema);