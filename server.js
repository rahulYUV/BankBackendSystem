
require('dotenv').config();

const app = require('./src/app');
const connectdb = require('./src/config/db');


const port = 3000;

connectdb();
app.listen(port,()=>{
    console.log("app is listenin on port 3000");

});
