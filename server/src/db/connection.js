/**
 * @author Piotr Kokot
 * MongoDb connection procedure
 * */
const mongoose = require('mongoose')
const serverUrl = 'mongodb://localhost:27017/MyApp'
//mongo db -> monogoose connector
try{

  mongoose.connect(serverUrl)
  module.exports = mongoose

}catch(err) {
  console.log(err.message)
}

