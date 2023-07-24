import express from 'express';

import newsRoutes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json("Welcome to the Climate News API.");
})

app.use('/news', newsRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));