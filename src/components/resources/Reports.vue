<template>
  <div v-if="role == 'org_adm' || role == 'prj_adm'">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Forms Submitted</v-toolbar-title>
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

      <v-dialog v-model="dialog" max-width="100%">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4 v-show="false">
                  <v-text-field v-model="editedItem.report_id" label="Report ID"></v-text-field>
                  <v-text-field v-model="editedItem.report_org" label="Report ORG"></v-text-field>
                  <v-text-field v-model="editedItem.user_id" label="User ID"></v-text-field>
                  <v-text-field v-model="editedItem.project_id" label="Project ID"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <p v-if="editedItem.report_type==0" style="color:darkgrey;font-size:12px;">Type <br><span style="font-size:15px;border-bottom: 1px dashed;">Unsafe Act</span></p> 
                  <p v-else style="color:darkgrey;font-size:12px;">Type <br><span style="font-size:15px;border-bottom: 1px dashed;">Unsafe Condition</span></p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.report_risk" label="Risk" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.report_department" label="Department" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.project_id" label="Project" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.report_date" label="Date" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.report_time" label="Time" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.report_location" label="Location" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.user_name" label="Reporter" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.user_email" label="Reporter's email" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.user_contact" label="Reporter's contact" disabled></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <b>People At Risk Behaviours:</b> <p></p>
                  <input type="checkbox" id="people1" v-model="editedItem.report_people1"  disabled>
                  <label for="people1"> Annoyance and horseplay in the workplace</label> <p></p>
                  <input type="checkbox" id="people2" v-model="editedItem.report_people2"  disabled>
                  <label for="people2"> Removing safety guards from the workplace or equipment</label> <p></p>
                  <input type="checkbox" id="people3" v-model="editedItem.report_people3"  disabled>
                  <label for="people3"> Improper posture of task</label> <p></p>
                  <input type="checkbox" id="people4" v-model="editedItem.report_people4" disabled>
                  <label for="people4"> Risk of contact with electric current/hot surface/hot water</label> <p></p>
                  <input type="checkbox" id="people5" v-model="editedItem.report_people5" disabled>
                  <label for="people5"> Improper lifting, handling or moving object</label> <p></p>
                  <input type="checkbox" id="people6" v-model="editedItem.report_people6" disabled>
                  <label for="people6"> Working under the effect of alcohol/drugs etc</label> <p></p>
                  <input type="checkbox" id="people7" v-model="editedItem.report_people7" disabled>
                  <label for="people7"> Improper placing and stacking of object and material in dangerous location</label> <p></p>
                  <input type="checkbox" id="people8" v-model="editedItem.report_people8" disabled>
                  <label for="people8"> Others: </label>
                  <v-text-field v-model="editedItem.report_people9" v-if="editedItem.report_people8==true" label="" disabled></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <b>Tools and Equipment:</b> <p></p>
                  <input type="checkbox" id="tool1" v-model="editedItem.report_tool1"  disabled>
                  <label for="tool1"> Incorrect use of tools and equipment</label> <p></p>
                  <input type="checkbox" id="tool2" v-model="editedItem.report_tool2" disabled>
                  <label for="tool2"> No maintainance carried out</label> <p></p>
                  <input type="checkbox" id="tool3" v-model="editedItem.report_tool3" disabled>
                  <label for="tool3"> Inadequate procedure</label> <p></p>
                  <input type="checkbox" id="tool4" v-model="editedItem.report_tool4" disabled>
                  <label for="tool4"> Poor design</label> <p></p>
                  <input type="checkbox" id="tool5" v-model="editedItem.report_tool5" disabled>
                  <label for="tool5"> Use of defective tools and equipment</label> <p></p>
                  <input type="checkbox" id="tool6" v-model="editedItem.report_tool6" disabled>
                  <label for="tool6"> Deviate from procedure</label> <p></p>
                  <input type="checkbox" id="tool7" v-model="editedItem.report_tool7" disabled>
                  <label for="tool7"> Others: </label>
                  <v-text-field v-model="editedItem.report_tool8" v-if="editedItem.report_tool7==true" label="" disabled></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <b>Work Environment:</b> <p></p>
                  <input type="checkbox" id="work1" v-model="editedItem.report_work1"  disabled>
                  <label for="work1"> Poor ventilation</label> <p></p>
                  <input type="checkbox" id="work2" v-model="editedItem.report_work2" disabled>
                  <label for="work2"> Poor housekeeping</label> <p></p>
                  <input type="checkbox" id="work3" v-model="editedItem.report_work3" disabled>
                  <label for="work3"> Trip hazards</label> <p></p>
                  <input type="checkbox" id="work4" v-model="editedItem.report_work4" disabled>
                  <label for="work4"> Poor lighting</label> <p></p>
                  <input type="checkbox" id="work5" v-model="editedItem.report_work5" disabled>
                  <label for="work5">  Wet floor</label> <p></p>
                  <input type="checkbox" id="work6" v-model="editedItem.report_work6" disabled>
                  <label for="work6"> Others: </label>
                  <v-text-field v-model="editedItem.report_work7" v-if="editedItem.report_work6==true" label="" disabled></v-text-field>
                </v-flex>
                
                <v-flex xs6>
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                  <b>Image Before 1 </b>
                  <v-img v-if="editedItem.report_imgBefore1  && editedItem.report_imgBefore1!=' '" :src="editedItem.report_imgBefore1" aspect-ratio="1.0"></v-img>
                  <p v-else>No first "image before" <br/><br/>
                    <input type="file" :name="editedItem.report_imgBefore1" @change="_uploadImageAsync($event.target,'imgBefore1')" accept="image/*" class="input-file">
                  </p>
                </v-flex>
                <v-flex xs6>
                  <!-- <p></p> -->
                  <!-- {{editedItem.report_imgBefore2}} -->
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                  <b>Image Before 2 </b>
                  <v-img v-if="editedItem.report_imgBefore2  && editedItem.report_imgBefore2!=' '" :src="editedItem.report_imgBefore2" aspect-ratio="1.0"></v-img>
                  <p v-else>No second "image after" <br/><br/>
                    <input type="file" :name="editedItem.report_imgBefore2" @change="_uploadImageAsync($event.target,'imgBefore2')" accept="image/*" class="input-file">
                    <!-- <input type="file" :name="editedItem.report_imgBefore2" :disabled="isSaving" @change="previewImage" accept="image/*" class="input-file"> -->
                  </p>
                </v-flex>
                <v-flex xs6>
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                  <b>Image After 1 </b>
                  <v-img v-if="editedItem.report_imgAfter1  && editedItem.report_imgAfter1!=' '" :src="editedItem.report_imgAfter1" aspect-ratio="1.0"></v-img>
                  <p v-else>No first "image after" <br/><br/>
                    <input type="file" :name="editedItem.report_imgAfter1" @change="_uploadImageAsync($event.target,'imgAfter1')" accept="image/*" class="input-file">
                  </p>
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                </v-flex>
                <v-flex xs6>
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                  <!-- <p></p> -->
                  <b>Image After 2 </b>
                  <v-img v-if="editedItem.report_imgAfter2  && editedItem.report_imgAfter2!=' '" :src="editedItem.report_imgAfter2" aspect-ratio="1.0"></v-img>
                  <p v-else>No second "image after" <br/><br/>
                    <input type="file" :name="editedItem.report_imgAfter2" @change="_uploadImageAsync($event.target,'imgAfter2')" accept="image/*" class="input-file">
                  </p>
                  <v-divider
                    class="mx-2"
                    inset
                    horizontal
                  ></v-divider>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.report_description" label="Description" disabled></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.report_action" label="Action"></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <p><b>Status</b></p>
                  <input type="radio" id="escalate" value="0" v-model="editedItem.report_status">
                  <label for="escalate"> Escalate &nbsp;&nbsp;</label>
                  <input type="radio" id="open" value="1" v-model="editedItem.report_status">
                  <label for="open"> Open &nbsp;&nbsp;</label>
                  <input type="radio" id="closedByUser" value="2" v-model="editedItem.report_status">
                  <label for="closedByUser"> Closed by User &nbsp;&nbsp;</label>
                  <input type="radio" id="closedByAdmin" value="3" v-model="editedItem.report_status">
                  <label for="closedByAdmin"> Closed by Project Admin &nbsp;&nbsp;</label>
                  <!-- <v-text-field v-model="editedItem.report_status" label="Status"></v-text-field> -->
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
    </v-toolbar>
      <v-divider
        class="mx-2"
        inset
        horizontal
      ></v-divider>
    <v-data-table
      :headers="headers"
      :items="reports"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.project_id }}</td>
        <td class="text-xs-center">{{ props.item.report_date }}</td>
        <td class="text-xs-center">{{ props.item.report_time }}</td>
        <td class="text-xs-center">{{ props.item.report_location }}</td>
        <td class="text-xs-center">{{ props.item.report_department }}</td>
        <td class="text-xs-center">{{ props.item.user_name }}</td>
        <td class="text-xs-center">{{ props.item.report_risk }}</td>
        <td class="text-xs-center" v-if="props.item.report_type == 0">Unsafe Act</td>
        <td class="text-xs-center" v-else-if="props.item.report_type == 1">Unsafe Condition</td>
        <td class="text-xs-center" v-if="props.item.report_status == 0">Escalate</td>
        <td class="text-xs-center" v-else-if="props.item.report_status == 1">Open</td>
        <td class="text-xs-center" v-else-if="props.item.report_status == 2">Closed by User</td>
        <td class="text-xs-center" v-else-if="props.item.report_status == 3">Closed by Admin</td>
        
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
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
import moment from 'moment'
import Home from '@/views/Home.vue'
import { log } from 'util';

  export default {
    name: 'reports',
    components: {
      Home
    },
    data: () => ({
      role: localStorage.getItem("role"),
      org: localStorage.getItem("org"),
      token: localStorage.getItem("token"),
      search: '',
      dialog: false,
      tempTable: [],
      headers: [
        { text: 'Project', align: 'left', value: 'project_id' },
        { text: 'Date', align: 'center', value: 'report_date'},
        { text: 'Time', align: 'center', value: 'report_time' },
        { text: 'Location', align: 'center', value: 'report_location' },
        { text: 'Department', align: 'center', value: 'report_department' },
        { text: 'Reporter', align: 'center', value: 'user_name' },
        { text: 'Risk', align: 'center', value: 'report_risk' },
        { text: 'Type', align: 'center', value: 'report_type' },
        { text: 'Status', align: 'center', value: 'report_status' },
        { text: 'Actions', align: 'center', value: 'report_id', sortable: false }
      ],
      reports: [],
      editedIndex: -1,
      editedItem: {
        report_id:'',
        user_id:'',
        project_id: '',
        user_name: '',
        user_email: '',
        user_contact: '',
        report_org: '',
        report_date: '',
        report_time: '',
        report_type: '',
        report_risk: '',
        report_status: '',
        report_department:'',
        report_location: '',
        report_description: '',
        report_people1: '',
        report_people2: '',
        report_people3: '',
        report_people4: '',
        report_people5: '',
        report_people6: '',
        report_people7: '',
        report_people8: '',
        report_people9: '',
        report_tool1: '',
        report_tool2: '',
        report_tool3: '',
        report_tool4: '',
        report_tool5: '',
        report_tool6: '',
        report_tool7: '',
        report_tool8: '',
        report_work1: '',
        report_work2: '',
        report_work3: '',
        report_work4: '',
        report_work5: '',
        report_work6: '',
        report_work7: '',
        report_action: '',
        report_imgBefore1: '',
        report_imgBefore2: '',
        report_imgAfter1: '',
        report_imgAfter2: '',
        report_isDeleted:'',
      },
      defaultItem: {
        report_id:'',
        user_id:'',
        project_id: '',
        user_name: '',
        user_email: '',
        user_contact: '',
        report_org: '',
        report_date: '',
        report_time: '',
        report_type: '',
        report_risk: '',
        report_status: '',
        report_department:'',
        report_location: '',
        report_description: '',
        report_people1: '',
        report_people2: '',
        report_people3: '',
        report_people4: '',
        report_people5: '',
        report_people6: '',
        report_people7: '',
        report_people8: '',
        report_people9: '',
        report_tool1: '',
        report_tool2: '',
        report_tool3: '',
        report_tool4: '',
        report_tool5: '',
        report_tool6: '',
        report_tool7: '',
        report_tool8: '',
        report_work1: '',
        report_work2: '',
        report_work3: '',
        report_work4: '',
        report_work5: '',
        report_work6: '',
        report_work7: '',
        report_action: '',
        report_imgBefore1: '',
        report_imgBefore2: '',
        report_imgAfter1: '',
        report_imgAfter2: '',
        report_isDeleted: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Reports' : 'Edit Reports'
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
        axios.get(`https://apis.soleet.my/ucux/reports?filter[where][report_isDeleted]=false&filter[where][report_org]=${this.org}`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response1 => {
          let reports = response1.data
          if (this.role == 'org_adm') {
                this.reports = response1.data
              }
          let tempReport = []
          console.log(response1.data)

          if (this.role == 'prj_adm') {
            var userID = localStorage.getItem("userID")
            axios.get(`https://apis.soleet.my/ucux/user-projects?filter[where][user_id]=${userID}&filter[where][project_isAdmin]=true&filter[where][uproject_isDeleted]=false`, // users X reports assignment
            {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
            .then(response2 => {
              let tempTable = response2.data
              console.log(response2.data)

              reports.forEach(el => {
              Object.assign(el, {items: []})
                tempTable.forEach(to => {
                  if(to.project_no == el.project_id){
                    el.items.push(to)

                    tempReport.push(el)
                    console.log(tempReport)
                  }
                })
              })

                this.reports = tempReport
            })
            .catch(error => {
              console.log(error);
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
      },
      
    mounted(){
    this.initialize()
    },

      editItem (item) {
        this.editedIndex = this.reports.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        console.log(item)
        // var yesno =  confirm(`Are you sure you want to delete this item? = ${item.id}` ) && this.reports.splice(index, 1)
        var yesno =  confirm(`Are you sure you want to delete this item?`) 
        // confirm(yesno)
        if(yesno){
          const index = this.reports.indexOf(item)
          axios.delete(`https://apis.soleet.my/ucux/reports/${item.report_id}`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            this.reports = response.data.data
            console.log(response.data)
            alert('Delete successfully')
            this.initialize()
          })
          
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      previewImage(target,imgParam) {
            // Reference to the DOM input element
            var input = target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.editedItem['report_'+imgParam] = e.target.result;
                    console.log(e.target.result)
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
      },

      async _uploadImageAsync(target,imgParam) {
        // this.previewImage(target,imgParam)
        const uri = target.files

        console.log(uri)
        var data = new FormData();  
        data.append('files', uri[0]);

        var pic = '';
        await axios.post("https://apis.soleet.my/f/upload", data,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
            console.log("Path: " + response.data)
            pic = response.data
            this.editedItem['report_'+imgParam] = response.data.toString();
          })
          .catch(error => {
            console.log(error);
          })
        return pic;
      },

        save () {
        if (this.editedIndex > -1) { //edit data 
          Object.assign(this.reports[this.editedIndex], this.editedItem)
          var json = {}
          json.report_id=this.editedItem.report_id //must include id for "put"
          json.user_id=this.editedItem.user_id
          json.project_id=this.editedItem.project_id
          json.user_name=this.editedItem.user_name
          json.user_email=this.editedItem.user_email
          json.user_contact=this.editedItem.user_contact
          json.report_org=this.editedItem.report_org
          json.report_date=this.editedItem.report_date
          json.report_time=this.editedItem.report_time
          json.report_type=this.editedItem.report_type
          json.report_risk=this.editedItem.report_risk
          json.report_status=Number(this.editedItem.report_status)
          json.report_department=this.editedItem.report_department
          json.report_location=this.editedItem.report_location
          json.report_description=this.editedItem.report_description
          json.report_people1=this.editedItem.report_people1
          json.report_people2=this.editedItem.report_people2
          json.report_people3=this.editedItem.report_people3
          json.report_people4=this.editedItem.report_people4
          json.report_people5=this.editedItem.report_people5
          json.report_people6=this.editedItem.report_people6
          json.report_people7=this.editedItem.report_people7
          json.report_people8=this.editedItem.report_people8
          json.report_people9=this.editedItem.report_people9
          json.report_tool1=this.editedItem.report_tool1
          json.report_tool2=this.editedItem.report_tool2
          json.report_tool3=this.editedItem.report_tool3
          json.report_tool4=this.editedItem.report_tool4
          json.report_tool5=this.editedItem.report_tool5
          json.report_tool6=this.editedItem.report_tool6
          json.report_tool7=this.editedItem.report_tool7
          json.report_tool8=this.editedItem.report_tool8
          json.report_work1=this.editedItem.report_work1
          json.report_work2=this.editedItem.report_work2
          json.report_work3=this.editedItem.report_work3
          json.report_work4=this.editedItem.report_work4
          json.report_work5=this.editedItem.report_work5
          json.report_work6=this.editedItem.report_work6
          json.report_work7=this.editedItem.report_work7
          json.report_action=this.editedItem.report_action
          json.report_imgBefore1=this.editedItem.report_imgBefore1
          json.report_imgBefore2=this.editedItem.report_imgBefore2
          json.report_imgAfter1=this.editedItem.report_imgAfter1
          json.report_imgAfter2=this.editedItem.report_imgAfter2
          json.report_isDeleted=false

          axios.put(`https://apis.soleet.my/ucux/reports/${this.editedItem.report_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);
          alert("Update successfully")
        })
        .catch(error => {
          console.log(err);
        });
        } else { //create new
          
          }
          this.close()
        }

    }
  }
</script>