import express from 'express';
import Authentication from '../../packages/authentication/Authentication.js';
import { readFileSync } from "fs";
const variables = JSON.parse(readFileSync("variables.json"));

import SalesMethods from './../database/dbSales.js';


const auth = new Authentication();
auth.setSecretKey(variables['secretKey']);

const db = new SalesMethods();
db.setConnParams(variables['database']);

const salesRouter = express.Router();


/**
 * Retrieves all sales from the database.
 * @route GET /sales
 * @authentication This route requires a valid access token to be provided in the request header.
 * @async
 * @param {Authorization} req.headers - The access token to authenticate the user.
 * @returns {Object} A list of sales objects.
 */
salesRouter.get('/', auth.authenticateToken, async (req, res) => {
    console.log('req.user:', req['userId']);
    if (req['userId']) {

        try {
            const sales = await db.getSales();
            console.log(sales);

            const salesObj = {
                product: {
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
    res.status(401).json({ error: 'Access denied - No token provided' })
  }
})

/**
 * Creates a new sale in the database.
 *
 * @route POST /sales
 * @authentication This route requires a valid access token to be provided in the request header.
 * @async
 * @param {Authorization} req.headers - The access token to authenticate the user.
 * @returns {Object} The newly created sale object.
 */
salesRouter.post('/', auth.authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const inserted = await db.createSale({ product_id: req.body.product_id, quantity: req.body.quantity, total: req.body.total });
            res.json(inserted);
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
  } else {
    console.log('Access denied - Invalid token')
    res.status(401).json({ error: 'Access denied' })
  }
})

/**
 * Updates a sale in the database.
 *
 * @route PUT /sales/:id
 * @authentication This route requires a valid access token to be provided in the request header.
 * @async
 * @param {Authorization} req.headers - The access token to authenticate the user.
 * @returns {Object} The updated sale object.
 */
salesRouter.put('/', auth.authenticateToken, async (req, res) => {
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
})

/**
 * Deletes a sale from the database.
 *
 * @route DELETE /sales/:id
 * @authentication This route requires a valid access token to be provided in the request header.
 * @async
 * @param {Authorization} req.headers - The access token to authenticate the user. * 
 * @returns {string} The success message if the sale is deleted, or an error message if the sale is not found.
 */
salesRouter.delete('/', auth.authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const deleted = await db.deleteSale(req.params.id);
            if (deleted.lenght === 0) {
                return res.status(404).json({ message: 'Sale not found' });
            } else {
                res.status(200).json({ message: 'Sale deleted' });
            }
        } catch {
            console.log('Error executing database query:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        console.log('Access denied - Invalid token');
        res.status(401).json({ error: 'Access denied' });
  }
})


export { salesRouter };

