const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');

const Login = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: {username: username}});

    if (!user) res.json({ error: "User doesn't exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username or Password"});

        const accessToken = sign({username: user.username, id: user.id}, 
            "importantsecret"
            );
        res.json(accessToken);
    });
};

const Register = async (req, res) => {
    try{
        const { username, password } = req.body;
        
        const user = await Users.findOne({ where: {username: username}});
        if (user) {
            res.json({ error: "Username alredy in use, choose another!"});
        } else {

            bcrypt.hash(password,10).then((hash) => {
                Users.create({
                username: username,
                password: hash,
            });
        })     
        console.log(req.body);
        res.send();
        }
        
    }
    catch(err){
        console.log(err);
    } 
}

const GetUsers = async (req, res) => {
    try{
        const listOfUsers = await Users.findAll();
        res.json(listOfUsers);
    }catch(err){
        console.log(err);
    }
    
}

module.exports = {
    Login: Login,
    Register: Register,
    GetUsers: GetUsers,
};