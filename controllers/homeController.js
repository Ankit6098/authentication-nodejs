module.exports.home = function(req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/user/welcome');
    // }
    return res.render('user_sign_in', {
        title: 'sign in'
    });
}