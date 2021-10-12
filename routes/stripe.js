const router = require('express').Router();
const stripe = require('stripe')(
  'sk_test_51JcK6BHQB4NtzLTtPjmLkgkkKMBaQ6rlIYVbrpXsYR6i2670w3o5jygHdgBaV3HsD3bINA55iN57c7FstD83wYZ700OwzzbTYi'
);

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd'
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log('stripe payment error');
      } else {
        console.log('stripe success');
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
