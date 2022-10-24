const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const {getPagination, getPagingData} = require("../helpers/paginate");
exports.create = async (req,res) =>{
	try{
        let { email, first_name, last_name, avatar, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let user = { email, first_name, last_name, avatar, password: await bcrypt.hash(password, salt)};
        let data = await User.create(user);
        await delete data.password; 
        res.send({data});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

exports.findAll = async (req,res) =>{
	try {
		let { page, size } = req.query;
		const { limit, offset } = getPagination(page, size);
		let users = await User.findAndCountAll({limit, offset});
		res.json(getPagingData(users,page, limit));
	} catch (error) {
		res.status(500).json({error: error.message});
	}
	
};

exports.findOne = (req, res) =>{
	const id = req.params.id;
	User.findByPk(id)
		.then(data =>{
			res.send(data);
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || `error en server`
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	User.update(req.body ,{
			where: {id: id}
		})
		.then((nums) =>{
			if(nums == 1){
				res.send({message:'success updating'});
			} else {
				res.send({message:'fail updating'});
			}
		})
		.catch(err =>{
			res.status(500).send({
				message: err.message || `error en server`
			});
		});	
};

exports.delete = (req, res) => {
	const id = req.params.id;
	User.destroy({
			where: {id: id}
		})
		.then((nums,data) =>{
			if(nums == 1){
				res.send({message:"success delete"});
			} else {
				res.send({message:'fail updating'});
			}
		})
		.catch(err =>{
			res.status(500).send({
				message: err.message || `error en server`
			});
		});	
};