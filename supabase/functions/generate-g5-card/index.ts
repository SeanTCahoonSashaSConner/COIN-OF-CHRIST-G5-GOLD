// supabase/functions/generate-g5-card/index.ts
import { serve } from "https://deno.land"

const PASS2U_API_KEY = Deno.env.get('PASS2U_API_KEY')
const PASS2U_TEMPLATE_ID = Deno.env.get('PASS2U_TEMPLATE_ID')

serve(async (req) => {
  const { disciple_id, current_balance, status } = await req.json()

  // Prepare the data for the Country of Christ Loyalty Card
  const payload = {
    templateId: PASS2U_TEMPLATE_ID,
    barcodeValue: `G5-${disciple_id}`, // Unique barcode for scanning
    fieldValues: [
      { key: "balance", value: `${current_balance} G5 GOLD` },
      { key: "status", value: status },
      { key: "cycle_end", value: "33 Hours Remaining" }
    ]
  }

  const response = await fetch("https://pass2u.net", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${PASS2U_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })
})
