function isUser(req, res, next) {
    if (req.session?.email) {
        return next();
    }
    return res.status(401).render('error', {error: 'Authentication error'});
};

function isAdmin(req, res, next) {
    if (req.session?.isAdmin) {
        return next();
    }
    return res.status(403).render('error', {error: 'Authorization error'});
};

export default {isUser, isAdmin};