<template>
    <div>
       <h1>Piotr Kokot - Technology Stack: (MongoDb+Node.js+VUE-Vite) </h1>
       <h2>Edit Users</h2><br/>
       <input type="text" v-model="imie" name="imie" placeholder="Imie" />&nbsp;*&nbsp;
       <input type="text" v-model="nazwisko" name="nazwisko" placeholder="Nazwisko" />&nbsp;*&nbsp;<br/><br/>
       <input type="email" v-model="email" name="email" placeholder="E-mail" />&nbsp;*&nbsp;
       <button @click="updateUser">Edit</button>
       <br/>
       <br/>
       <hr style="border:3px solid greenyellow">
       <br/>
       <p style="color:greenyellow">{{reg_message}}</p>
       <p style="color:greenyellow">{{reg_message2}}</p>
       <br/>
      
    </div> 
  </template>
  
  <script>
   
    import Api from "@/services/Api"
    import { useRoute } from 'vue-router'


    async function getUser(id_user) {
      const response = await Api('get',`getUser/${id_user}`)
      return response.data.data
  }
  
    export default {
      data() {
        return {
          imie: '',
          nazwisko: '',
          email:'',
          user:[],
          reg_message: '',
          reg_message2:'',
          id_user:''
        }
      },


      mounted() {
          const route = useRoute()
          this.id_user = route.params.id_user

          getUser(this.id_user).then((data)=> {
            this.user = data
            this.email    = this.user.email
            this.imie     = this.user.imie
            this.nazwisko = this.user.nazwisko
            this.id_user  = this.user._id
          })
      },
  
      watch: {
        email(value) {
          
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
       
        async updateUser() {
          const userData = {email:this.email,imie:this.imie,nazwisko:this.nazwisko,id_user:this.id_user}
          const response = await Api('post',`updateUser`,userData)
          
          this.reg_message = response.data.message
        }, 
      },
  
  
    
    }
  </script>
  
  <style scoped>
  </style>
  
  