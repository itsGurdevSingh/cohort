const isUserLogedIn = require('../middlewares/auth.middleware.js')

const getHomePage = (req,res) => {
    res.render('home')
}

module.exports = {
    getHomePage
}