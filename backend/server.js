const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/get-quote', (req, res) => {
  try {
    const { layers, thickness, boardDimensions, quantity, deliveryTime } = req.body;

    // Calculate costs
    const layerCost = 50; // $50 per layer
    const thicknessCost = 10; // $10 per mm
    const boardDimensionsCost = 0.05; // $0.05 per square mm
    const quantityCost = 1; // $1 per unit
    const rushFee = 20; // $20 per day if delivery time is less than 7 days

    const [width, height] = boardDimensions.split('x').map(Number);
    const area = width * height;

    let estimatedCost = (layers * layerCost) +
                        (thickness * thicknessCost) +
                        (area * boardDimensionsCost) +
                        (quantity * quantityCost);

    if (deliveryTime < 7) {
      estimatedCost += (7 - deliveryTime) * rushFee;
    }

    res.json({
      layers,
      thickness,
      boardDimensions,
      quantity,
      deliveryTime,
      estimatedCost: estimatedCost.toFixed(2)
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
