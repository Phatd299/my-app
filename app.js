const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000; // Static port, no dotenv needed

app.use(express.json());

// Mount routes
app.use('/', routes);
app.use('/health', routes);
app.use('/users', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
