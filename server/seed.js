const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Adjust the path if necessary
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    seedMenuItems();
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Seed menu items
const seedMenuItems = async () => {
    const menuItems = [
        {
            name: "Vegetable Sandwich",
            price: 50,
            description: "A delicious vegetable sandwich with fresh ingredients.",
        },
        {
            name: "Chicken Biryani",
            price: 150,
            description: "Spicy and flavorful chicken biryani served with raita.",
        },
        {
            name: "Mix Veg and Chapati",
            price: 120,
            description: "Blend of different delicious vegetables.",
        },
        {
            name: "Mango Smoothie",
            price: 70,
            description: "A refreshing mango smoothie made with fresh mangoes.",
        },
        {
            name: "Paneer Tikka",
            price: 100,
            description: "Grilled paneer cubes marinated in spices.",
        },
    ];

    try {
        await MenuItem.deleteMany(); // Clear existing items
        await MenuItem.insertMany(menuItems); // Insert predefined items
        console.log('Menu items seeded successfully');
    } catch (error) {
        console.error('Error seeding menu items:', error);
    } finally {
        mongoose.connection.close();
    }
};
