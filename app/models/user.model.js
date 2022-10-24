module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users',{
		email:{
			type:Sequelize.STRING,
			unique:true
		},
		first_name:{
			type:Sequelize.STRING
		},
		last_name:{
			type:Sequelize.STRING
		},
		password:{
			type:Sequelize.STRING
		},
		avatar:{
			type:Sequelize.STRING
		}
	},{
		instanceMethods: {
			toJson: () =>{
				delete this.dataValues.password;
				return JSON.stringify(this.dataValues);
		   }
	   },
		privateColumns:['password']
	});

	User.findAll({
		attributes:{
			excludes:['password']
		}
	});
	
	User.findOne({
		attributes:{
			excludes:['password']
		}
	});
	
	return User;
}