import {
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!clientId) {
  throw new Error("PAYPAL_CLIENT_ID is not configured.");
}

if (!clientSecret) {
  throw new Error("PAYPAL_CLIENT_SECRET is not configured.");
}

const environment =
  process.env.PAYPAL_ENVIRONMENT?.toLowerCase() === "production"
    ? Environment.Production
    : Environment.Sandbox;

export const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: clientId,
    oAuthClientSecret: clientSecret,
  },
  environment,
  logging: {
    logLevel: LogLevel.Error,
    logRequest: {
      logBody: false,
      logHeaders: false,
    },
    logResponse: {
      logHeaders: false,
    },
  },
});

export const ordersController = new OrdersController(paypalClient);