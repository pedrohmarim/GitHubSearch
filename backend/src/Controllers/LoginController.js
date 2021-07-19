const service = require('../Services/login');

class LoginController {

    constructor(loginService) {
        this.loginService = loginService;
    }

    login = (req, res) => {
        this.loginService
            .auth(req.body)
            .then((user) => (user ? res.json(user) : res.status(400).json({ message: 'Incorrect username or password' })))
            .catch(console.log);
    }
}

module.exports = new LoginController(service);