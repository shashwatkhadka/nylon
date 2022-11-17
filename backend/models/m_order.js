const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        phoneNumber: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {prodname: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    itemPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },

});
module.exports = mongoose.model("order", orderSchema)