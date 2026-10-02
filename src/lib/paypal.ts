import { Client, Environment, OrdersController } from "@paypal/paypal-server-sdk";

let cachedOrdersController: OrdersController | null = null;

export function getOrdersController(): OrdersController {
  if (cachedOrdersController) {
    return cachedOrdersController;
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are not configured.");
  }

  // Correctly initialize the client using clientCredentialsAuthCredentials
  const client = new Client({
    environment:
      process.env.NODE_ENV === "production"
        ? Environment.Production
        : Environment.Sandbox,
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
  });

  cachedOrdersController = new OrdersController(client);
  return cachedOrdersController;
}
