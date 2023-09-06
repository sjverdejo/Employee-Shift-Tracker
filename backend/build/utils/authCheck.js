//To protect routes with authenticated requirement
const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
export default authCheck;
