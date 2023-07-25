import express from 'express';
import { UserService } from '../services/user.service.js';
import isUser from "../middlewares/auth.js"
import { UserModel } from '../DAO/models/users.model.js';
// import { use } from 'express/lib/router/index.js';
export const sessionsRouter = express.Router();



sessionsRouter.get('/login',async (req, res) => {
    res.render("login")
});



sessionsRouter.get('/register',async (req, res) => {
    res.render("register")
});

sessionsRouter.post("/login",async (req,res) => {
    const {email,password} =req.body;
    const user =  await UserService.findEmail(email);
    if (!user) {
        return res.redirect("/api/session/register")
    } else if(password != user.password) {
        console.log("wrong password")
    } else {
        req.session.user = user.user
        res.redirect("/")
    }
    
})

sessionsRouter.post('/register',async (req, res) => {
    const { email, password} = req.body
    // const userExists = await req.session?.email;
    const userExists = await UserService.findEmail(email);
    try {
        if (email=="" ) {
            console.log(
                "validation error: email incomplete."
            );
            console.error(Error);
            return res.status(400).json({
                status: "error",
                msg: "please complete email",
                data: {Error},
            });
        } else if (userExists){
            console.log("You already have an account")
            return res.redirect("/api/session/login")
        } else {
                    const userCreated = await UserService.createUser({  
            email:email,
            password:password
        });
        
        return res.status(201).json({
            status: "success",
            msg: "user created",
            data: {
                _id: userCreated._id,
                email: userCreated.email,
                password: userCreated.password,
            },
        });
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});

// sessionsRouter.post("/login",async (req,res) => {
//         try{
//             const {email, password} = req.body;
//             if (!email || !password) {
//                 return res.status(400).render('error', {error: 'email and password required'});
//             }
//             const coder = email === 'adminCoder@coder.com' && password === 'adminCod3r123';
//             if (coder) {
//                 req.session.email = email;
//                 req.session.coder = true;
//                 return res.redirect('/api/products');
//             }
//             const user = await UserModel.findOne({email: email});
//             if (user && isValidPassword(password, user.password)) {
//                 req.session.email = user.email;
//                 req.session.isAdmin = user.isAdmin;
//                 return req.session.save(() => {
//                     return res.redirect('/api/products');
//                 });
//             }else{
//                 return res.status(401).render('error', {error:'wrong email or password'})
//             }
//         }catch(error){
//             console.error(error);
//             res.status(500).json({status: 'error', message: 'Internal server error'});
//         }
//     }); 
    

// sessionsRouter.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.json({ status: 'Logout ERROR', body: err })
//         }
//         res.send('Logout ok!')
//     })
// })

// sessionsRouter.get('/login',async (req, res) => {
//     const { email, password } = req.query;
//     if (email == 'adminCoder@coder.com' & password == 'adminCod3r123') {
//         return res.send('welcome coder');
//     } else {res.send('login success!')

//     }
//     req.session.email = email;
//     req.session.admin = false;
//     res.render("login");
// })

function checkLogin(req,res,next) {
if (req.session.email){
    return next
} else {
    return console.log("Error email")
}
}

