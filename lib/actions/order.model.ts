import { Schema, models, model, Document } from 'mongoose';

enum paymentStatusEnum {
    PAID = "PAID",
    PENDING = "PENDING",
    QUEUED = "QUEUED",
    COMPUTING = "COMPUTING",
    COMPLETED = "COMPLETED"
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
    lnInvoice: lnInvoice;
    onchainAddr: string;
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
    partialPriv?: string;
    vanityAddr?: string;
    email?: string;
    lnurl?: string;
    price?: number;
    payment?: IPayment;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
}

type lnInvoice = {
    payment_hash: string;
    payment_request: string;
    lnurl_response: string | null;
    checking_id: string;

}


const metadataSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const chainInvoiceSchema = new Schema({
    address: { type: String, required: true }
});

const lightningInvoiceSchema = new Schema({
    expires_at: { type: Number, required: true },
    payreq: { type: String, required: true }
});

const transactionSchema = new Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    desc_hash: { type: Boolean, default: false },
    created_at: { type: Number, required: true },
    status: { type: String, enum: ['unpaid', 'paid', 'cancelled'], default: 'unpaid' },
    amount: { type: Number, required: true },
    callback_url: { type: String, default: '' },
    success_url: { type: String, default: '' },
    hosted_checkout_url: { type: String, default: '' },
    order_id: { type: String, required: true },
    currency: { type: String, required: true },
    source_fiat_value: { type: Number, required: true },
    fiat_value: { type: Number, required: true },
    auto_settle: { type: Boolean, default: false },
    notif_email: { type: String, required: true },
    address: { type: String, required: true },
    metadata: metadataSchema,
    chain_invoice: chainInvoiceSchema,
    uri: { type: String, required: true },
    ttl: { type: Number, required: true },
    lightning_invoice: lightningInvoiceSchema
});


const PaymentSchema = new Schema({
    provider: {
        type: String,
        required: false,
        enum: ["PAYPAL", "OPENNODE"]
    },
    opennode: { type: transactionSchema, required: false },
    amount: { type: Number, default: null },
    txid: { type: String, required: false },
    txAt: { type: Date, required: false },
    paidCurrency: {
        type: String,
        required: false,
        enum: ["BTC", "EUR", "USD"],
    }
});

const OrderSchema = new Schema({
    _id: { type: String, required: true },
    language: { type: String, required: true },
    addrtype: { type: String, required: true },
    prefixstr: { type: String, required: true },
    casesensitive: { type: Number, required: true },
    publickey: { type: String, required: true },
    partialPriv: { type: String, required: false },
    vanityAddr: { type: String, required: false },
    email: { type: String, required: false },
    lnurl: { type: String, required: false },
    price: { type: Number, default: 0, required: false },
    payment: {
        type: PaymentSchema,
        required: false
    },
    status: { type: String, required: true },
    progress: { type: Array, default: 0, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });


const Order = models.Order || model('Order',
    OrderSchema);

export default Order;