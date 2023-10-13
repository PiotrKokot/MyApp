<template>
  <div>
     <h1>Piotr Kokot - Technology Stack: (MongoDb+Node.js+VUE-Vite) </h1>
     <h2>Register New Users</h2><br/>
     <input type="text" v-model="imie" name="imie" placeholder="Imie" />&nbsp;*&nbsp;
     <input type="text" v-model="nazwisko" name="nazwisko" placeholder="Nazwisko" />&nbsp;*&nbsp;<br/><br/>
     <input type="email" v-model="email" name="email" placeholder="E-mail" />&nbsp;*&nbsp;
     <button @click="register">Register</button>
     <br/>
     <br/>
     <hr style="border:3px solid greenyellow">
     <br/>
     <p style="color:greenyellow">{{reg_message}}</p>
     <p style="color:greenyellow">{{reg_message2}}</p>
     <br/>
     <h2>Users</h2>
     <table class="styled-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Email</th>
          <td>-</td>
        </tr>
      </thead>
      <tbody>
         <tr v-for="user in users">
          <td>{{user._id}}</td>
          <td>{{user.imie}}</td>
          <td>{{user.nazwisko}}</td>
          <td>{{user.email}}</td>
          <td><button @click="deleteUser(user._id)" >x</button></td>
         </tr>
      </tbody>
      
     </table>
  </div> 
</template>

<script>
 
  import Api from "@/services/Api"



  async function getAllUsers() {
    const response = await Api('get','getAllUsers')
    return response.data.data
  }

  export default {
    data() {
      return {
        imie: '',
        nazwisko: '',
        email:'',
        users:[],
        reg_message: '',
        reg_message2:''
      }
    },

    mounted() {
      getAllUsers().then( (users)=>{
        this.users = users
      })
    },

    watch: {
      email(value) {
        //console.log(`email has changed ${value}`)
      },

      imie(value) {
        if(value == '') {
          setTimeout(()=>{
            this.reg_message2 = ''
          },2000)
          this.reg_message2 = 'Podaj imie'
        }
      },

      nazwisko(value) {
        if(value == '') {
          setTimeout(()=>{
            this.reg_message2 = ''
          },2000)
          this.reg_message2 = 'Podaj nazwisko'
        }
      },

      email(value) {
        if(value == '') {
          setTimeout(()=>{
            this.reg_message2 = ''
          },2000)
          this.reg_message2 = 'Podaj email'
        }
      },

      reg_message() {
        if(this.reg_massage !== '') {
          setTimeout(()=>{
            this.reg_message = ''
            window.location.href='/register'
          },2000)
        }
      }
    },

    methods: {
      async register() {
        if(this.email !== '' && this.imie !== '' && this.nazwisko !== '' ) {
          const response = await Api('post','register',{email:this.email,imie:this.imie,nazwisko:this.nazwisko})
          this.reg_message = response.data.message
          this.users = response.data.data
          return;
        }
        this.reg_message = 'Please fill all inputs - required!'
      },

      async deleteUser(id_user) {
        const response = await Api('delete',`deleteUser/${id_user}`)
        this.reg_message = response.data.message
      }
    },
  
  }
</script>

<style scoped>
</style>

