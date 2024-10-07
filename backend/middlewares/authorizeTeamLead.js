module.exports = (req, res, next) => {
    const user = req.user;

    if (user && user.role === "team lead") {
        return next();
    } else {
        return res.status(403).json({ message: "Only team leads are allowed to create projects." });
    }
};