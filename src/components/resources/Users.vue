<template>
  <div v-if="role == 'org_adm' || role == 'super_adm'">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Users</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-dialog v-model="dialog" max-width="500px">   <!-- dialog 1 ~ ADD NEW USER -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on" v-if="role == 'super_adm'">New User</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field v-show="false" v-model="editedItem.user_id" disabled></v-text-field>
                  <!-- <v-select
                    :items="orgs"
                    v-model="editedItem.user_org"
                    label="Organization"
                  ></v-select> -->
                  <v-text-field v-model="editedItem.user_org" label="Organization"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="roles"
                    v-model="editedItem.user_role"
                    label="Role"
                  ></v-select>
                  <!-- <v-text-field v-model="editedItem.role" label="Role"></v-text-field> -->
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.user_firstname" label="First name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.user_lastname" label="Last name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.user_email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.user_contact" label="Telephone"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" max-width="500px">   <!-- dialog 2 ~ ADD PROJECT TO USER -->
        <v-card>
          <v-card-title>
            <span class="headline">Add Project</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="updatedItem.user_fullname" label="User fullname" disabled></v-text-field>
                  <v-text-field v-show="false" v-model="editedItem.user_role" label="Role"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                      :items="projects"
                      v-model="updatedItem.project_no"
                      label="Project no"
                    ></v-select>
                </v-flex>
                <v-flex xs6 v-if="editedItem.user_role=='prj_adm'">
                  <v-select
                      :items="adminPrj"
                      v-model="updatedItem.project_isAdmin"
                      label="Project leader?"
                    ></v-select>
                </v-flex>
                <v-flex xs6 v-else v-show="false">
                  <v-text-field v-model="updatedItem.project_isAdmin" label="Project leader?" disabled></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-show="false" v-model="updatedItem.user_id" label="User ID" disabled></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close2">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save2">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" max-width="500px" persistent>   <!-- dialog 3 ~ EDIT -->
        <v-card>
          <v-card-title>
            <span class="headline">Edit Users</span> <v-spacer></v-spacer>
            <v-btn color="orange darken-1" flat @click="resetPass">Reset password</v-btn>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.user_fullname" label="User fullname" disabled></v-text-field>
                  
                </v-flex>
                <v-flex xs6 v-if="editedItem.user_role">
                  <v-select
                    :items="roles"
                    v-model="editedItem.user_role"
                    label="Role" disabled
                  ></v-select>
                  <v-btn color="red darken-1" flat @click="deleteRole">Update Role</v-btn>
                </v-flex>
                <v-flex xs6 v-else>
                  <v-select v-if="role == 'super_adm'"
                    :items="roles"
                    v-model="editedItem.user_role"
                    label="Role"
                  ></v-select>
                  <v-select v-if="role == 'org_adm'"
                    :items="rolesOrg"
                    v-model="editedItem.user_role"
                    label="Role"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.user_contact" label="Telephone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 v-show="false">
                  <v-text-field v-model="editedItem.user_id"></v-text-field>
                  <v-text-field v-model="editedItem.user_fullname"></v-text-field>
                  <v-text-field v-model="editedItem.user_org"></v-text-field>
                  <v-text-field v-model="editedItem.user_isDeleted"></v-text-field>
                  <v-text-field v-model="editedItem.user_firstname" label="First name"></v-text-field>
                  <v-text-field v-model="editedItem.user_lastname" label="Last name"></v-text-field>
                  <v-text-field v-model="editedItem.user_email" label="Email"></v-text-field>
                  <v-text-field v-model="this.editedItem.user_isDeleted" label="Deleted ?"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close3">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog4" max-width="500px">   <!-- dialog 4 ~ INVITE -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2"   v-on="on" v-if="role == 'org_adm'">Invite user</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Invite User </span> <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-textarea
                    v-model="invitedItem.to"
                    box
                    label="Invite"
                    auto-grow
                    placeholder="Place comma [,] to invite many users.
                    
eg : a@gmail.com , b@gmail.com , c@gmail.com"
                  ></v-textarea>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close4">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="invite">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog5" max-width="500px">   <!-- dialog 5 ~ UNVERIFIED listkan email user yang "sent" -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2"   v-on="on" v-if="role == 'org_adm'">Unverified user</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Unverified User </span> <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <!-- {{editedItem.items}} -->
                  <b>List of unverified user:</b> <br/>
                  <span v-for="(item,index) in unverified">
                    <br/> {{index+1}}. {{item.inv_email}}
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog5=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-toolbar>
    
      <v-divider
        class="mx-2"
        inset
        horizontal
      ></v-divider>

    <v-data-table
      :headers="headers"
      :items="tableItems"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.user_fullname }}</td>
        <td class="text-xs-center">{{ props.item.user_email }}</td>
        <td class="text-xs-center">{{ props.item.user_contact }}</td>
        <td class="text-xs-center">{{ props.item.user_role }}</td>
        <!-- <td class="text-xs-center">
          <v-icon small class="mr-2" @click="updateItem(props.item)">
            add
          </v-icon>
          <p v-for="item in props.item.items">{{ item.project_no }}
            <v-icon small @click="deleteAssign(item)">
              cancel
            </v-icon>
          </p>
          Project list for each user is hidden HERE
        </td> -->
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Refresh</v-btn>
      </template>
    </v-data-table>
  </div>

  <div v-else>
    <Home/>
  </div>
</template>

<script>
import axios from 'axios'
import uuid from 'uuid'
import { log } from 'util';
import Home from '@/views/Home.vue'

  export default {
    name: 'users',
    components: {
      Home
    },
    data: () => ({
      orgs: ['scienotech', 'soleet', 'spatialworks'],
      roles: ['super_adm', 'org_adm', 'prj_adm', 'user'],
      rolesOrg: ['org_adm' ,'prj_adm', 'user'],
      adminPrj: [true, false],
      search: '',
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      role: localStorage.getItem("role"),
      org: localStorage.getItem("org"),
      orgname: localStorage.getItem("orgname"),
      token: localStorage.getItem("token"),
      unverified: [],
      tableItems: [],
      projects: [],
      headers: [
        { text: 'Full name', align: 'left', value: 'user_fullname'},
        { text: 'Email', align: 'center', value: 'user_email' },
        { text: 'Telephone', align: 'center', value: 'user_contact' },
        { text: 'Role', align: 'center', value: 'user_role' },
        // { text: 'Projects', align: 'center', value: 'project_no' },
        { text: 'Actions', align: 'center', value: 'user_id', sortable: false }
      ],
      users: [],
      tempTable: [],
      editedIndex: -1,
      editedItem: {
        user_id: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_org: '',
        user_role: '',
        user_contact: '',
        user_password: '',
        user_isDeleted: '',
      },
      updatedIndex: -1,
      updatedItem: {
        user_id: '',
        user_fullname: '',
        project_no: '',
        project_isAdmin: false
      },
      invitedItem: {
        to: '',
      },
      defaultItem: {
        user_id: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_org: '',
        user_role: '',
        user_contact: '',
        user_password: '',
        user_isDeleted: '',
      },
      defaultItem2: {
        user_id: '',
        user_fullname: '',
        project_no: '',
        project_isAdmin: false
      },
      defaultItem3: {
        to: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },

      procTableItems(){
        return this.users
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close2()
      },
      users(val) {
        this.tableItems = val
      }
    },

    mounted(){
    this.initialize()
    },

    methods:{
    initialize(){
      axios.get( this.role == 'org_adm'?  `https://apis.soleet.my/ucux/users?filter[where][user_isDeleted]=false&filter[where][user_org]=${this.org}` :
                                          `https://apis.soleet.my/ucux/users?filter[where][user_isDeleted]=false` ,
      {
        headers: { 
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response1 => {
        let users = response1.data
        console.log(response1.data)

          axios.get('https://apis.soleet.my/ucux/user-projects?filter[where][uproject_isDeleted]=false', // users X projects assignment
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response2 => {
            let tempTable = response2.data
            console.log(response2.data)

            users.forEach(el => {
            Object.assign(el, {items: []})
              tempTable.forEach(to => {
                if(to.user_id == el.user_id){
                  el.items.push(to)
                }
                else{
                }
                console.log(tempTable)
              })
              this.users.push(el)
            })
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })

        axios.get(`https://apis.soleet.my/ucux/projects?filter[where][project_isDeleted]=false&filter[where][project_org]=${this.org}`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response => {
        let temp = response.data
        this.projects = []
        temp.forEach(el => {
          this.projects.push(el.project_number)
        })
        console.log(this.projects)
      })

      .catch(error => {
        console.log(error);
        
      })

      axios.get(`https://apis.soleet.my/ucux/invited-users?filter[where][inv_status]=sent&filter[where][inv_org]=${this.org}`,
      {
        headers: { 
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.unverified = response.data
        console.log(this.unverified)
      })
      .catch(error => {
        console.log(error);
        
      })

    },

      updateItem (item) {
        // console.log(item);
        
        this.updatedIndex = this.tempTable.indexOf(item)
        this.updatedItem.user_fullname = item.user_fullname
        this.updatedItem.user_id = item.user_id
        // this.updatedItem = Object.assign({}, item)
        this.editedItem = Object.assign({}, item)
        this.dialog2 = true
      },

      editItem (item) {
        axios.get(`https://apis.soleet.my/r/role/user/${item.user_id}`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.editedItem.user_role = (response.data[0])
            this.dialog3 = true
          })
          .catch(error => {
          console.log(err);
          });
        
      },

      deleteRole () {
        var json = {}
          json.role=this.editedItem.user_role
          json.user_id=this.editedItem.user_id

          axios.delete('https://apis.soleet.my/r/user/role',
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              },
              data:json
          })
            .then(response => {
              console.log(response.data)
              this.editedItem.user_role = ''
              if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
              }

              var json = {}
              json.user_id=this.editedItem.user_id //must include id for "put"
              json.user_fullname=this.editedItem.user_fullname
              json.user_firstname=this.editedItem.user_firstname
              json.user_lastname=this.editedItem.user_lastname
              json.user_email=this.editedItem.user_email
              json.user_org=this.editedItem.user_org
              json.user_contact=this.editedItem.user_contact
              json.user_role= this.editedItem.user_role
              json.user_isDeleted=this.editedItem.user_isDeleted
              
              axios.put(`https://apis.soleet.my/ucux/users/${this.editedItem.user_id}`,json,
              {
                  headers: { 
                      'Authorization': `Bearer ${this.token}`
                  }
              })
            })
            .catch(error => {
            console.log(error);
            });

      },

      resetPass (editedItem) {
        alert(this.editedItem.user_email)
        axios.get(`https://apis.soleet.my/t/resetbyemail?email=${this.editedItem.user_email}`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
            
            alert('Please check email to reset password')
          })
          .catch(error => {
          console.log(error);
          });
      },

      deleteItem (item) {
        // console.log(item.id)
        // var yesno =  confirm(`Are you sure you want to delete this item? = ${item.id}` ) && this.users.splice(index, 1)
        var yesno =  confirm(`Are you sure you want to delete this item?`) 
        // confirm(yesno)
        if(yesno){
          // const index = this.users.indexOf(item)
          axios.delete(`https://apis.soleet.my/r/profile/delete/${item.user_id}`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)

            alert('Delete successfully')
            window.location.reload()
          })
          .catch(error => {
          console.log(err);
          });
        }
      },

      deleteAssign (item) {   // delete assign
        console.log(item)
        var sure =  confirm("Are you sure to remove the project from user ?")
        
        if(sure){
          var json = {}
          json.uproject_id=item.uproject_id
          json.user_id=item.user_id
          json.user_fullname=item.user_fullname
          json.project_no=item.project_no
          json.project_isAdmin=item.project_isAdmin
          json.uproject_isDeleted=true

          axios.put(`https://apis.soleet.my/ucux/user-projects/${item.uproject_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);

          alert('Delete project assigned success')
          window.location.reload()
        })
        .catch(error => {
          console.log(err);
        });
        
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      close2 () {
        this.dialog2 = false
        setTimeout(() => {
          this.updatedItem = Object.assign({}, this.defaultItem2)
          this.updatedIndex = -1
        }, 300)
      },

      close3 () {
        this.dialog3 = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      close4 () {
        this.dialog4 = false
        setTimeout(() => {
          this.invitedItem = Object.assign({}, this.defaultItem3)
        }, 300)
      },

      invite () {
          var json = {}
          json.to=this.invitedItem.to
          json.body=
          `
<table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
 <tr>
  <td align="center" bgcolor="#FFA500">
    <img src="https://apis.soleet.my/fn/2019/7/4/45776644-f484-4403-adef-d57b61759707.UCUX_LOGO.png" alt="Creating Email Magic" width="130" height="100" style="display: block;" />
  </td>
 </tr>
 <tr>
  <td bgcolor="#ffffff">
   <h1 style="font-size:30px;">(You See You Act) UCUX Apps</h1> <br> 
   <p style="font-size:15px;">Management team would like to invite you to use UCUX apps on mobile.</p> 
   <p style="font-size:15px;">Your Organization : ${this.orgname}</p> 
   <p style="font-size:18px;">Your organization code is <b>${this.org}</b></p>
  </td>
 </tr>
 <tr>
  <td bgcolor="#ee4c50" style="padding: 40px 0 30px 0;">
   <b style="font-size:15px;">Register by download it now. >> https://shera.soleet.my/download</b>
  </td>
 </tr>
</table>
          `
          json.emailsubject = "Invitation to use UCUX Apps"
          json.org=this.org

          axios.post(`https://apis.soleet.my/e/email`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
            alert("Invitation has been sent")
          })

          .catch(error => {
            console.log(error);
            
          })
        this.close4()
      },

        save2 () {
          this.tempTable.push(this.updatedItem)
          const uuidv4 = require('uuid/v4');
          uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'

          var json = {}
          json.uproject_id=uuid.v4()
          json.user_id=this.updatedItem.user_id
          json.user_fullname=this.updatedItem.user_fullname
          json.project_no=this.updatedItem.project_no
          json.project_isAdmin=this.updatedItem.project_isAdmin
          json.uproject_isDeleted=false

          axios.post('https://apis.soleet.my/ucux/user-projects',json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
            this.close2()
            alert("Success assign a project")
            window.location.reload()
          })

          .catch(error => {
            console.log(error);
            
          })
          
        },

        save () {
          this.tempTable.push(this.editItem)
          const uuidv4 = require('uuid/v4');
          uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'

        if (this.editedIndex > -1) { //edit data 
          Object.assign(this.users[this.editedIndex], this.editedItem)

          var json = {}
          json.user_id=this.editedItem.user_id //must include id for "put"
          json.user_fullname=this.editedItem.user_fullname
          json.user_firstname=this.editedItem.user_firstname
          json.user_lastname=this.editedItem.user_lastname
          json.user_email=this.editedItem.user_email
          json.user_org=this.editedItem.user_org
          json.user_contact=this.editedItem.user_contact
          json.user_role=this.editedItem.user_role
          json.user_isDeleted=this.editedItem.user_isDeleted
          var role=this.editedItem.user_role
          var user_id=this.editedItem.user_id

          axios.put(`https://apis.soleet.my/ucux/users/${this.editedItem.user_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);

          // add role to user
            var json2 = {}
            json2.role=role
            json2.user_id=user_id

            axios.post('https://apis.soleet.my/r/user/role',json2,
            {
                headers: { 
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(response2 => {
              console.log(response2.data)

              this.close3()
              alert("Edit successfully")
            })

            .catch(error => {
              console.log(error);
              
            })

        })
        .catch(error => {
          console.log(error);
        });

        } else { //create new
          this.users.push(this.editedItem)
          const uuidv4 = require('uuid/v4');
          uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'

          var json = {}
          json.username=this.editedItem.user_email
          json.firstName=this.editedItem.user_firstname
          json.lastName=this.editedItem.user_lastname
          json.email=this.editedItem.user_email
          json.org=this.editedItem.user_org
          json.contact=this.editedItem.user_contact
          json.password=uuid.v4()
          var role=this.editedItem.user_role

          axios.post('https://apis.soleet.my/r/register/password',json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)

            // add role to user
            var json2 = {}
            json2.role=role
            json2.user_id=response.data[1].id

            axios.post('https://apis.soleet.my/r/user/role',json2,
            {
                headers: { 
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(response2 => {
              console.log(response2.data)

              this.close()
              alert("Please check the email to verify")
            })

            .catch(error => {
              console.log(error);
              
            })

          })

          .catch(error => {
            console.log(error);
            
          })
          }
        }

    }
  }
</script>