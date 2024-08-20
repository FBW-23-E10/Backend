import mongoose,{Schema, model} from 'mongoose';


const orderSchema = new Schema({
    customer: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: String,
        required: true,
        default: (Date.now()).toString()
    },

    items: [{
        title: String,
        price: Number,
        qty: Number
    }],

    description: {
        type: String,
    }

});


const Order = model('Order', orderSchema);
export default Order;