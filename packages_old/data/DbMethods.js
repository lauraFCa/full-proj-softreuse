/**
 * Class representing generic methods to interact with data from the database.
**/
export default class DbMethods {

    dbParams = {};
    
    /**
     * Set the parameters to connect to the database.
     * @param {Object} dbParams - The parameters to connect to the database. IE: { host: 'localhost', port: '3306', user
     */
    setDbParams = (dbParams) => {
        this.dbParams = dbParams;
    }

    /**
     * Returns the parameters to connect to the database.
     * @returns {Object} - The parameters to connect to the database.
     */
    getDbParams = () => this.dbParams;

    /**
     * Runs a SQL query on the database.
     * @param {string} sql - The SQL query to execute.
     * @returns {Promise<Array>} - A promise that resolves to the query results.
     */
    runQuery = async (sql) => {
        const connection = await mysql.createConnection(this.dbParams);

        try {
            const [results, fields] = await connection.query(sql);
            console.log('Query executed successfully!');
            return results;
        } catch (e) {
            console.log('Error executing the query:', e);
        }
    };


    /**
     * Builds the query to get the Data.
     * @param {Array<string>} paramsToSelect - The parameter for query to select Data. IE: ['id', 'name', 'email']
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Array<object>} whereParams - The parameter for query to filter the select Data. IE: 
     *  [[{id: 1, junction: 'AND'}, {name: 'test', junction: 'OR'}], [{name: '2test2', junction: 'OR'}, {email: 'fake@mail', junction: 'AND NOT'}]
     * @returns {string} - The query to get the Data.
     */
    buildGetDataQuery = (table, paramsToSelect, whereParams) => {
        if (paramsToSelect && table && whereParams) {
            let selectQuery = `SELECT ${paramsToSelect.join(', ')} FROM ${table}`;
            if (whereParams.length > 0) {
                const whereQ = [];
                whereParams.forEach(paramList => {
                    paramList.forEach(param => {
                        const keys = Object.keys(param);
                        let elementStr = "";
                        console.log(keys)
                        keys.forEach(key => {
                            if (key != 'junction') {
                                elementStr += `${param['junction']} ${key} = '${param[key]}'`;
                            }
                        });
                        whereQ.push(elementStr);
                    });
                });
                console.log(whereQ);
                selectQuery += ` WHERE ${whereQ.join(' ')}`.replace("WHERE AND", "WHERE").replace("WHERE OR", "WHERE");
            }

            selectQuery += ';';

            return [selectQuery];
        } else {
            return [false, "Missing parameters (all fields are mandatory to get a Data)"]
        }
    }

    /**
     * Get Data based on the provided parameters.
     * @async
     * @param {Array<string>} paramsToSelect - The parameter for query to select Data. IE: ['id', 'name', 'email']
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Array<object>} whereParams - The parameter for query to filter the select Data. IE: 
     *  [[{id: 1, junction: 'AND'}, {name: 'test', junction: 'OR'}], [{name: '2test2', junction: 'OR'}, {email: 'fake@mail', junction: 'AND NOT'}]
     * @returns {string} - The query to get the Data.
     */
    getData = async (table, paramsToSelect, whereParams) => {
        const selectQuery = this.buildGetDataQuery(table, paramsToSelect, whereParams);
        if (selectQuery[0]) {
            const Data = await this.runQuery(selectQuery[0]);
            return Data;
        } else {
            return selectQuery[1];
        }
    }

    /**
     * Builds the query to insert the Data.
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Object} paramsToInsert - The parameter to insert into talbe IE: { name: 'my name', email: 'my email', age: 23, isChild: true };
     * @returns {Array} - The query to insert the Data, or an error message. IE: ['insert into my_table...'] or [false, 'error message']
     */
    buildCreateDataQuery = (table, paramsToInsert) => {
        if (table && paramsToInsert) {
            const keys = Object.keys(paramsToInsert);
            const values = Object.values(paramsToInsert);
            const queryValues = values.map(value => {
                return typeof value === 'string' ? `'${value}'` : value;
            });
            const insertQuery = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${queryValues.join(', ')});`;

            return [insertQuery];
        } else {
            return [false, 'Missing parameters (all fields are mandatory to save a Data)'];
        }
    }


    /**
     * Create a new Data in database.
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Object} paramsToInsert - The parameter to insert into talbe IE: { name: 'my name', email: 'my email', age: 23, isChild: true };
     * @returns {Promise<Object>} - The result of the Data creation.
     */
    createData = async (table, paramsToInsert) => {
        const insertQuery = this.buildCreateDataQuery(table, paramsToInsert);
        if (insertQuery[0]) {
            const result = await this.runQuery(insertQuery[0]);
            return result;
        } else {
            return [404, 'Missing parameters (all fields are mandatory to save the Data)'];
        }
    }

    /**
     * Builds the query to update an existing Data.
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Object} paramToUpdate - The parameter to be updated and the new value. IE: { quantity: 2 }
     * @param {Array<object>} whereParam - Where the update should be applied. IE: 
     *  [[{id: 1, junction: 'AND'}, {name: 'test', junction: 'OR'}], [{name: '2test2', junction: 'OR'}, {email: 'fake@mail', junction: 'AND NOT'}]
     * @returns {Array} - The query to update the Data, or an error message. IE: ['update my_table...'] or [false, 'error message']
     */
    buildUpdateDataQuery = (table, paramToUpdate, whereParams) => {
        if (table && paramToUpdate) {
            const values = Object.values(paramToUpdate);
            if (values.length === 0) return [false, "paramToUpdate should have a single key-value pair"];
            if (values.length > 1) return [false, "paramToUpdate should have only one key-value pair"];

            const queryValues = values.map(value => {
                return typeof value === 'string' ? `'${value}'` : value;
            });
            let query = `UPDATE ${table} SET ${Object.keys(paramToUpdate)} = ${queryValues}`;
            if (whereParams.length > 0) {
                const whereQ = [];
                whereParams.forEach(paramList => {
                    paramList.forEach(param => {
                        const keys = Object.keys(param);
                        let elementStr = "";
                        keys.forEach(key => {
                            if (key != 'junction') {
                                elementStr += `${param['junction']} ${key} = '${param[key]}'`;
                            }
                        });
                        whereQ.push(elementStr);
                    });
                    query += ` WHERE ${whereQ.join(' ')}`.replace("WHERE AND", "WHERE").replace("WHERE OR", "WHERE");
                });
            }
            query += ';';

            return [query];
        } else {
            return [false, "Missing parameters (at least one field is mandatory to updatethe Data)"];
        }
    }


    /**
     * Update an existing new Data.
     * @param {string} table - The table to query. IE: 'my_table'
     * @param {Object} paramToUpdate - The parameter to be updated and the new value. IE: { quantity: 2 }
     * @param {Array<object>} whereParam - Where the update should be applied. IE: 
     *  [[{id: 1, junction: 'AND'}, {name: 'test', junction: 'OR'}], [{name: '2test2', junction: 'OR'}, {email: 'fake@mail', junction: 'AND NOT'}]
     * @returns {Promise<Object>} - The result of the Data change.
     */
    updateData = async (table, paramToUpdate, whereParam) => {
        const query = this.buildUpdateDataQuery(table, paramToUpdate, whereParam);
        if (query[0]) {
            const result = await this.runQuery(query[0]);
            return result;
        } else {
            return [404, query[1]];
        }
    }


    /**
     * Delete a registered Data.
     * @param {number} id - The id of the Data to delete
     * @param {string} table - The table to delete the data
     * @returns {Promise<Object>} - The result of the Data deletion.
     */
    deleteData = async (id, table) => {
        if (id && table) {
            const exists = await this.getData(id, table);
            if (exists) {
                const query = `DELETE FROM ${table} WHERE id = ${id}`;
                const result = await this.runQuery(query);
                return result;
            } else {
                return [404, `Data with Id = ${id} not found`];
            }
        } else {
            return [404, "Missing parameters (all fields are mandatory to delete a Data)"];
        }
    }
}