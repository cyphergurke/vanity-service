import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
const ECPair = ECPairFactory(ecc);

export const genKeypair = (entropy: string) => {
    const privateKeyBuffer: Buffer = Buffer.from(entropy);
    const sha265priv = bitcoin.crypto.sha256(privateKeyBuffer);
    const keypair = ECPair.fromPrivateKey(sha265priv, { compressed: true, network: bitcoin.networks.bitcoin })
    const wifkey = keypair.toWIF()
    const publicKey = keypair.publicKey.toString("hex");
    return { privKey: wifkey, pubKey: publicKey }
}

export function isValidBitcoinPublicKey(hex: string): string | null {
    const keyBuffer = Buffer.from(hex, 'hex');

    // Länge prüfen: 33 oder 65 Bytes
    if (keyBuffer.length !== 33 && keyBuffer.length !== 65) {
        return "Invalid public key";
    }

    // Komprimierter Public Key muss mit 02 oder 03 beginnen
    if (keyBuffer.length === 33 && !['02', '03'].includes(hex.substring(0, 2))) {
        return "Invalid public key";
    }

    // Unkomprimierter Public Key muss mit 04 beginnen
    if (keyBuffer.length === 65 && hex.substring(0, 2) !== '04') {
        return "Invalid public key";
    }

    return null;
}