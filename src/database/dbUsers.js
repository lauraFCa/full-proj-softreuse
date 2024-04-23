import Base from './dbBase.js';

export default class LoginMethods extends Base {

    getUser = async (username) => {
        const user = await this.runQuery(`SELECT * FROM users WHERE username = '${username}'`);
        console.log('user:', user);
        return user;
    }

    createUser = async (username, password) => {
        await this.runQuery(`INSERT INTO users (isactive, username, password) VALUES (true, '${username}', '${password}');`);
    }

}