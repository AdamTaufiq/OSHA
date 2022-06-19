<template>
  <div v-if="role == 'org_adm' || role == 'prj_adm'">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Projects</v-toolbar-title>
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

      <v-dialog v-model="dialog" max-width="500px">  <!-- dialog 1 ~ ADD NEW PROJECT -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on" v-if="role == 'org_adm' || role == 'super_adm'">New Project</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-show="false" v-model="editedItem.project_id" disabled></v-text-field>
                  <v-text-field v-show="false" v-model="editedItem.project_org" label="Organization"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.project_number" label="Project number"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.project_name" label="Project name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    v-model="editedItem.project_description"
                    box
                    label="Description"
                    auto-grow
                    value=""
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    v-model="editedItem.project_comment"
                    box
                    label="Remarks"
                    auto-grow
                    value=""
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 v-if="editedItem.project_id">
                  Add Participant &nbsp;
                  <v-icon small class="mr-2" @click="updateItem(editedItem)">
                    (add)
                  </v-icon>
                </v-flex>
                <v-flex xs12>
                  <!-- {{editedItem.items}} -->
                  <b v-if="editedItem.project_id">Project leader:</b>
                  <span v-for="item in editedItem.items">
                    <ul v-if="item.project_isAdmin==true">
                    {{item.user_fullname}}
                    <v-icon small @click="deleteAssign(item)">
                      cancel
                    </v-icon>
                    </ul>
                  </span>
                  <br/>
                  <b v-if="editedItem.project_id">Participants:</b>
                  <span v-for="item in editedItem.items">
                    <ul v-if="item.project_isAdmin==false">
                    {{item.user_fullname}}
                    <v-icon small @click="deleteAssign(item)">
                      cancel
                    </v-icon>
                    </ul>
                  </span>
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

      <v-dialog v-model="dialog2" max-width="500px"><!-- dialog 2 ~ ADD USER TO PROJECT -->
        <v-card>
          <v-card-title>
            <span class="headline">Add Participant</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="updatedItem.project_number" label="Project number" disabled></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-select
                      :items="users"
                      item-text="name"
                      v-model="updatedItem.user_fullname"
                      label="User lists"
                    ></v-select>
                  <!-- <v-text-field v-model="updatedItem.project_no" label="Project number"></v-text-field> -->
                </v-flex>
                <v-flex xs6 v-if="isPrjAdmin">
                  <v-select
                      :items="adminPrj"
                      v-model="updatedItem.project_isAdmin"
                      label="Project leader?"
                    ></v-select>
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
        <td>{{ props.item.project_number }}</td>
        <td class="text-xs-center">{{ props.item.project_name }}</td>
        <td class="text-xs-center">{{ props.item.project_description }}</td>
        <td class="text-xs-center">{{ props.item.project_comment }}</td>
        <td class="text-xs-center">
          <v-icon small class="mr-2" @click="updateItem(props.item)">
            add
          </v-icon>
          <br/>
          <b>{{ props.item.items.length }}</b>
          <!-- <p v-for="item in props.item.items">{{ item.user_fullname }}
            <v-icon small @click="deleteAssign(item)">
              cancel
            </v-icon>
          </p> -->
        </td>
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
    data: () => ({
      organizations: [],
      isPrjAdmin: false,
      role: localStorage.getItem("role"),
      org: localStorage.getItem("org"),
      token: localStorage.getItem("token"),
      search: '',
      adminPrj: [true, false],
      dialog: false,
      dialog2: false,
      tableItems: [],
      users: [],
      userProjects: [],
      headers: [
        { text: 'Project number', align: 'left', value: 'project_number'},
        { text: 'Project name', align: 'center', value: 'project_name' },
        { text: 'Description', align: 'center', value: 'project_description' },
        { text: 'Remarks', align: 'center', value: 'project_comment' },
        { text: 'Total participants', align: 'center', value: 'user_fullname' },
        { text: 'Actions', align: 'center', value: 'project_id', sortable: false }
      ],
      projects: [],
      tempTable: [],
      editedIndex: -1,
      editedItem: {
        project_id: '',
        project_org: '',
        project_number: '',
        project_name: '',
        project_description: '',
        project_comment: '',
      },
      updatedIndex: -1,
      updatedItem: {
        uproject_id: '',
        user_id: '',
        user_fullname: '',
        project_no: '',
        project_isAdmin: false,
        uproject_isDeleted: '',
      },
      defaultItem: {
        project_id: '',
        project_org: '',
        project_number: '',
        project_name: '',
        project_description: '',
        project_comment: '',
      },
      defaultItem2: {
        uproject_id: '',
        user_id: '',
        user_fullname: '',
        project_no: '',
        project_isAdmin: '',
        uproject_isDeleted: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close2()
      },
      projects(val) {
        this.tableItems = val
      },
      updatedItem: {
        handler: function (val, oldVal) {
          // Return the object that changed
        this.updatedItem.project_isAdmin = false

          let tempData = this.users.find(el => el.name == this.updatedItem.user_fullname)

          if (tempData) {
            tempData.role == 'prj_adm' ? this.isPrjAdmin = true : this.isPrjAdmin = false
          }

        },
        deep: true
      }
    },

    mounted(){
    this.initialize()
    },

    methods:{
    initialize(){
      axios.get(`https://apis.soleet.my/ucux/projects?filter[where][project_isDeleted]=false&filter[where][project_org]=${this.org}`,
      {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response1 => {
        let projects = response1.data
        let tempProject = []
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

            projects.forEach(el => {
            Object.assign(el, {items: []})
              tempTable.forEach(to => {
                if(to.project_no == el.project_number){
                  el.items.push(to)
                }
              })
              tempProject.push(el)
              console.log(tempProject)
            })

            if (this.role == 'org_adm') {
              this.projects = tempProject
            }
            else if (this.role == 'prj_adm') {
              this.filterTable(tempProject)
            }
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })

      axios.get(`https://apis.soleet.my/ucux/users?filter[where][user_isDeleted]=false&filter[where][user_org]=${this.org}`,
      {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response => {
        let temp = response.data
        this.userProjects = response.data
        this.users = []
        temp.forEach(el => {
          this.users.push({
            name: el.user_fullname,
            role: el.user_role
          })
        })

      })

      .catch(error => {
        console.log(error);
        
      })

      axios.get('https://apis.soleet.my/ucux/organizations',
      {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response => {
        let temp = response.data
        this.organizations = []
        temp.forEach(el => {
          this.organizations.push(el.org_code)
        })
        console.log(this.organizations)
      })

      .catch(error => {
        console.log(error);
        
      })

    },

    filterTable(val){
      var userID = localStorage.getItem("userID")

      axios.get(`https://apis.soleet.my/ucux/user-projects?filter[where][user_id]=${userID}&filter[where][project_isAdmin]=true&filter[where][uproject_isDeleted]=false`,
      {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response3 => {
        let tempArray =[]

        response3.data.forEach(el=>{
          tempArray.push(el.project_no)
        })
        
        tempArray.forEach(el=>{
          val.forEach(element=>{
            if (element.project_number == el) {
              this.projects.push(element)
            }
          })
        })

      })
      .catch(error => {
        console.log(error);
      })
    },

      updateItem (item) {
        this.updatedIndex = this.tempTable.indexOf(item)
        this.updatedItem = Object.assign({}, item)
        this.dialog2 = true
      },

      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.projects.indexOf(item)
        console.log(item)
        // var yesno =  confirm(`Are you sure you want to delete this item? = ${item.id}` ) && this.projects.splice(index, 1)
        var yesno =  confirm("Are you sure you want to delete this item?") && this.projects.splice(index, 1)
        // confirm(yesno)
        if(yesno){
          var json = {}
          json.project_id=item.project_id
          json.project_org=item.project_org
          json.project_number=item.project_number
          json.project_name=item.project_name
          json.project_description=item.project_description
          json.project_comment=item.project_comment
          json.project_isDeleted=true

          axios.put(`https://apis.soleet.my/ucux/projects/${item.project_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);

          alert('Delete successfull')
        })
        .catch(error => {
          console.log(err);
        });
        
        }
      },

      deleteAssign (item) {   // delete assign
        console.log(item)
        var sure =  confirm("Are you sure to remove user from project ?")
        
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
        this.isPrjAdmin = false
        setTimeout(() => {
          // this.updatedItem = Object.assign({}, this.defaultItem2)
          this.updatedIndex = -1
        }, 300)
      },

        save2 () {
          this.tempTable.push(this.updatedItem)
          const uuidv4 = require('uuid/v4');
          uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'
          console.log(this.userProjects);
          
          let c = this.userProjects.find((item) => item.user_fullname == this.updatedItem.user_fullname)
          console.log(c);
          
          var json = {}
          json.uproject_id=uuid.v4()
          json.user_id=c.user_id
          json.user_fullname=this.updatedItem.user_fullname
          json.project_no=this.updatedItem.project_number
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
            alert("Success assign a member")
            window.location.reload()
          })

          .catch(error => {
            console.log(error);
            
          })
          
        },

        save () {
        if (this.editedIndex > -1) { //edit data 
          Object.assign(this.projects[this.editedIndex], this.editedItem)
          
          var json = {}
          json.project_id=this.editedItem.project_id
          json.project_org=this.editedItem.project_org
          json.project_number=this.editedItem.project_number
          json.project_name=this.editedItem.project_name
          json.project_description=this.editedItem.project_description
          json.project_comment=this.editedItem.project_comment
          json.project_isDeleted=false

          axios.put(`https://apis.soleet.my/ucux/projects/${this.editedItem.project_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);
          alert("Edit successfully")
        })
        .catch(error => {
          console.log(err);
        });

        } else { //create new
          this.projects.push(this.editedItem)

          const uuidv4 = require('uuid/v4');
          uuidv4();
          var json = {}
          json.project_id=uuidv4()
          json.project_org=this.org
          json.project_number=this.editedItem.project_number
          json.project_name=this.editedItem.project_name
          json.project_description=this.editedItem.project_description
          json.project_comment=this.editedItem.project_comment
          json.project_isDeleted=false

          console.log(json)

          axios.post('https://apis.soleet.my/ucux/projects',json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
            alert("Add project successfully")
          })

          .catch(error => {
            console.log(error);
            
          })
          }
          this.close()
        }

    }
  }
</script>