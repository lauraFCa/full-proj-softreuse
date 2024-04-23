import Base from './dbBase.js';

export default class SalesMethods extends Base {

    /**
     * Class representing sales methods.
     * @extends Base
     */

    /**
     * Get sales based on the provided parameters.
     * @param {Object} params - The parameters for filtering the sales.
     * @param {number} params.product_id - The product ID to filter by.
     * @param {number} params.quantity - The quantity to filter by.
     * @param {number} params.total - The total to filter by.
     * @returns {Promise<Array>} - The sales matching the provided parameters.
     */
    getSales = async (params) => {
        let query = "SELECT * FROM sales as sal";
        const joinProduct = " INNER JOIN products as prod ON sal.product_id = prod.id";

        if (params && (params.product_id || params.quantity || params.total)) {
            query += " WHERE";

            let conditions = [];

            if (params.quantity) {
                conditions.push(`quantity = ${params.quantity}`);
            }
            if (params.total) {
                conditions.push(`total = ${params.total}`);
            }

            if (params.product_id) {
                conditions.push(`product_id = ${params.product_id}`);
            }

            query += ` ${conditions.join(' AND ')}`;
        }

        query += joinProduct;
        console.log('query:', query);
        const sales = await this.runQuery(query);
        return sales;
    }

    /**
     * Create a new sale.
     * @param {Object} params - The parameters for creating a sale.
     * @param {number} params.product_id - The product ID of the sale.
     * @param {number} params.quantity - The quantity of the sale.
     * @param {number} params.total - The total amount of the sale.
     * @returns {Promise<Object>} - The result of the sale creation.
     */
    createSale = async (params) => {
        if (params && params.product_id && params.quantity && params.total) {
            const query = `INSERT INTO sales (product_id, quantity, total) VALUES (${params.product_id}, ${params.quantity}, ${params.total})`;
            const result = await this.runQuery(query);
            return result;
        } else {
            return [404, 'Missing parameters (all fields are mandatory to save a sale)'];
        }
    }

    /**
     * Update an existing new sale.
     * @param {Object} params - The parameters for creating a sale.
     * @param {number} params.product_id - The product ID of the sale.
     * @param {number} params.quantity - The quantity of the sale.
     * @param {number} params.total - The total amount of the sale.
     * @returns {Promise<Object>} - The result of the sale change.
     */
    updateSale = async (id, params) => {
        if (params && (params.product_id || params.quantity || params.total)) {
            let query;
            if (params.product_id) {
                query += `UPDATE sales SET product_id = ${params.product_id} WHERE id = ${id};   `;
            }
            if (params.quantity) {
                query += `UPDATE sales SET quantity = ${params.quantity} WHERE id = ${id};    `;
            }
            if (params.total) {
                query += `UPDATE sales SET total = ${params.total} WHERE id = ${id}; `;
            }
            const result = await this.runQuery(query);
            return result;
        } else {
            return [404, 'Missing parameters (at least one field is mandatory to update a sale)'];
        }
    }

    /**
     * Delete an new sale.
     * @param {Object} params - The parameters for creating a sale.
     * @param {number} params.product_id - The product ID of the sale.
     * @param {number} params.quantity - The quantity of the sale.
     * @param {number} params.total - The total amount of the sale.
     * @returns {Promise<Object>} - The result of the sale creation.
     */
    deleteSale = async (id) => {
        const exists = await this.getSales({ id });
        if (exists) {
            const query = `DELETE FROM sales WHERE id = ${id}`;
            const result = await this.runQuery(query);
            return result;
        } else {
            return [404, `Sale with Id = ${id} not found`];
        }
    }
}