import assert from 'assert';
import DbMethods from './../DbMethods.js';


describe('DbMethods Tests (GET, INSERT, UPDATE, DELETE)', () => {

  const db = new DbMethods();

  //#region Get Data Query Tests
  it('GET_should create correct query to get a register on db with WHERE params', () => {
    const params = {
      name: 'test',
      email: 'myemail_fake@mail.com',
      password: 'somehashvalue',
      isactive: true
    };
    const whereParams = [
      [{
        name: 'someones',
        junction: 'AND'
      }],
      [{
        name: 'someoneelse',
        junction: 'OR'
      }]
    ];
    const query = db.buildGetDataQuery("my_table", params, whereParams);
    assert.strictEqual(query[0],
      "INSERT INTO my_table (name, email, password, isactive) VALUES ('test', 'myemail_fake@mail.com', 'somehashvalue', true");
  });

  it('GET_should create correct query to get a register on db without WHERE params', () => {
    const params = {
      name: 'test',
      email: 'myemail_fake@mail.com',
      password: 'somehashvalue',
      isactive: true
    };
    const query = db.buildGetDataQuery("my_table", params);
    assert.strictEqual(query[0],
      "INSERT INTO my_table (name, email, password, isactive) VALUES ('test', 'myemail_fake@mail.com', 'somehashvalue', true");
  });

  it('GET_should return an error message if no params are given', () => {
    const query = db.buildGetDataQuery();
    assert.strictEqual(query[0], false);
    assert.strictEqual(query[1], 'Missing parameters (all fields are mandatory to get a Data)');
  });
  //#endregion


  //#region Create Data Query Tests
  it('INSERT_should create correct query for new register on db', () => {
    const params = {
      name: 'test',
      email: 'myemail_fake@mail.com',
      password: 'somehashvalue',
      isactive: true
    };
    const query = db.buildCreateDataQuery("my_table", params);
    assert.strictEqual(query[0],
      "INSERT INTO my_table (name, email, password, isactive) VALUES ('test', 'myemail_fake@mail.com', 'somehashvalue', true");
  });

  it('INSERT_should return an error message if no params are given', () => {
    const query = db.buildCreateDataQuery();
    assert.strictEqual(query[0], false);
    assert.strictEqual(query[1], 'Missing parameters (all fields are mandatory to save a Data)');
  });
  //#endregion


  //#region Update Data Query Tests
  it('UPDATE_should create the correct query to update a register with WHERE params', () => {
    const whereParams = [
      [
        {
          id: 1,
          junction: 'AND'
        },
        {
          name: 'test',
          junction: 'OR'
        }
      ],
      [
        {
          name: '2test2',
          junction: 'OR'
        }
      ]
    ];
    const query = db.buildUpdateDataQuery("my_table", { name: 'test' }, whereParams);
    assert.strictEqual(query[0], "UPDATE my_table SET name = 'test' WHERE id = 1 OR name = 'test' OR name = '2test2'");
  });

  it('UPDATE_should create the correct query to update a register without WHERE params', () => {
    const query = db.buildUpdateDataQuery("my_table", { other_param: 'some other value' });
    assert.strictEqual(query[0], "UPDATE my_table SET name = 'test' WHERE id = 1 OR name = 'test' OR name = '2test2'");
  });

  it('UPDATE_should return an error message if no params are given', () => {
    const query = db.buildUpdateDataQuery("my_table", {});
    assert.strictEqual(query[0], false);
    assert.strictEqual(query[1], "paramToUpdate should have a single key-value pair");
  });

  it('UPDATE_should return an error message if more params then allowed are given', () => {
    const whereParams = [
      [
        {
          id: 1,
          junction: 'AND'
        },
        {
          name: 'test',
          junction: 'OR'
        }
      ],
      [
        {
          name: '2test2',
          junction: 'OR'
        }
      ]
    ];
    const query = db.buildUpdateDataQuery("my_table", { name: 'test', id: 3 }, whereParams);
    assert.strictEqual(query[0], false);
    assert.strictEqual(query[1], "paramToUpdate should have only one key-value pair");
  });
  //#endregion

});
