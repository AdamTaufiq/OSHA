<template>
  <div class="greyBack">
    <v-toolbar flat color="white">
      <v-toolbar-title>UCUX Dashboard</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-divider
        class="mx-2"
        inset
        horizontal
      ></v-divider>
      <br/>

      <v-layout v-if="role == 'super_adm'">
        <template v-for="card in superItem">
            <v-flex xs6 md2 d-flex class="mx-3">
              <v-hover>
                <v-card :color="card.color" class="white--text" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`" @click="listOrg()">
                  <v-layout>
                    <v-flex xs5>
                      <v-icon x-large dark class="icon">{{card.icon}}</v-icon>
                    </v-flex>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{card.number}}</div>
                          <div>{{card.case}}</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-flex>
         </template>
      </v-layout>

      <v-layout v-if="role == 'org_adm'">
       <v-flex xs6>
       <v-layout row wrap>
        <template v-for="(card,index) in orgsItem">
            <v-flex xs5 class="mx-3 my-3"> 
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`" height="170px" @click="listOrgs(index)">
                    <v-layout justify-center column fill-height>
                      <v-flex xs12>
                        <v-card-title class="justify-center">
                          <h1>{{card.number}}</h1>
                        </v-card-title>
                      </v-flex>
                      <v-flex xs12>
                        <v-card-title primary-title class="justify-center">
                          <p class="headline">{{card.case}}</p>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                </v-card>
              </v-hover>
            </v-flex><!--mx-3-->
         </template>
         </v-layout>
       </v-flex>
       <v-flex xs6>
          <div class="mx-4" id="container" style="height: 400px"></div>
       </v-flex>
      </v-layout>

      <!--<v-layout v-if="role == 'org_adm'">
        <template v-for="(card,index) in orgItem">
            <v-flex xs12 md2 d-flex class="mx-3">
              <v-hover>
                <v-card :color="card.color" class="white--text" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`" @click="listDash(index-1, 'all')">
                  <v-layout>
                    <v-flex xs5>
                      <v-icon x-large dark class="icon">{{card.icon}}</v-icon>
                    </v-flex>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{card.number}}</div>
                          <div>{{card.case}}</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-flex>
         </template>
      </v-layout>-->
      
      <template v-if="role == 'org_adm'">
        <br/><br/>
        <v-container fluid grid-list-md>
          <v-data-iterator
            :items="projects"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <template v-slot:header>
              <v-toolbar
                  class="mb-2"
                  color="indigo darken-5"
                  dark
                  flat
              >
                <v-toolbar-title>Reports by Projects</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item="props">
              <v-flex xs12 sm6 md4 lg3>
                <v-card color="#00BFA5" @click="listDash('project', props.item.number)">
                  <v-card-title class="white--text"><h3>Project Name : {{ props.item.name }}</h3></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content><b>{{ props.item.items[0].name }}:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.items[0].data.length }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content><b>{{ props.item.items[1].name }}:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.items[1].data.length }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content><b>{{ props.item.items[2].name }}:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.items[2].data.length }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content><b>{{ props.item.items[3].name }}:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.items[3].data.length }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content><b>{{ props.item.items[4].name }}:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.items[4].data.length }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-container>
      </template>

      <template v-if="role == 'prj_adm'" v-for="project in projects">
        <h4 class="title" >Project : {{project.name}}</h4>
        <v-layout>
          <template v-for="(item,index) in project.items">
            <v-flex xs12 md2 d-flex class="mx-3">
              <v-hover>
                <v-card :color="item.color" class="white--text" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`" @click="listDash(index-1, project.name)">
                  <v-layout>
                    <v-flex xs5>
                      <v-icon x-large dark class="icon">{{item.icon}}</v-icon>
                    </v-flex>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{item.data.length}}</div>
                          <div>{{item.name}}</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-flex>
         </template>
        </v-layout>
      <br/><br/>
      </template]>

      <br/><br/>

      <v-card v-show="false"
        class="mt-3 mx-auto"
        max-width="400"
      >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">Forms Submission</div>
          <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">last submission 26 minutes ago</span>
        </v-card-text>
      </v-card>

    </div>
  </template>
</template>

<script>
import axios from 'axios'
import { log } from 'util';

  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm'
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240
      ],
      escalate: [],
      open: [],
      closeByUsr: [],
      closeByAdm: [],
      listProject: [],
      projects: [],
      orgItem: [
      {
        color: 'blue-grey darken-2', icon: 'assignment', number:'99', case: 'Reports Submitted'
      },
      {
        color: 'red darken-2', icon: 'error', number:'99', case: 'Case : Escalate'
      },
      {
        color: 'blue darken-2', icon: 'folder_open', number:'99', case: 'Case : Open'
      },
      {
        color: 'grey darken-2', icon: 'check', number:'99', case: 'Case : Closed by User'
      },
      {
        color: 'yellow darken-2', icon: 'check_box', number:'99', case: 'Case : Closed by Admin'
      }
      ],
      superItem: [
      {
        color: 'blue-grey darken-2', icon: 'location_city', number:'1', case: 'Organizations'
      }],
      orgsItem: [
      {
        color: 'blue darken-2', icon: 'timeline', number:'Connection Error', case: 'Projects'
      },
      {
        color: 'yellow darken-2', icon: 'contacts', number:'Connection Error', case: 'Users'
      },
      {
        color: 'grey darken-2', icon: 'account_box', number:'Connection Error', case: 'Projects Admins'
      },
      {
        color: 'blue-grey darken-2', icon: 'account_circle', number:'Connection Error', case: 'Organizations Admins'
      }
      ],
      role: localStorage.getItem("role"),
      org: localStorage.getItem("org"),
      token: localStorage.getItem("token"),
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
    }),
    methods: {
      getProject(){
        var userID = localStorage.getItem("userID")

        axios.get(`https://apis.soleet.my/ucux/user-projects?filter[where][user_id]=${userID}&filter[where][project_isAdmin]=true&filter[where][uproject_isDeleted]=false`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          // console.log(response.data)
          response.data.forEach(el => {
            this.listProject.push(el.project_no)
            this.projects.push({
              'name': el.project_no,
              'items': [
                {
                  'name': 'Reports Submitted',
                  'data': [],
                  'color': 'blue-grey darken-2', 
                  'icon': 'assignment',
                },
                {
                  'name': 'Escalate',
                  'data': [],
                  'color': 'red darken-2', 
                  'icon': 'error',
                },
                {
                  'name': 'Open',
                  'data': [],
                  'color': 'blue darken-2', 
                  'icon': 'folder_open',
                },
                {
                  'name': 'Closed by User',
                  'data': [],
                  'color': 'grey darken-2', 
                  'icon': 'check',
                },
                {
                  'name': 'Closed by Admin',
                  'data': [],
                  'color': 'yellow darken-2', 
                  'icon': 'check_box',
                }
              ]
            })
            console.log(this.projects)
          })
          console.log(this.listProject)

        })
        .catch(error => {
          console.log(error);
        })
      },

      getReport(){
        axios.get(`https://apis.soleet.my/ucux/reports`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          // console.log(response.data)
          let tempArray = []
          let tempEscalate = []
          let tempOpen = []
          let tempCloseByUsr = []
          let tempCloseByAdm = []

          response.data.forEach(el => {
            if (el.report_isDeleted == false && el.report_org == this.org) {
              tempArray.push(el)
            }
          })

          tempArray.forEach(element => {
            if (element.report_status == '0') {
              tempEscalate.push(element)
            }
            else if (element.report_status == '1') {
              tempOpen.push(element)
            }
            else if (element.report_status == '2') {
              tempCloseByUsr.push(element)
            }
            else if (element.report_status == '3') {
              tempCloseByAdm.push(element)
            }
          })


          this.listProject.forEach(el => {
            //console.log(tempEscalate)
            tempEscalate.forEach(element => {
              if (element.project_id == el) {
                let findProject = this.projects.find(item => item.name == el)
                findProject.items[0].data.push(element)
                findProject.items[1].data.push(element)
              }
            })
            tempOpen.forEach(element => {
              if (element.project_id == el) {
                let findProject = this.projects.find(item => item.name == el)
                findProject.items[0].data.push(element)
                findProject.items[2].data.push(element)
              }
            })
            tempCloseByUsr.forEach(element => {
              if (element.project_id == el) {
                let findProject = this.projects.find(item => item.name == el)
                findProject.items[0].data.push(element)
                findProject.items[3].data.push(element)
              }
            })
            tempCloseByAdm.forEach(element => {
              if (element.project_id == el) {
                let findProject = this.projects.find(item => item.name == el)
                findProject.items[0].data.push(element)
                findProject.items[4].data.push(element)
              }
            })
          })

          console.log(this.projects)
        })
        .catch(error => {
          console.log(error);
        })
      },

      getOrgItem(){
        axios.get(`https://apis.soleet.my/ucux/projects?filter[where][project_isDeleted]=false&filter[where][project_org]=${this.org}`,
        {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
        .then(response => {
          // console.log(response.data)
          response.data.forEach(el => {
            this.listProject.push(el.project_number)
            this.projects.push({
              'number': el.project_number,
              'name': el.project_name,
              'description': el.project_description,
              'items': [
                {
                  'name': 'Reports Submitted',
                  'data': [],
                  'color': 'blue-grey darken-2', 
                  'icon': 'assignment',
                },
                {
                  'name': 'Escalate',
                  'data': [],
                  'color': 'red darken-2', 
                  'icon': 'error',
                },
                {
                  'name': 'Open',
                  'data': [],
                  'color': 'blue darken-2', 
                  'icon': 'folder_open',
                },
                {
                  'name': 'Closed by User',
                  'data': [],
                  'color': 'grey darken-2', 
                  'icon': 'check',
                },
                {
                  'name': 'Closed by Admin',
                  'data': [],
                  'color': 'yellow darken-2', 
                  'icon': 'check_box',
                }
              ]
            })
            console.log(this.projects)
          })
          this.orgsItem[0].number = this.listProject.length
          //console.log(this.listProject)
        })
        .catch(error => {
          console.log(error);
        })

        axios
          .get(`https://apis.soleet.my/ucux/reports?filter[where][report_isDeleted]=false&filter[where][report_org]=${this.org}`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              //this.orgItem[0].number = response.data.count
              let tempArray = []
              let tempEscalate = []
              let tempOpen = []
              let tempCloseByUsr = []
              let tempCloseByAdm = []

              tempArray = response.data
              console.log(response.data)

              tempArray.forEach(element => {
                  if (element.report_status == '0') {
                    tempEscalate.push(element)
                  }
                  else if (element.report_status == '1') {
                    tempOpen.push(element)
                  }
                  else if (element.report_status == '2') {
                    tempCloseByUsr.push(element)
                  }
                  else if (element.report_status == '3') {
                    tempCloseByAdm.push(element)
                  }
              })

              this.orgItem[0].number = tempArray.length
              this.orgItem[1].number = tempEscalate.length
              this.orgItem[2].number = tempOpen.length
              this.orgItem[3].number = tempCloseByUsr.length
              this.orgItem[4].number = tempCloseByAdm.length
              this.donut3d()//graph DONUT

              this.listProject.forEach(el => {
                //console.log(tempEscalate)
                tempEscalate.forEach(element => {
                  if (element.project_id == el) {
                    let findProject = this.projects.find(item => item.number == el)
                    findProject.items[0].data.push(element)
                    findProject.items[1].data.push(element)
                  }
                })
                tempOpen.forEach(element => {
                  if (element.project_id == el) {
                    let findProject = this.projects.find(item => item.number == el)
                    findProject.items[0].data.push(element)
                    findProject.items[2].data.push(element)
                  }
                })
                tempCloseByUsr.forEach(element => {
                  if (element.project_id == el) {
                    let findProject = this.projects.find(item => item.number == el)
                    findProject.items[0].data.push(element)
                    findProject.items[3].data.push(element)
                  }
                })
                tempCloseByAdm.forEach(element => {
                  if (element.project_id == el) {
                    let findProject = this.projects.find(item => item.number == el)
                    findProject.items[0].data.push(element)
                    findProject.items[4].data.push(element)
                  }
                })
              })
              console.log(this.projects)
          })
          .catch(error => {
              console.log(error);
          })

        axios
          .get(`https://apis.soleet.my/ucux/users/count?where[user_isDeleted]&where[user_org]=${this.org}`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              this.orgsItem[1].number = response.data.count
              //console.log(response.data)
          })
          .catch(error => {
              console.log(error);
          })

        axios
          .get(`https://apis.soleet.my/ucux/users/count?where[user_isDeleted]&where[user_org]=${this.org}&where[user_role]=prj_adm`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              this.orgsItem[2].number = response.data.count
              //console.log(response.data)
          })
          .catch(error => {
              console.log(error);
          })

        axios
          .get(`https://apis.soleet.my/ucux/users/count?where[user_isDeleted]&where[user_org]=${this.org}&where[user_role]=org_adm`,
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              this.orgsItem[3].number = response.data.count
              //console.log(response.data)
          })
          .catch(error => {
              console.log(error);
          })

      },

      getSuperItem(){
        axios
          .get('https://apis.soleet.my/ucux/organizations/count?where[org_isDeleted]',
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              this.superItem[0].number = response.data.count
              console.log(response.data.count)
          })
          .catch(error => {
              console.log(error);
          })

        axios
          .get('https://apis.soleet.my/ucux/users/count?where[user_isDeleted]',
          {
              headers: { 
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(response => {
              this.superItem[1].number = response.data.count
              console.log(response.data.count)
          })
          .catch(error => {
              console.log(error);
          })
      },

      listDash(index, project){
        if(index == -1 && this.role == 'org_adm') {
          this.$router.push(`/reports`)
        }
        else{
          this.$router.push(`/reports/${project.replace('/',':')}/${index}`)
        }
      },

      listOrg(){
        this.$router.push(`/organizations`)
      },

      listOrgs(index){
        if(index == 0) {
          this.$router.push(`/projects`)
        }
        if(index == 1) {
          this.$router.push(`/users`)
        }
      },

      donut3d(){
        Highcharts.chart('container', {
            chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
            },
            title: {
              text: 'Total Reported Case'
            },
            subtitle: {
              text: this.orgItem[0].number + ' in Total'
            },
            plotOptions: {
                pie: {
                  innerSize: 100,
                  depth: 45
                }
            },
            series: [{
                name: 'Submitted amount',
                data: [
                  [this.orgItem[1].case, parseInt(this.orgItem[1].number)],
                  [this.orgItem[2].case, parseInt(this.orgItem[2].number)],
                  [this.orgItem[3].case, parseInt(this.orgItem[3].number)],
                  [this.orgItem[4].case, parseInt(this.orgItem[4].number)]
                ]
          }]
        });//HighChart
        
      }


    },//method

    mounted() {
      if(this.role == 'prj_adm')
      {
        this.getProject()
        this.getReport()
      }
      if(this.role == 'org_adm')
      {
        this.getOrgItem()
      }
      if(this.role == 'super_adm')
      {
        this.getSuperItem()
      }
      
    }//mounted
    //maybe boleh try ni https://codepen.io/madyanalj/pen/QxwBxo
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  h4 {
    padding-bottom: 1.0rem;
    padding-left: 1.9rem;
    font-style: oblique;
  }
  .icon {
    padding-top: 1.0rem;
    padding-left: 1.0rem;
  }
  .greyBack {
    background-color: #CDCDCD;
  }

</style>