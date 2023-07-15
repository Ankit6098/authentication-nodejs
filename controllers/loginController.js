module.exports.login = function(req, res) {
    res.render('login', {
        title: 'NodeJS Authentication'
    });
}