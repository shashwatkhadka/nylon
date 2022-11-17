const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/c_order');
const router = express.Router()

const { isLoggedinUser, authoriseRole } = require("../middleware/auth");

router.route("/order/new").post(isLoggedinUser, newOrder);

router.route("/order/:id").get(isLoggedinUser, getSingleOrder)
router.route("/orders/me").get(isLoggedinUser, myOrders)
router.route("/admin/orders").get(isLoggedinUser, authoriseRole("admin"), getAllOrders)
router.route("/admin/order/:id").put(isLoggedinUser, authoriseRole("admin"), updateOrder).delete(isLoggedinUser, authoriseRole("admin"), deleteOrder)

module.exports = router;
