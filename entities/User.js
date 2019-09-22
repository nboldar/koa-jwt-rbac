import passwordHash from 'password-hash'
import db from '../db/db'
import randomstring from 'randomstring'


export default class User {

    constructor(data) {
        this.email = data.email;
        this.password = passwordHash.generate(data.password, ['md5', 16, 2]);
        this.role = data.role;
    }

    static getTableName() {
        return 'users';
    }

    static async addUser(data, emailToken) {

        try {
            return await db(this.getTableName()).returning(['id']).insert([
                {
                    email: data.email,
                    password_hash: passwordHash.generate(data.password, ['md5', 16, 2]),
                    email_token: emailToken,
                    reset_password_token: randomstring.generate()
                }
            ]);
        } catch (e) {
            console.log('Insert new user in db crashed with error ' + e);
            throw new Error(e);
        }
    }

    static async getAllUsers() {
        try {
            return await db(this.getTableName()).select('*');
        } catch (e) {
            console.log('Getting all users from db crashed with error ' + e);
            throw new Error(e);
        }
    }

    static async getUserById(id) {
        try {
            return await db(this.getTableName()).where({id: id});
        } catch (e) {
            console.log(`Getting user with id =${id}  from db crashed with error ` + e);
            throw new Error(e);
        }
    }

    static async getUserByEmail(email) {
        try {
            return await db(this.getTableName()).where({email: email});
        } catch (e) {
            console.log(`Getting user with email =${email}  from db crashed with error ` + e);
            throw new Error(e);
        }
    }

}
