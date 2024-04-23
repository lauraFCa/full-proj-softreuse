import SalesMethods from '../database/dbSales.js';
import { authenticateToken } from './authenticate.js';

import express from 'express';
const router = express.Router();

const db = new SalesMethods();

/**
 * GET /sales
 * Retrieves all sales from the database.
 *
 * @name Get Sales
 * @route {GET} /sales
 * @authentication This route requires a valid access token to be provided in the request header.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The list of sales.
 * @throws {Error} If there is an error executing the database query.
 */
router.get('/', authenticateToken, async (req, res) => {
    console.log('req.user:', req['userId']);
    if (req['userId']) {

        try {
            const sales = await db.getSales();
            console.log(sales);

            const salesObj = {
                product:{
                    name: sales[0]['name'],
                    price: sales[0]['price'],
                    category: sales[0]['category'],
                },
                quantity_sold: sales[0]['quantity'],
                total: sales[0]['total'],
            }
            res.json(salesObj);
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {
        res.status(401).json({ error: 'Access denied - No token provided' });
    }
});

/**
 * POST /sales
 * Creates a new sale in the database.
 *
 * @name Create Sale
 * @route {POST} /sales
 * @authentication This route requires a valid access token to be provided in the request header.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly created sale.
 * @throws {Error} If there is an error executing the database query.
 */
router.post('/', authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const inserted = await db.createSale({ product_id: req.body.product_id, quantity: req.body.quantity, total: req.body.total });
            res.json(inserted);
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        console.log('Access denied - Invalid token');
        res.status(401).json({ error: 'Access denied' });
    }
});

/**
 * PUT /sales/:id
 * Updates a sale in the database.
 *
 * @name Update Sale
 * @route {PUT} /sales/:id
 * @authentication This route requires a valid access token to be provided in the request header.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated sale.
 * @throws {Error} If there is an error executing the database query.
 */
router.put('/', authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const updated = await db.updateSale(req.params.id, req.body);
            res.json(updated);
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        console.log('Access denied - Invalid token');
        res.status(401).json({ error: 'Access denied' });
    }
});

/**
 * DELETE /sales/:id
 * Deletes a sale from the database.
 *
 * @name Delete Sale
 * @route {DELETE} /sales/:id
 * @authentication This route requires a valid access token to be provided in the request header.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The success message if the sale is deleted, or an error message if the sale is not found.
 * @throws {Error} If there is an error executing the database query.
 */
router.delete('/', authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const deleted = await db.deleteSale(req.params.id);
            if (deleted.lenght === 0) {
                return res.status(404).json({ message: 'Sale not found' });
            }
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        console.log('Access denied - Invalid token');
        res.status(401).json({ error: 'Access denied' });
    }
});

export default router;