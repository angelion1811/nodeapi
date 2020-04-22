module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users',{
		name:{
			type:Sequelize.STRING
		},
		lastname:{
			type:Sequelize.STRING
		},
		status:{
			type:Sequelize.BOOLEAN
		},
		image:{
			type:Sequelize.STRING
		}
	});
	
	return User;
}