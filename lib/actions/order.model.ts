import { Schema, models, model, Document } from 'mongoose';

enum paymentStatusEnum {
    PAID = "PAID",
    PENDING = "PENDING",
    COMPUTING = "COMPUTING",
    CANCELED = "CANCELED"
}

enum paidCurrencyEnum {
    BTC = "BTC",
    EUR = "EUR",
    USD = "USD",
}

export interface IPayment extends Document {
    provider?: string;
    status: paymentStatusEnum;
    amount: number | null;
    invoice?: string;
    txid?: string;
    txAt?: Date;
    paidCurrency?: paidCurrencyEnum;
}

export interface IOrder extends Document {
    _id: string;
    addrtype: string;
    prefixstr: string;
    casesensitive: number;
    publickey: string;
    partialPriv?: string
    email?: string;
    lnurl?: string;
    price?: number;
    payment?: IPayment;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
    processor: string
}

const PaymentSchema = new Schema({
    provider: { type: String, required: false },
    status: {
        type: String,
        required: true,
        enum: ["PAID", "PENDING", "FAILED", "CANCELED"], // Reflecting the TypeScript enum
    },
    amount: { type: Number, default: null },
    invoice: { type: String, required: false },
    txid: { type: String, required: false },
    txAt: { type: Date, required: false },
    paidCurrency: {
        type: String,
        required: false,
        enum: ["BTC", "EUR", "USD"], // Reflecting the TypeScript enum
    }
});

const OrderSchema = new Schema({
    _id: { type: String, required: true },
    addrtype: { type: String, required: true },
    prefixstr: { type: String, required: true },
    casesensitive: { type: Number, required: true },
    publickey: { type: String, required: true },
    partialPriv: { type: String, required: false }, // Optional partial private key.
    email: { type: String, required: false }, // Optional email address.
    lnurl: { type: String, required: false }, // Optional LNURL for lightning payments.
    price: { type: Number, default: 0, required: false }, // Price of the order, defaulting to 0.
    payment: { type: PaymentSchema, required: false }, // Embedding the PaymentSchema for payment details.
    status: { type: String, required: true }, // Status of the order.
    processor: { type: String },
    createdAt: { type: Date, default: Date.now }, // Creation date of the order.
    updatedAt: { type: Date, required: false } // Optional last update date.
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }); // Using Mongoose timestamps option for createdAt and updatedAt.


const Order = models.Order || model('Order',
    OrderSchema);

export default Order;