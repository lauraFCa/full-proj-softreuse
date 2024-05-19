import mysql from 'mysql2/promise'

/**
 * Represents a base class for database operations.
 */
export default class Base {
    connParams;

    setConnParams = (params) => {
        this.connParams = params;
    }

    /**
     * Runs a SQL query on the database.
     * @param {string} sql - The SQL query to execute.
     * @returns {Promise<Array>} - A promise that resolves to the query results.
     */
    runQuery = async (sql) => {
        if(!this.connParams) {
            throw new Error('Connection parameters not set!');
        }
        
        const connection = await mysql.createConnection(this.connParams);
    try {
      const [results, fields] = await connection.query(sql)
      console.log('fields:', fields)
      console.log('Query executed successfully!')
      return results
    } catch (e) {
      console.log('Error executing the query:', e)
    }
  }
}
