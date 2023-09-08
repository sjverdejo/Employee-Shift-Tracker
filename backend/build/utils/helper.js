//check if user is missing a field
const validUser = (user) => {
    if ((user.is_admin !== null) && (user.password && user.fname && user.lname
        && user.dob && user.date_employed && user.email && user.phone)) {
        return true;
    }
    else {
        return false;
    }
};
export default { validUser };
