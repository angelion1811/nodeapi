module.exports = {
	
	HOST: "dbdevelopers.xyz",
	USER: "panel",
	DB: "panel",
	PASSWORD: "P4n3lCP4",
	
	dialect: "mysql",
	pool:{
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};

