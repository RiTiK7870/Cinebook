const axios = require("axios");
const { PHONEPE_BASE_URL, PHONEPE_API_KEY } = process.env;

async function createTxn(amount, orderId) {
  const resp = await axios.post(
    `${PHONEPE_BASE_URL}/pg/v1/pay`,
    {
      amount,
      orderId,
    },
    {
      headers: { "X-API-KEY": PHONEPE_API_KEY },
    }
  );
  return resp.data;
}

module.exports = { createTxn };
