import mysql from 'mysql2/promise';


/**
 * Represents a base class for database operations.
 */
export default class Base {
    
    /**
     * Runs a SQL query on the database.
     * @param {string} sql - The SQL query to execute.
     * @returns {Promise<Array>} - A promise that resolves to the query results.
     */
    runQuery = async (sql) => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'reutilizacaoapp',
        });

        try {
            const [results, fields] = await connection.query(sql);
            console.log('Query executed successfully!');
            return results;
        } catch (e) {
            console.log('Error executing the query:', e);
        }
    };
}