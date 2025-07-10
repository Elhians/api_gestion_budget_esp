require('dotenv').config();
const app = require('./app');
const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
