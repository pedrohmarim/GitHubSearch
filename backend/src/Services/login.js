const jwt = require('jsonwebtoken');

const db = [{ username: 'admin', pass: 'password' }]

const auth = async ({ username, password }) => {

    const user = db.find(user => user.username === username && user.pass === password)

    if (user) {

        const token = await jwt.sign({ username }, 'config')

        return {
            token, user
        }
    }
}

module.exports = {
    auth
};
