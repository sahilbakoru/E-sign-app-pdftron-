require('dotenv').config()

const express = require('express')

const cors =require('cors')

const app = express()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000"
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1,{priceInCents:1000, name:"Top Up"}],
    [2,{priceInCents:100, name:"One Letter"}]
])

app.get("/sucr",(req,res)=>{
    res.send("ok")
    console.log("ok")
})

app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
          
        }),
        
        success_url: `${process.env.CLIENT_URL}/sucsess`,
        cancel_url: `${process.env.CLIENT_URL}/`,
      })
      if(session.payment_status==='unpaid'){
    console.log("unpiad")
    }
     res.json({ url: session.url})
      console.log("mystatus",session)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })


console .log("server is on port 3001")
app.listen(3001)
