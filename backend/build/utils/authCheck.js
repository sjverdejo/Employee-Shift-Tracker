//To protect routes with authenticated requirement
const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/auth/login');
};
export default authCheck;
