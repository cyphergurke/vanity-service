"use server"

import { connectToDatabase } from "../mongoose"
import Order, { IOrder } from "./order.model";

export async function getOrder(params?:  any) {
    try {
        connectToDatabase();
        const order = await Order.find({})
        return {order};
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}

export async function createOrder(params: any) {
    try {
        connectToDatabase();
        const order = await Order.create(params)
        const orderstr = JSON.stringify(order)
        return orderstr
    } catch (err: any) {
        console.log(err.message)
    }
}

export async function getOrderById(params: any) {
    try {
        connectToDatabase();
        const {orderId} = params;
        const order = await Order.findById(orderId)
        return order;
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}