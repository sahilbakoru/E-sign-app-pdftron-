import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_live_51J3MAQJDXziomyvFcf4CGyJswz4LULVe4jO9FMJGg4QxAsEw0zd3IjYvQOSeRqmU5ob43QS8jfjxR2p2zbqDgWlt00UU9jDjvc"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
