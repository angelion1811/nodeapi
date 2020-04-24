module.exports = {
	
	HOST: "db4free.net",
	USER: "angelion",
	PASSWORD: "angelion",
	DB: "angulartestapp",
	dialect: "mysql",
	pool:{
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};

