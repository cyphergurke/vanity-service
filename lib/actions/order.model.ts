import {Schema, models, model, Document } from 'mongoose';


export interface IOrder extends Document {
    addtype: string;
    prefixstr: string;
    casesensitive: number;
    publickey: string;
    email?: string,
    lnurl?: string,
    price: number;
    createdAt: Date;
}

const OrderSchema = new Schema({
    addtype: {type: String, required: true},
    prefixstr: {type: String, required: true},
    casesensitive: {type: Number, required: true},
    publickey: {type: String, required: true},
    email: {type: String, required: false},
    lnurl: {type: String, required: false},
    price: {type: Number, default: 0, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Order = models.Order || model('Order',
OrderSchema);

export default Order;