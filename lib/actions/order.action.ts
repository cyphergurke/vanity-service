"use server"

import { connectToDatabase } from "../mongoose"
import Order from "./order.model";

export async function getOrder() {
    try {
        connectToDatabase();
        const order: any = await Order.find({})
        return { order };
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}


export async function getOrdersByStatus(params: any) {
    try {
        connectToDatabase();
        const orders = await Order.find({
            status: params.status
        })
        return orders
    } catch (err: any) {
        console.log(err.message)
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
        const { orderId } = params;
        const order = await Order.findById(orderId)
        return order;
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}

export async function getOrderByIdAndUpdate(params: any) {
    try {
        connectToDatabase();
        const { _id, updateData } = params;
        const order = await Order.findOneAndUpdate({_id: _id}, updateData)
        return order;
    } catch (err: any) {
        console.log(err.message);
        throw err
    }
}