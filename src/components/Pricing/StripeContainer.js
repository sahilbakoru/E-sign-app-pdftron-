import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KQuSuSBe5QxKGr0eblq7KKGVkR8hlPBviRYHv3mj7bSGib7m8Typ1zDPMsPfswk6CrmXB8W49BgnliUei0PhPmK00xbD4TFo1"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
