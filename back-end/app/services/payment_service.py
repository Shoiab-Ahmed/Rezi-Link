import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

client = razorpay.Client(auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET")))

def create_razorpay_order(amount):
    try:
        # Ensure it's converted properly to paise (int)
        amount = int(float(amount) * 100)

        order = client.order.create({
            "amount": amount,  # must be in paise
            "currency": "INR",
            "payment_capture": "1"
        })
        return order
    except Exception as e:
        print("❌ Razorpay order creation failed:", e)
        raise e


def verify_payment_signature(data):
    try:
        client.utility.verify_payment_signature(data)
        return True
    except razorpay.errors.SignatureVerificationError:
        return False
