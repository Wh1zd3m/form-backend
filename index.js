const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(cors());// Allow React to connect
app.use(express.json());//Parse JSON from form


//Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connect to MongoDB Atlas!'))
.catch(err => console.error('Connection failed:', err));


//Schema for form data
const formSchema = new moongoose.Schema({
    name: {type: String, required: true },
    email: { type: String, required: true },
});

const FormEntry = mongoose.model('FormEntry', formSchema);


//Route to handle form submission
app.post('/api/submit/', async (requestAnimationFrame,res) => {
    const { name, email } = req.body;
    try {
        const newEntry = new FormEntry({ name, email });
        await newEntry.save();
        res.status(201).json({ message: 'Data saved-well done!', data: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', err});
    }
});


//Start server
app.listen(port, () => console.log(`Server running on port ${port}`));