import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, policyId, amount, reference, transactionId, paymentDate } = body;

    // Validate required fields
    if (!clientId || !policyId || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required payment fields" },
        { status: 400 }
      );
    }

    // Generate payment number (format: PAY-YYYYMMDD-XXXX)
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const paymentNumber = `PAY-${dateStr}-${randomNum}`;

    // Generate receipt number (format: REC-YYYYMMDD-XXXX)
    const receiptNumber = `REC-${dateStr}-${randomNum}`;

    // Create payment record
    const paymentData = {
      amount: Number(amount),
      clientId,
      policyId,
      currency: "USD",
      notes: `Online payment via PayNow - Reference: ${reference}`,
      paymentDate: new Date(paymentDate).toISOString(),
      paymentMethod: "Online",
      paymentNumber,
      receiptNumber,
      receivedById: "Online Payment",
      status: "PENDING",
      transactionId: transactionId || null,
      createdAt: new Date().toISOString(),
    };

    // Save to Firebase Realtime Database
    const paymentsRef = ref(db, "payments");
    const newPaymentRef = push(paymentsRef);
    await set(newPaymentRef, paymentData);

    return NextResponse.json({
      success: true,
      paymentId: newPaymentRef.key,
      paymentNumber,
      receiptNumber,
      message: "Payment saved successfully",
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    const message = error instanceof Error ? error.message : "Failed to save payment";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
