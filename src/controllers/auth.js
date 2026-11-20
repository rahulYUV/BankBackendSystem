const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

async function userregisterdController(req, res) {

    const {
        email , password , username 
    } = req.body;


    const checkExist = await userModel.findOne({
        email:email
    });


    if (checkExist) {
    return res.status(409).send('user alraedy exist ');
  }


  const user  = await userModel.create({
    email, username, password
  })



  const token = jwt.sign({id:user._id} , 'user@123x' ,{expiresIn:'7h'});

  res.cookie('token', token);

  res.status(201).json({
    msg: 'user regirsted sucess',
    token:token
  })

}

async function userLoginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email: email.trim().toLowerCase() }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, 'user@123x', { expiresIn: '7h' });

  res.cookie('token', token);

  return res.status(200).json({
    msg: 'Login successful',
    token,
  });
}


module.exports = {
    userregisterdController,
    userLoginController,
  };
