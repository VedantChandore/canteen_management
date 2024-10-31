const MenuItem = require('../models/MenuItem');

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newItem = new MenuItem({ name, price, description });
        await newItem.save();
        res.status(201).json({ message: 'Menu item added', newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu item', error });
    }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await MenuItem.findById(id);
        if (!item) return res.status(404).json({ message: 'Menu item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu item', error });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item updated', updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item', error });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
};
