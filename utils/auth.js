const withAuth = (req, res, next) => {
    if (!req.session.user_id) { // NOTE: Make sure that .user_id is the correct variable name.
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;