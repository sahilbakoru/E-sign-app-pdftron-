import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51J3MAQJDXziomyvFzyg0G6xNojOvavDCyrurYgWGt8r7jiguU1ZT3Q4XNgrRF4KrqVGgqLMW1SvjW8bo1tva0tPB00y9m7nUVz"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
