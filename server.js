const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

var corsOptions = {
	config: "http://localhost:8001"
};

app.use(cors(corsOptions));

app.use(bodyParse.json());

app.use(bodyParse.urlencoded({extended:true}));

const db = require('./app/models');

//db.sequelize.sync();

app.get("/",(request, response)=>{
	response.json({message:"Welcome to my node api"});
})

require('./app/routes/user.routes.js')(app);
require('./app/routes/auth.routes.js')(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=> {
	console.log(`running server on port ${PORT}.`);
});
