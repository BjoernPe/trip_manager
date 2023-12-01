const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/exchange-rate/:currency', async (req, res) => {
  const currency = req.params.currency.toUpperCase();

  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest.json`);
    const exchangeRate = response.data.rates[currency];

    if (exchangeRate) {
      res.json({ exchangeRate });
    } else {
      res.status(404).json({ error: 'Exchange rate not available for the selected currency.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
