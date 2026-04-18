import { NextRequest, NextResponse } from "next/server";

const PAYNOW_START_URL = process.env.PAYNOW_START_URL || "https://royaltyfuneral.com/securepay/paynow/start";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = body?.client;
    const policy = body?.policy;
    const clientEmail = body?.clientEmail;

    if (!client || !policy) {
      return NextResponse.json(
        { success: false, error: "Client and policy details are required." },
        { status: 400 }
      );
    }

    const premiumAmount = Number(policy.premiumAmount || 0);
    const isInsured = String(client.Insured ?? client.insured ?? "").trim().toLowerCase() === "yes";
    const insuranceAmount = isInsured ? 1 : 0;
    const totalAmount = premiumAmount + insuranceAmount;

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "A valid payment amount is required." },
        { status: 400 }
      );
    }

    const items: Array<{ name: string; amount: number }> = [
      premiumAmount > 0 ? { name: `Policy Premium (Ref: ${policy.policyNumber})`, amount: premiumAmount } : null,
      insuranceAmount > 0 ? { name: `Insurance (Ref: ${policy.policyNumber})`, amount: insuranceAmount } : null,
    ].filter((item): item is { name: string; amount: number } => item !== null);

    const paynowResponse = await fetch(PAYNOW_START_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        reference: policy.policyNumber,
        authEmail: clientEmail || client.email,
        clientEmail: clientEmail || client.email,
        client: {
          clientId: client.clientId,
          clientNumber: client.clientNumber,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone,
        },
        policy: {
          policyId: policy.policyId,
          policyNumber: policy.policyNumber,
          planType: policy.planType,
          paymentFrequency: policy.paymentFrequency,
          status: policy.status,
        },
        amount: {
          premiumAmount,
          insuranceAmount,
          totalAmount,
        },
        items,
      }),
    });

    const result = await paynowResponse.json().catch(() => null);

    if (!paynowResponse.ok || !result?.success) {
      return NextResponse.json(
        {
          success: false,
          error: result?.error || "Unable to start the Paynow payment.",
        },
        { status: paynowResponse.status || 502 }
      );
    }

    if (!result.redirectUrl) {
      return NextResponse.json(
        { success: false, error: "Paynow did not return a redirect URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
      pollUrl: result.pollUrl || null,
      reference: result.reference || policy.policyNumber,
      items,
      amount: {
        premiumAmount,
        insuranceAmount,
        totalAmount,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start the Paynow payment.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
