const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
	if (!req.body.name || !req.body.lastname) {
		res.status(400).send({
				message: `error en server`
		});
		return;
	}

	const user = {
		name: req.body.name,
		lastname: req.body.lastname,
		status: req.body.status,
		image: req.body.image
	};

	User.create(user)
		.then(data=>{
			res.send(data);
		})
		.catch(err=>{
			console.log(err.message);
			res.status(500).send({
				message: err.message() || `error en server`
			});
		});
};

exports.findAll = (req,res) =>{
	const name = req.query.name;
	var condition = name ? { name: { [Op.like]:`%${name}%` } } : null;
	User.findAll({where: condition})
		.then(data=>{
			res.send(data);
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || `error en server`
			});
		});
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
	console.log('id aqui',id);
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