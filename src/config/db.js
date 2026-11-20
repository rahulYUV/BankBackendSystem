const mongoose = require('mongoose');

const connectdb =()=>{

    mongoose.connect(process.env.dbs)
    .then(()=>{
        console.log('db connection sucess')
    })
    .catch((err)=>{
        console.log('db connection failed');
        process.exit(1);
    });
};


module.exports = connectdb;
