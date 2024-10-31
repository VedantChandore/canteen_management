const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    addMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');

// Public route to view all menu items
router.get('/', getMenuItems);

// Public route to view a single menu item by ID
router.get('/:id', getMenuItemById);

// Protected route to add a new menu item
router.post('/', authMiddleware, addMenuItem);

// Protected route to update an existing menu item
router.put('/:id', authMiddleware, updateMenuItem);

// Protected route to delete a menu item
router.delete('/:id', authMiddleware, deleteMenuItem);

module.exports = router;
