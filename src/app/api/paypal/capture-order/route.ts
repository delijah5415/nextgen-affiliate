import { NextResponse } from "next/server";
import { CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import { getOrdersController } from "@/lib/paypal";

export async function POST() {
  try {
    const ordersController = getOrdersController();

    const response = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: "10.00",
            },
            description: "Support Platform Development",
          },
        ],
      },
    });

    const result = response.result;

    if (!result?.id) {
      console.error("PayPal did not return an order ID.", result);

      return NextResponse.json(
        {
          error: "PayPal did not return an order ID.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      id: result.id,
    });
  } catch (error) {
    console.error("PayPal create-order error:", error);

    return NextResponse.json(
      {
        error: "Unable to create PayPal order.",
      },
      {
        status: 500,
      }
    );
  }
}
