<template>
  <v-app id="inspire" v-if="isLoggedIn">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <router-link tag="li" to="/">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a>Home</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>

        <router-link tag="li" to="/organizations" v-if="role == 'super_adm'">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>clear_all</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a>Organization Management</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>

        <router-link tag="li" to="/users" v-if="role == 'org_adm'">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a>User Management</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>

        <router-link tag="li" to="/projects"  v-if="role == 'org_adm' || role == 'prj_adm'">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>business</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a>Project Management</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>

        <router-link tag="li" to="/reports" v-if="role == 'org_adm' || role == 'prj_adm'">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>email</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a>Report Management</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>

      </v-list>

    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>UCUX System [{{orgname}}]</v-toolbar-title>
      <!-- <v-toolbar-title v-if="role == 'super_adm'">UCUX System (Super Admin) [{{orgname}}]</v-toolbar-title> -->
      <!-- <v-toolbar-title v-if="role == 'org_adm'">UCUX System (Organization Admin) [{{orgname}}]</v-toolbar-title> -->
      <!-- <v-toolbar-title v-if="role == 'prj_adm'">UCUX System (Project Admin) [{{orgname}}]</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <span class="subheading">{{fullname}}</span>
      <v-btn color="warning" v-on:click="logout">Logout</v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
      <v-spacer></v-spacer>
      <span class="white--text">Soleet Sdn Bhd &nbsp;</span>
    </v-footer>
  </v-app>

<v-app id="inspire" v-else>
  <Login/>
</v-app>

</template>

<script>
import Login from '@/components/auth/Login.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Login
  },
  data(){
    return{
      role: localStorage.getItem("role"),
      fullname: localStorage.getItem("fullname"),
      orgname: localStorage.getItem("orgname"),
      drawer: true,
      timeoutId: null
    }
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },

    setupTimers: function () {
    //   var v = this;
    //   setInterval(function () {
    //     axios.post(`https://apis.soleet.my/r/refreshtoken`, { refresh_token: localStorage.getItem("refresh_token") }) // users details
    //       .then(resp => {
    //        alert(resp)
    //       })
    //       .catch(err => {
    //         commit('auth_error')
    //         localStorage.removeItem('token')
    //         reject(err)
    //       })
    //     alert("30 seconds has passed")
    // }, 30000);

    document.addEventListener("mousemove", this.resetTimer, false);
    document.addEventListener("mousedown", this.resetTimer, false);
    document.addEventListener("keypress", this.resetTimer, false);
    document.addEventListener("keydown", this.resetTimer, false);
    document.addEventListener("touchmove", this.resetTimer, false);
    document.addEventListener("scroll", this.resetTimer, false);
     
    this.startTimer();
   },

   startTimer: function () {
    this.timeoutId = window.setTimeout(this.doInactive, 180000) //timer due in 180000 milliseconds or 3 minutes
   },

   doInactive: function () {
    alert("Your session has expired due to inactivity.");
    this.logout()
	  //location.reload(); 
   },   

   resetTimer: function () {
    if (localStorage.getItem("token")) {
      window.clearTimeout(this.timeoutId)
      this.startTimer();
    }
   },  

  },
  
  mounted () {
    if (localStorage.getItem("token")) {
      this.setupTimers()
    }
  }

};
</script>

<style>
.router-link-exact-active {
  color: blue;
}
</style>
