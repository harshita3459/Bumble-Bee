const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/api/create-ekqr-order', async (req, res) => {
    const { client_txn_id, amount, p_info, customer_name, customer_email, customer_mobile, redirect_url } = req.body;

    try {
        const response = await axios.post('https://api.ekqr.in/api/create_order', {
            client_txn_id,
            amount,
            p_info,
            customer_name,
            customer_email,
            customer_mobile,
            redirect_url,
            api_key: "bbcf1187-c357-49cd-8345-8997fa6cff4c",
        });

        res.json(response.data);
    } catch (error) {
        console.error('Payment API Error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router;