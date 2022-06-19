<template>
  <div v-if="role == 'org_adm'">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Report</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>

      <v-divider
        class="mx-2"
        inset
        horizontal
      ></v-divider>
    
<table>
  <tr>
    <dt>Type: </dt>
		<dd>'Unsafe Act'</dd>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>

  </div>

  <div v-else>
    <Home/>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Home from '@/views/Home.vue'

  export default {
    name: 'reports',
    components: {
      Home
    },
    data: () => ({
      dialog: false,
      role: localStorage.getItem("role"),
      jwt: localStorage.getItem("jwt"),
      headers: [
        { text: 'Date', align: 'left', value: 'report_date'},
        { text: 'Time', align: 'center', value: 'report_time' },
        { text: 'Location', align: 'center', value: 'report_location' },
        { text: 'Reporter', align: 'center', value: 'user_name' },
        { text: 'Project', align: 'center', value: 'project_id' },
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
      },
      defaultItem: {
        report_id:'',
        user_id:'',
        project_id: '',
        user_name: '',
        user_email: '',
        user_contact: '',
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
        axios.get('https://apis.soleet.my/ucux/reports')
      .then(response => {
        this.reports = response.data
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
          axios.delete(`https://apis.soleet.my/ucux/reports/${item.report_id}`)
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

        save () {
        if (this.editedIndex > -1) { //edit data 
          Object.assign(this.reports[this.editedIndex], this.editedItem)
          var json = {}
          json.id=this.editedItem.id //must include id for "put"
          json.report_date=this.editedItem.report_date
          json.report_time=this.editedItem.report_time
          json.report_location=this.editedItem.report_location
          json.user_name=this.editedItem.report_user_name
          json.project_id=this.editedItem.project_id
          json.report_risk=this.editedItem.report_risk
          json.report_type=this.editedItem.report_type
          json.report_status=this.editedItem.report_status

          axios.put(`https://apis.soleet.my/ucux/reports/${this.editedItem.reports_id}`,json,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          console.log(response);
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