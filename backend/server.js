const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/get-quote', upload.single('gerberFile'), (req, res) => {
  const {
    layers,
    thickness,
    solderMaskColor,
    surfaceFinish,
    boardDimensions,
    quantity,
    deliveryTime,
  } = req.body;

  const gerberFile = req.file;

  // Parse board dimensions from string (e.g., "100x200")
  const [boardWidth, boardHeight] = boardDimensions.split('x').map(Number);

  // Calculate cost (this is a simplified example)
  const baseCost = boardWidth * boardHeight * layers * thickness * 0.1;
  const colorCost = solderMaskColor.toLowerCase() !== 'green' ? 10 : 0;
  const finishCost = surfaceFinish.toLowerCase() !== 'hasl' ? 15 : 0;
  const quantityDiscount = Math.max(0, (quantity - 100) * 0.05);
  const deliverySurcharge = Math.max(0, (10 - deliveryTime) * 5);
  const totalCost = baseCost + colorCost + finishCost - quantityDiscount + deliverySurcharge;

  // Clean up the uploaded file
  fs.unlinkSync(path.join(__dirname, gerberFile.path));

  res.json({ price: totalCost });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
