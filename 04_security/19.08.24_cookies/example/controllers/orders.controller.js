import Order from "../models/orders.model.js";


export const addOrder = async(req, res, next) => {
    try {
        const {customer, items, description} = req.body;
        
        const neworder = await Order.create({customer, items, description});
        res.json({
            msg: 'add order success',
            neworder
        })
    } catch (error) {
        next(error)
    }
}