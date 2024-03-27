"use server"

import { connectToDatabase } from "../mongoose"
import Order from "./order.model";

export async function getOrder(params?: any) {
    try {
        connectToDatabase();
        const order: any = await Order.find({})
        return { order };
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}

export async function createOrder(params: any) {
    try {
        connectToDatabase();
        console.log( "order",params)
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
        const { orderId } = params;
        const order = await Order.findById(orderId)
        return order;
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}