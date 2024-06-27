/*
      {
          product: 'Product name',
          category: 'Category name',
          price: 99.99,
          available: 5
      }
  */



import Base from './dbBase.js'

export default class ProductsMethods extends Base {
    /**
       * Class representing products methods.
       * @extends Base
       */

    /**
       * Get products based on the provided parameters.
       * @param {Object} params - The parameters for filtering the products.
       * @param {number} params.product_id - The product ID to filter by.
       * @param {number} params.quantity - The quantity to filter by.
       * @param {number} params.total - The total to filter by.
       * @returns {Promise<Array>} - The products matching the provided parameters.
       */
    getProducts = async (params) => {
        let query = 'SELECT * FROM products as sal'
        const joinProduct = ' INNER JOIN products as prod ON sal.product_id = prod.id'

        if (params && (params.product_id || params.quantity || params.total)) {
            query += ' WHERE'

            const conditions = []

            if (params.quantity) {
                conditions.push(`quantity = ${params.quantity}`)
            }
            if (params.total) {
                conditions.push(`total = ${params.total}`)
            }

            if (params.product_id) {
                conditions.push(`product_id = ${params.product_id}`)
            }

            query += ` ${conditions.join(' AND ')}`
        }

        query += joinProduct
        console.log('query:', query)
        const products = await this.runQuery(query)
        return products
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
            const query = `INSERT INTO products (product_id, quantity, total) VALUES (${params.product_id}, ${params.quantity}, ${params.total})`
            const result = await this.runQuery(query)
            return result
        } else {
            return [404, 'Missing parameters (all fields are mandatory to save a sale)']
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
            let query
            if (params.product_id) {
                query += `UPDATE products SET product_id = ${params.product_id} WHERE id = ${id};   `
            }
            if (params.quantity) {
                query += `UPDATE products SET quantity = ${params.quantity} WHERE id = ${id};    `
            }
            if (params.total) {
                query += `UPDATE products SET total = ${params.total} WHERE id = ${id}; `
            }
            const result = await this.runQuery(query)
            return result
        } else {
            return [404, 'Missing parameters (at least one field is mandatory to update a sale)']
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
        const exists = await this.getProducts({ id })
        if (exists) {
            const query = `DELETE FROM products WHERE id = ${id}`
            const result = await this.runQuery(query)
            return result
        } else {
            return [404, `Sale with Id = ${id} not found`]
        }
    }
}
