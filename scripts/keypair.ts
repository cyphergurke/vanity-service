import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
const ECPair = ECPairFactory(ecc);

// const mainnet = bitcoin.networks.bitcoin;
export const genKeypair = (entropy: string) => {
    const privateKeyBuffer: Buffer = Buffer.from(entropy);
    const sha265priv = bitcoin.crypto.sha256(privateKeyBuffer);
    const keypair = ECPair.fromPrivateKey( sha265priv, { compressed: true, network: bitcoin.networks.bitcoin })
    const wifkey = keypair.toWIF()
    const publicKey = keypair.publicKey.toString("hex");
    return {privKey: wifkey, pubKey: publicKey}
}