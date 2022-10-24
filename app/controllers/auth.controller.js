const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req,res) =>{
    try{
        let { email, first_name, last_name, avatar, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let user = { email, first_name, last_name, avatar, password: await bcrypt.hash(password, salt)};
        let data = await User.create(user);
        await delete data.password; 
        const token = jwt.sign({
            user: data,
            id: data.id
        }, process.env.TOKEN_SECRET)
        res.send({data, token});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
	
};

exports.login = async(req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({where:{email: email}});
        if(!user) res.status(400).json({error: "user not found"});
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
        
        await delete user.password; 
        const token = jwt.sign({
            user,
            id: user.id
        }, process.env.TOKEN_SECRET)
        res.send({data: user, token});
    } catch (error) {
        res.status(500).send({
            error: error.message || `error en server`
        });
    }
} 

exports.profile = async(req, res) => {
    res.json({data: req.user});
} 