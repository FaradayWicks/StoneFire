// import express from 'express'
// import bodyParser from 'body-parser'
// import db from './config/db.js'
// import cors from 'cors'
// import session from 'express-session';
// const app = express()

// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// app.use(cors())

// app.get('/', (req, res) => {
//     res.send('hello world')
// })


// app.get('/api/getProducts', (req, res) => {
//     const query = "SELECT * FROM products;"

//     db.query(query, (err, results) => {
//         if (err) throw err
//         res.send(results)
//     })
// })

// // const PORT = process.env.PORT || 5000
// const PORT = 5000
// app.listen(PORT, console.log(`Server is running on port ${PORT}`))



import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Products from './models/products.js';

const app = express();
app.use(cors());

// MongoDB Atlas connection URL
const url = 'mongodb+srv://StoneFireUser:StoneFireUser@cluster0.hwimmp7.mongodb.net/?retryWrites=true&w=majority';

// Database connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect to MongoDB Atlas
mongoose.connect(url, options);

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Event listener for connection errors
db.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1); // Exit process with error
});
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});
// Route to fetch products
app.get('/api/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
