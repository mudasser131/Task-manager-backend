const mongoose = require ('mongoose')

const connectDB  = async () =>
{

try {

    const conn = await mongoose.connect(process.env.dbURL);

    console.log(`mongodb conneted: ${conn.connection.host}`.cyan.underline);
    
    
} catch (error) {
    console.log(error);
    process.exit(1)
    
    
}

}
module.exports = connectDB;