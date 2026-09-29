import { NextRequest, NextResponse } from "next/server";
import { paypalClient } from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = body?.orderID;

    if (
      typeof orderId !== "string" ||
      !/^[A-Z0-9-]+$/i.test(orderId)
    ) {
      return NextResponse.json(
        { error: "Invalid PayPal order ID." },
        { status: 400 }
      );
    }

    const response = await paypalClient.orders.captureOrder({
      id: orderId,
      body: {},
    });

    const result = response.result;

    return NextResponse.json(result);
  } catch (error) {
    console.error("PayPal capture-order error:", error);

    return NextResponse.json(
      { error: "Unable to capture PayPal order." },
      { status: 500 }
    );
  }
}