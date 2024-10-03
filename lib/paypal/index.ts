"use server"

import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const configureEnvironment = function () {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ''
  const clientSecret = process.env.PAYPAL_SECRET ?? ''
  if (!clientId || !clientSecret) {
    console.log("PaymentSecret not set")
  }
  if (process.env.PAYPAL_ENV === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
  }
}

const client = function () {
  const environment = configureEnvironment()
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment)
}

export default client