const express = require('express');
const mongoose = require('mongoose'); const cors = require('cors');

const app = express();
const port = 5000; //use the same port number in the frontend also while sending the data Or fetching the data.
app.use(cors()); app.use(express.json());


// MongoDB Connection you will get your connection string in the mongoose shell open that And copy the connection string from there and paste it below also write you db name.. 
mongoose.connect('mongodb://localhost:27017/vite_emp_sampledata', { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); db.once('open', () => {
console.log('Connected to MongoDB');
});

// Define a MongoDB Schema . This is the schema for the userData.
const formDataSchema = new mongoose.Schema({
name: String, email: String, age: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Save data to MongoDB
app.post('/save_data', async (req, res) => { const { name, email, age } = req.body;
try {
const formData = new FormData({ name, email, age }); await formData.save();
res.status(200).json({ message: 'Data saved successfully!' });
} catch (error) { console.error(error);
res.status(500).json({ error: 'Failed to save data.' });
}
});

// Fetch data from MongoDB 
app.get('/get_data', async (req, res) => { try {
const data = await FormData.find(); res.status(200).json(data);
} catch (error) { console.error(error);
res.status(500).json({ error: 'Failed to fetch data.' });
}
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
