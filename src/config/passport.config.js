import passport from "passport";
import local from 'passport-local';
import { createHash, isValidPassword } from "../config.js";
import { UserModel } from "../DAO/models/users.model.js";
import { CartServise } from "../services/carts.service.js";
import GitHubStrategy from 'passport-github2';
const LocalStrategy = local.Strategy;

export function iniPassport() {
    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).exec();
                if (!user) {
                    console.log('User Not Found with username (email) ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                try {
                    const {  age, email, firstName, lastName, role } = req.body;
                    const user = await UserModel.findOne({ email: username }).exec();
                    if (user) {
                        console.log('User already exists');
                        return done(null, false);
                    }

                    if (!password) {
                        throw new Error('No password provided');
                    }

                    const newUser = {
                        firstName,
                        lastName,
                        age,
                        email,
                        password: createHash(password),
                        cartID,
                        role,
                    };

                    const products = {};

                    try {
                        const userCreated = await UserModel.create(newUser);
                        try {
                            const cart = await CartServise.createCart(products);
                            userCreated.cartID = cart;
                            await userCreated.save();
                        } catch (error) {
                            console.log('Error actualizando el carrito:', error);
                            return done(error);
                        }
                        console.log('Registro existoso');

                        return done(null, userCreated);
                    } catch (error) {
                        console.log('Error creando el usuario:', error);
                        return done(error);
                    }
                } catch (e) {
                    console.log('Error en el registro');
                    return done(e);
                }
            }
        )
    );

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.28cd0955cf70d79f',
                clientSecret: '17dd71a1718b227b6e795b582ed49002df6497eb',
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accesToken, _, profile, done) => {
                console.log(profile);
                try {
                    const res = await fetch('https://api.github.com/user/emails', {
                        headers: {
                            Accept: 'application/vnd.github+json',
                            Authorization: 'Bearer ' + accesToken,
                            'X-Github-Api-Version': '2022-11-28',
                        },
                    });
                    const emails = await res.json();
                    const emailDetail = emails.find(email => email.verified === true);

                    if (!emailDetail) {
                        return done(new Error('cannot get a valid email for this user'));
                    }
                    profile.email = emailDetail.email;

                    const user = await UserModel.findOne({ email: profile.email }).exec();
                    if (!user) {
                        const newUser = {
                            firstName,
                            lastName,
                            age,
                            email: profile.email,
                            password: createHash(password),
                            cartID,
                            role,
                        };
                        const products = {};

                        try {
                            const userCreated = await UserModel.create(newUser);
                            try {
                                const cart = await CartServise.createCart(products);
                                userCreated.cartID = cart;
                                await userCreated.save();
                            } catch (error) {
                                console.log('Error actualizando el carrito:', error);
                                return done(error);
                            }
                            console.log('Registro existoso');

                            return done(null, userCreated);
                        } catch (error) {
                            console.log('Error creando el usuario:', error);
                            return done(error);
                        }
                    } else {
                        console.log('User already exists');
                        return done(null, user);
                    }
                } catch (e) {
                    console.log('Error en auth github');
                    console.log(e);
                    return done(e);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id).exec();
        done(null, user);
    });
}
