let Validator = require('validatorjs');

exports.login = (req, res, next) => {
    let rules ={
        "email": "required|email",
        "password": "required|min:2|string|max:10",
    }
    let data = req.body;
    let validation = new Validator(data, rules);
    if(validation.fails()){
        return res.status(400).json({errors: validation.errors.all()});
    }
    next()
}

exports.register = async (req, res, next) => {
    let rules ={
        "email": "required|email",
        "first_name": "required|min:2|string",
        "last_name": "required|min:2|string",
        "password": "required|min:2|string|max:10",
        "avatar": "required|url"
    }
    let data = req.body;
    let validation = new Validator(data, rules);
    if(validation.fails()){
        return res.status(400).json({errors: validation.errors.all()});
    }
    next()
}