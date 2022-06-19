<template>
  <div v-if="role == 'super_adm'">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Organizations</v-toolbar-title>
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

      <v-dialog v-model="dialog" max-width="500px">   <!-- dialog 1 ~ ADD NEW ORGANIZATION -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-3" v-on="on">New Organization</v-btn>
        </template>
        <v-card>
         <!-- <v-card-title>           
             <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              <div class="flex-grow-1"></div> 
          </v-card-title>-->


          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs8 >
                 <h3 >ORGANIZATION INFO
      </h3></v-flex>
                <v-flex xs11 >
                  <v-text-field v-model="editedItem.org_name" label="Organization name"></v-text-field>
                </v-flex> <v-spacer></v-spacer>
                <v-flex xs6 v-show="false">
                  <v-text-field v-model="editedItem.org_id" label="Org ID" disabled></v-text-field>
                  <v-text-field v-model="editedItem.org_code" label="Code"></v-text-field>
                </v-flex>
                <v-v-col cols="12" md="6">
                  <v-text-field v-model="editedItem.org_initial" label="Initial"></v-text-field>
                </v-v-col>  <v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-model="editedItem.org_roc" label="Registration No"></v-text-field>
                </v-v-col> <v-spacer></v-spacer>
                
                <v-v-col cols="12" md="6">
                   <v-text-field v-model="editedItem.org_telNo" label="Phone"></v-text-field>
                </v-v-col><v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-model="editedItem.org_faxNo" label="Fax"></v-text-field>
                </v-v-col><v-spacer></v-spacer>

               
                  <v-textarea  clearable v-model="editedItem.org_address" label="Address" rows="3" value="This is clearable text.">
                  </v-textarea>
                <!-- <v-layout wrap> -->
                   
                  
             <v-flex xs8 >
                 <h3 >ADMIN ORGANIZATION INFO
      </h3>  </v-flex>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_firstname" label="First Name"></v-text-field>
                 </v-v-col><v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_lastname" label="Last Name"></v-text-field>
                 </v-v-col><v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_email" label="Email"></v-text-field>
               </v-v-col><v-spacer></v-spacer>
               <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_contact" label=" Contact No."></v-text-field>
               </v-v-col><v-spacer></v-spacer>

                <v-flex xs12 v-if="editedItem.org_code">
                  <v-text-field v-model="editedItem.org_person" label="Person in charge"></v-text-field>
                  <v-text-field v-model="editedItem.org_email" label="PIC's Email"></v-text-field>
                  <v-text-field v-model="editedItem.org_personNo" label="PIC's Telephone"></v-text-field>
                  <v-text-field v-show="false" v-model="editedItem.org_isDeleted" label="Deleted?"></v-text-field>
                </v-flex>

              </v-layout>
<!-- </v-layout> -->
            </v-container>
          </v-card-text>   
                 <v-card-text>
            <!-- <v-container grid-list-md> -->
              <!-- <v-layout wrap>

             <v-flex xs8 >
                 <h3 >ADMIN ORGANIZATION INFO
      </h3>  </v-flex>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_firstname" label="First Name"></v-text-field>
                 </v-v-col><v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_lastname" label="Last Name"></v-text-field>
                 </v-v-col><v-spacer></v-spacer>
                <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_email" label="Email"></v-text-field>
               </v-v-col><v-spacer></v-spacer>
               <v-v-col cols="12" md="6">
                  <v-text-field v-if="!editedItem.org_code" v-model="editedItem.user_contact" label=" Contact No."></v-text-field>
               </v-v-col><v-spacer></v-spacer>

                <v-flex xs12 v-if="editedItem.org_code">
                  <v-text-field v-model="editedItem.org_person" label="Person in charge"></v-text-field>
                  <v-text-field v-model="editedItem.org_email" label="PIC's Email"></v-text-field>
                  <v-text-field v-model="editedItem.org_personNo" label="PIC's Telephone"></v-text-field>
                  <v-text-field v-show="false" v-model="editedItem.org_isDeleted" label="Deleted?"></v-text-field>
                </v-flex>

              </v-layout> -->
            <!-- </v-container> -->
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
      :items="organizations"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.org_name }}</td>
        <td class="text-xs-center">{{ props.item.org_code }}</td>
        <td class="text-xs-center">{{ props.item.org_initial }}</td>
        <td class="text-xs-center">{{ props.item.org_roc }}</td>
        <td class="text-xs-center">{{ props.item.org_telNo }}</td>
        <td class="text-xs-center">{{ props.item.org_email }}</td>
        <td class="text-xs-center">{{ props.item.org_person }}</td>
        <td class="justify-center layout px-0">
          <v-icon v-show="true" small class="mr-2" @click="editItem(props.item)">
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
import Home from '@/views/Home.vue'

  export default {
    data: () => ({
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token"),
      search: '',
      dialog: false,
      dialog2: false,
      headers: [
        { text: 'Organization name', align: 'left', value: 'org_name'},
        { text: 'Code', align: 'center', value: 'org_code' },
        { text: 'Initial', align: 'center', value: 'org_initial' },
        { text: 'ROC', align: 'center', value: 'org_roc' },
        { text: 'Phone', align: 'center', value: 'org_telNo' },
        { text: 'Email', align: 'center', value: 'org_email' },
        { text: 'Person in charge (PIC)', align: 'center', value: 'org_person' },
        { text: 'Actions', align: 'center', value: 'org_id', sortable: false }
      ],
      organizations: [],
      orgs: [],
      editedIndex: -1,
      editedItem: {
        org_id: '',
        org_name: '',
        org_roc: '',
        org_initial: '',
        org_address: '',
        org_telNo: '',
        org_faxNo: '',
        org_code: '',
        org_isDeleted: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_org: '',
        user_role: '',
        user_contact: '',
        user_password: '',
        user_isDeleted: '',
      },
      defaultItem: {
        org_id: '',
        org_name: '',
        org_roc: '',
        org_initial: '',
        org_address: '',
        org_telNo: '',
        org_faxNo: '',
        org_code: '',
        org_isDeleted: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_org: '',
        user_role: '',
        user_contact: '',
        user_password: '',
        user_isDeleted: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Organization' : 'Edit Organization'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods:{
    initialize(){
        axios.get(`https://apis.soleet.my/ucux/organizations?filter[where]![org_isDeleted]`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
      .then(response => {
        this.organizations = response.data
        console.log(response.data)
      })

      .catch(error => {
        console.log(error);
        
      })
      },
      
    mounted(){
    this.initialize()
    },

      editItem (item) {
        this.editedIndex = this.organizations.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.organizations.indexOf(item)
        var yesno =  confirm("Are you sure you want to delete this item?") && this.organizations.splice(index, 1)

        if(yesno){
        var json = {}
          json.org_id=item.org_id //must include id for "put"
          json.org_name=item.org_name
          json.org_roc=item.org_roc
          json.org_initial=item.org_initial
          json.org_address=item.org_address
          json.org_telNo=item.org_telNo
          json.org_faxNo=item.org_faxNo
          json.org_email=item.org_email
          json.org_person=item.org_person
          json.org_personNo=item.org_personNo
          json.org_code=item.org_code
          json.org_isDeleted=true

          axios.put(`https://apis.soleet.my/ucux/organizations/${item.org_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);
          alert("Delete successfully")
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

        save () {
        if (this.editedIndex > -1) { //edit data 
          Object.assign(this.organizations[this.editedIndex], this.editedItem)
          var json = {}
          json.org_id=this.editedItem.org_id //must include id for "put"
          json.org_name=this.editedItem.org_name
          json.org_roc=this.editedItem.org_roc
          json.org_initial=this.editedItem.org_initial
          json.org_address=this.editedItem.org_address
          json.org_telNo=this.editedItem.org_telNo
          json.org_faxNo=this.editedItem.org_faxNo
          json.org_email=this.editedItem.org_email
          json.org_person=this.editedItem.org_person
          json.org_personNo=this.editedItem.org_personNo
          json.org_code=this.editedItem.org_code
          json.org_isDeleted=this.editedItem.org_isDeleted

          axios.put(`https://apis.soleet.my/ucux/organizations/${this.editedItem.org_id}`,json,
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

        } else { //create new org
          this.organizations.push(this.editedItem)
          const uuidv4 = require('uuid/v4');
          uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'

          var json = {}
          json.org_id=uuid.v4() //must include id for "put"
          json.org_name=this.editedItem.org_name
          json.org_roc=this.editedItem.org_roc
          json.org_initial=this.editedItem.org_initial
          json.org_address=this.editedItem.org_address
          json.org_telNo=this.editedItem.org_telNo
          json.org_faxNo=this.editedItem.org_faxNo
          json.org_code= Math.random().toString(36).substring(2, 8)
          json.org_isDeleted=false
          json.org_email=this.editedItem.user_email
          json.org_person= this.editedItem.user_firstname + " " + this.editedItem.user_lastname
          json.org_personNo=this.editedItem.user_contact

          axios.post('https://apis.soleet.my/ucux/organizations',json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)
          })

          .catch(error => {
            console.log(error);
          })

          // PIC info
          var json2 = {}
          json2.username=this.editedItem.user_email
          json2.firstName=this.editedItem.user_firstname
          json2.lastName=this.editedItem.user_lastname
          json2.email=this.editedItem.user_email
          json2.org=json.org_code
          json2.contact=this.editedItem.user_contact
          json2.password=uuid.v4()
          json2.user_role="org_adm"
          var roles="org_adm"

          axios.post('https://apis.soleet.my/r/register/password',json2,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log(response.data)

            // add role to user
            var json2 = {}
            json2.role=roles
            json2.user_id=response.data[1].id

            axios.post('https://apis.soleet.my/r/user/role',json2,
            {
                headers: { 
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(response2 => {
              console.log(response2.data)

              alert("Ask user to check the email to set password")
              window.location.reload()
            })

            .catch(error => {
              console.log(error);
            })
          })

          .catch(error => {
            console.log(error);
          })

         }
         this.close()
        },

    }
  }
</script>