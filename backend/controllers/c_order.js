const Order = require("../models/m_order")
const Product = require("../models/m_product")


//Create New Order
exports.newOrder = async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        totalPrice,
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        totalPrice,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    })
}

//Get Order Details based on ID
exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "fname email")

    if (!order) {
        return res.status(401).json({message:"Order not found with this id"})
    }
    res.status(200).json({
        success: true,
        order,
    })

};

//View All Orders of logged in user
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders,
    })

};

//Not Checked in Postman after this:

//admin all orders

exports.getAllOrders = async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        order,
    })

};

//update order admin
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("order not found with this Id", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered this order", 404));
    }

    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity)
    })


    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }


    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,

    })

}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false })
}


//delete order admin
exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("order not found with this Id", 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,

    })

};