import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // alert( JSON.stringify(password._value))
        axios.post(`https://apis.soleet.my/t/login`, { username:email._value.replace(/ /g,""), password:password._value }) // users details
        // axios({ url: 'https://apis.soleet.my/r/login', data: {username:"shaz",password:"shaz"}, method: 'POST' })
          .then(resp => {
            // alert(JSON.stringify(resp))
            const token = resp.data.access_token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            
            if (resp.data.error){
               alert("Please log in with the correct email & password")
               this.logout()
               return false
            }
            else if (resp.data.access_token){
              var jwt = JSON.parse( ( new Buffer( resp.data.access_token.split('.')[1], 'base64') ) )
              // alert (JSON.stringify(jwt))
              if(jwt.email_verified==false){
                alert ("Please verify your email first")
                this.logout()
                return false
              }
              else if(jwt.realm_access.roles.filter( (x)=> { return x=="super_adm" } ).length > 0 ){ // filter Super Admin
                localStorage.setItem("role", jwt.realm_access.roles.filter( (x)=> { return x=="super_adm" } )[0])
                // alert ("Welcome to UCUX System")
                 axios.get(`https://apis.soleet.my/ucux/users/${jwt.sub}`,
                 {
                  headers: { 
                      'Authorization': `Bearer ${token}`
                  }
                })
                .then(res => {
                  console.log(res)

                  if(res.data.user_org){
                    localStorage.setItem("userID", jwt.sub)
                    localStorage.setItem("org", res.data.user_org)
                    localStorage.setItem("fullname", res.data.user_fullname)

                    axios.get(`https://apis.soleet.my/ucux/organizations?filter[where][org_code]=${res.data.user_org}`,
                    {
                      headers: { 
                          'Authorization': `Bearer ${token}`
                      }
                    })
                    .then(res2 => {
                      console.log(res2.data[0])

                        localStorage.setItem("orgname", res2.data[0].org_name)
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                  }

                })
                
              }
              else if(jwt.realm_access.roles.filter( (x)=> { return x=="org_adm" } ).length > 0 ){ // filter Organization Admin
                localStorage.setItem("role", jwt.realm_access.roles.filter( (x)=> { return x=="org_adm" } )[0])
                // alert ("Welcome to UCUX System")
                 axios.get(`https://apis.soleet.my/ucux/users/${jwt.sub}`,
                 {
                  headers: { 
                      'Authorization': `Bearer ${token}`
                  }
                })
                .then(res => {
                  console.log(res)

                  if(res.data.user_org){
                    localStorage.setItem("userID", jwt.sub)
                    localStorage.setItem("org", res.data.user_org)
                    localStorage.setItem("fullname", res.data.user_fullname)

                    axios.get(`https://apis.soleet.my/ucux/organizations?filter[where][org_code]=${res.data.user_org}`,
                    {
                      headers: { 
                          'Authorization': `Bearer ${token}`
                      }
                    })
                    .then(res2 => {
                      console.log(res2.data[0])

                        localStorage.setItem("orgname", res2.data[0].org_name)
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                  }

                })
                
              }
              else if(jwt.realm_access.roles.filter( (x)=> { return x=="prj_adm" } ).length > 0 ){ // filter Project Admin
                localStorage.setItem("role", jwt.realm_access.roles.filter( (x)=> { return x=="prj_adm" } )[0])
                // alert ("Welcome to UCUX System")
                 axios.get(`https://apis.soleet.my/ucux/users/${jwt.sub}`,
                 {
                  headers: { 
                      'Authorization': `Bearer ${token}`
                  }
                })
                .then(res => {
                  console.log(res.data)

                  if(res.data.user_org){
                    localStorage.setItem("userID", jwt.sub)
                    localStorage.setItem("org", res.data.user_org)
                    localStorage.setItem("fullname", res.data.user_fullname)

                    axios.get(`https://apis.soleet.my/ucux/organizations?filter[where][org_code]=${res.data.user_org}`,
                    {
                      headers: { 
                          'Authorization': `Bearer ${token}`
                      }
                    })
                    .then(res2 => {
                      console.log(res2.data[0])

                        localStorage.setItem("orgname", res2.data[0].org_name)
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                  }

                })
                
              }
              else {
                alert("You are not authorized to use this content")
                this.logout()
              }
              
            }
            
            // commit('auth_success', token, user)
            // resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'https://apis.soleet.my/r/register', data: user, method: 'POST' },
        {
          headers: { 
              'Authorization': `Bearer ${jwt}`
          }
        })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)

          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
            alert("Please log in with the correct email & password")
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
