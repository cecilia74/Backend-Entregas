
import passport from 'passport';
import express from 'express';
import { isUser } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/auth.js";

export const authRouter = express.Router();
authRouter.get('/session', (req, res) => {
    return res.send(JSON.stringify(req.session));
});


authRouter.get('/login', async (req, res) => {
    res.render("login");
});

authRouter.get('/register', async (req, res) => {
    res.render("register");
});

authRouter.post("/login", passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, };

    return res.redirect('/api/products');
});

authRouter.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, isAdmin: req.user.isAdmin };

    return res.json({ msg: 'ok', payload: req.user });
});

authRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
});

authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        return res.status(500).render('error', {error: 'session couldnt be closed'});
    }
        return res.redirect('/auth/login');
    });
});


authRouter.get('/profile', isUser, (req, res) => {
    const user = {email: req.session.email, isAdmin: req.session.isAdmin};
    return res.render('profile', {user: user});
});


authRouter.get('/administration', isUser, isAdmin, (req, res) => {
    return res.send('Data');
});