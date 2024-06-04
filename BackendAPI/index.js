const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./src/routes/productRoutes');

app.use(express.json());

app.use('/categories', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
