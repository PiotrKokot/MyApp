/**
 * @author Piotr Kokot
 * Users Collection Model 
 * */

const mongoose = require('../connection')

class Users {
    constructor() {
        this.users = mongoose.model('users', {
            imie:{type:String}, 
            nazwisko:{type:String},
            email:{type:String},
            logged:{type:Boolean}
          });
    }

    async userSave(res=Response,json=Object) {

        const message = `Hello ${json.email} You are new and registered!`

        await this.users.exists({email:json.email}).then( (email)=>{
          if(email == null) {
            const user = new this.users({
              imie:json.imie,nazwisko:json.nazwisko,email:json.email
            })
            user.save() 
          }else {
            message = `E-mail: ${json.email} duplicated! Try again.`
          }
        })
        
        this.getAllUsers(res,message)
        return 1;
    }

    userDelete(res=Response,id_user=String) {
     
      this.users.deleteOne({'_id':id_user}).catch(error=>{
        console.log({error:error.message})
      })

      this.getAllUsers(res,`Delete user: ${id_user}`)
      return 1;
    }

    async getAllUsers(res=Response,message="") {
      
        await this.users.find({}).sort({'_id':-1}).then(function(data){
           res.send({message:message,data:data})
        })
        return 1;
    }
}

module.exports = new Users()
