<template>
	<div class="page">

		<!-- Page title - role title -->
    	<h1 class="margin-top-5">
			{{roles[$route.name].roleTitle}}
		</h1>

		<!-- What does Science Planning mean to me? -->
		<section class="usa-prose margin-top-5">
			<h3>
				What does the Annual Science Planning Process mean to me?
			</h3>
			<p class="font-sans-md">
				{{roles[$route.name].roleBody}}
			</p>
		</section>

		<!-- Center reviews - shown for employees only -->
		<section class="usa-prose margin-top-10" v-if="$route.name == 'employees'">
			<div class="usa-alert usa-alert--info usa-alert--no-icon" >
				<div class="usa-alert__body">
					<h3 class="usa-alert__heading">Center Reviews</h3>
					<p class="usa-alert__text">
						Annual center reviews are another way to focus attention on science and management concerns specifically from the field. These reviews are a critical source of information on the health and well-being of our centers. Typically held in the winter, these reviews provide direct input to bureau leaders as they develop guidance for the upcoming fiscal year. Your efforts and ideas play a vital role in maintaining cutting-edge science and the health of the USGS.
					</p>
				</div>
			</div>
		</section>


		<!-- Communication Updates? -->
		<section class="usa-prose margin-top-10">
			<h2>
				Communication Updates
			</h2>
			<p class="font-sans-md" v-html="roleCommunications"></p>
		</section>

		<!-- Activities? -->
		<section class="usa-prose margin-top-10">
			<h2>
				Activities for {{roles[$route.name].roleTitle}}
			</h2>

			<!-- Flag legend -->
			<div class="legend">
				<div class="font-sans-md margin-bottom-2">
           			<strong>The {{activityCounts.total}} activities below involve {{roles[$route.name].roleTitle}}.</strong>
				</div>
				<!-- Flag explanations only show if current role has activities matching -->
				<div class="font-sans-xs" v-if="activityCounts.accountable">
					The <strong>{{activityCounts.accountable}}</strong> marked with a <img src="@/assets/img/flag-red.png" title="Red Flag" alt="Red Flag"/> red flag are activities that <u>{{roles[$route.name].roleTitle}}<span v-if="roles[$route.name].roleTitle == 'executive'">' roles</span></u> are <strong>accountable</strong> for.
				</div>
            	<div class="font-sans-xs" v-if="activityCounts.responsible">
					The <strong>{{activityCounts.responsible - activityCounts.accountable}}</strong> marked with a <img src="@/assets/img/flag-navy.png" title="Black Flag" alt="Black Flag" /> black flag are activities that <u>{{roles[$route.name].roleTitle}}<span v-if="roles[$route.name].roleTitle == 'executive'">' roles</span></u> are <strong>responsible</strong> for.
				</div>	
			</div>

			<!-- Activity table -->
			<div class="activities-list margin-bottom-10">

				<!-- Table Header -->
				<div class="activities-list-header font-sans-md">
					<span class="title">Title</span>
					<span class="month">Month</span>
				</div>

				<!-- For each activity in filteredActivities -->
				<button class="activity font-sans-sm" v-for="activity in filteredActivities" :key="activity.title" v-on:click="openActivityModal(activity)">
					<!-- Flags -->
					<div class="activity-flag">
						<img src="@/assets/img/flag-red.png" title="Red Flag - Role is accountable for" alt="Red Flag" v-if="activity.isAccountable"/>
						<img src="@/assets/img/flag-navy.png" title="Navy Flag - Role is responsible for" alt="Red Flag" v-if="activity.isResponsible && !activity.isAccountable"/>
					</div>
					<!-- Title -->
					<span class="title">
						{{activity.title}} - for {{$store.getters.dates.fullCurrentYear + activity.fy}} budget
					</span>
					<!-- month -->
				    <span class="month">
						<div>
							<span>{{$store.getters.dates.months[activity.monthStart]}}</span>
							<span v-if="activity.monthDuration > 1"> - {{$store.getters.dates.months[activity.monthStart + activity.monthDuration - 1]}}</span>
						</div>
					</span>

				</button>

			</div>

		</section>


		<!-- Activity Modal Component -->
		<ActivityModal v-if="showActivityModal" v-on:activityModalClosed="showActivityModal = false" v-bind:activity="selectedActivity" v-bind:currentRole="roles[$route.name].roleTitle"></ActivityModal>


	</div>
</template>

<script>
// @ is an alias to /src
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import ActivityModal from "@/components/ui/ActivityModal";
import metaMixin from "@/components/mixins/metaMixin.js";
import axios from 'axios';


export default {
	name: "employes",

	components: {
		ActivityModal,
	},	


	mixins: [
		toastMixin,
		metaMixin,
	],

	data() {
		return {
			roleTitle: "",
			roleFilter: "",
			confluenceID: "",
			roleBody: "",
			roleCommunications: "Loading...",

			// Modal
			selectedActivity: null,
			showActivityModal: false,

			// Counts
			activityCounts: {
				responsible: 0,
				accountable: 0,
				total: 0,
			},

			// Data for each role
			roles: {
				executives: {
					roleTitle: "Executives",
					roleFilter: "director",
					confluenceID: "590939957",
					roleBody: "The USGS Director, Deputy Director, Associate Directors, and Regional Directors are collectively responsible for providing leadership and national strategic science direction in the USGS.  While critical interactions within and among mission areas and the field occur throughout the year, key milestone activities—like the Strategy Development Meeting in the fall and the Tactical Planning Meeting in the spring—represent the culmination of information from multiple inputs under each executive’s purview.",
				},
				coordinators: {
				    roleTitle: "Program Coordinators",
					confluenceID: "590939965",
					roleFilter: "Program Coordinators",
					roleBody: "Program Coordinators have the primary responsibility for the science direction and health of programs for which USGS received appropriations from Congress. To fulfill these responsibilities, Program Coordinators use varied mechanisms, such as program councils to gather internal and external input and feedback to inform program direction. They further use these processes to demonstrate accomplishments and to measure progress and program performance, all of which are essential to  provide critical input into mission area discussions and executive level meetings, such as the strategy development meeting in the fall and tactical planning meeting in the spring.",
				},
				budget: {
			        roleTitle: "Budget Planning",
					roleFilter: "Budget, Planning",
					confluenceID: "590939971",
					roleBody: "Budget planners throughout the USGS have different roles in relation to the Annual Science Planning Process.  Depending upon the scope and focus of budget planners, outputs at different points in science planning, including the identification of USGS priorities, resource planning, and accomplishments, become critical inputs into budget formulation, allocation, and performance processes.",
				},
				centerdirectors: {
			        roleTitle: "Center Directors",
					roleFilter: "Center Directors",
					confluenceID: "590939973",
					roleBody: "Center Directors have primary responsibility for the operational health and productivity of their centers. Center Directors are the primary connection from the field, and provide an essential conduit for understanding the needs of local and regional stakeholders as well as the breadth and depth of our research capabilities and capacity. Center Directors hold a key responsibility for documenting, tracking, reporting, and communicating information on project implementation, funding, and products—which become critical inputs for key science planning decisions throughout the process.",
				},
				employees: {
					roleTitle: "Center Employees",
					roleFilter: "employees",
					confluenceID: "596411251",
					roleBody: "The USGS Annual Science Planning Process is designed to maximize employee contributions along multiple pathways. Based on input from USGS employees, stakeholders, partners, the Department of the Interior, and the Administration, USGS leadership establishes overall mission direction and uses insights from the field as a stimulus for new ideas and opportunities. Your key avenue for communicating ideas and concerns is through your supervisor or center director. Input derived from day to day interactions between you, your center director and executives in the field are essential conduits of science planning across USGS.",
				}
			}
		};
	},

	created() {
		
	},

	mounted() {
		this.updateMeta(this.roles[this.$route.name].roleTitle + " - Science Planning", "");
		// Get communications function
		this.getCommunications();
	},

	computed: {
		filteredActivities: function () {
			let _this = this;
			let filtered = [];

			// Get current FY Month from store
			var FYMonth = this.$store.getters.dates.FYMonth;

			// For each activity
			// Loop gets only activities current role is *involved* in
			// Also checks which activities current role is accountable and responsible for
			_this.$store.getters.activities.forEach(function(activity) {

				// Set variables
				activity.isResponsible = false;
				activity.isAccountable = false;

				// If roles involved in activity include current role...
				if(activity.involved.toLowerCase().includes(_this.roles[_this.$route.name].roleFilter.toLowerCase())){

					// Check if current role is responsible (included in role field) or accountable
					if(activity.role.toLowerCase().includes(_this.roles[_this.$route.name].roleFilter.toLowerCase())){
						activity.isResponsible = true;
						// Count
						_this.activityCounts.responsible++;
					}
					if(activity.accountable.toLowerCase().includes(_this.roles[_this.$route.name].roleFilter.toLowerCase())){
						activity.isAccountable = true;
						// Count
						_this.activityCounts.accountable++;
					}
					// Count total
					_this.activityCounts.total++;

					// Push to filtered array
					filtered.push(activity);
				}
			});	

			// Return ordered by (lodash) filtered array
			return _.orderBy(filtered, ['monthStart'], ['asc']);
		},
	},
	
	methods: {
		// Get communication Updates from confluence
		getCommunications: function(){
			// CORS ANYWHERE var confluenceURL = 'https://cors-anywhere.herokuapp.com/https://my.usgs.gov/confluence/rest/api/content/';
			var confluenceURL = 'https://my.usgs.gov/confluence/rest/api/content/';
			var confluenceEnd = '?expand=body.storage';
			// var headers = {"Authorization": "Basic " +  window.btoa("svc_wim:6g7WU@#JO2tz^(XR9!Rp"), "Content-Type": "application/json", "Accept": "application/json"};
			var confluenceFullURL = confluenceURL + this.roles[this.$route.name].confluenceID + confluenceEnd;


			axios.get(confluenceFullURL).then(response => {
				// JSON responses are automatically parsed.
				this.roleCommunications = response.data.body.storage.value;
			})
			.catch(error => console.log(error))

		},

		// Open activity modal
		openActivityModal: function(activity){
			this.selectedActivity = activity;
			this.showActivityModal = true;
		},
	}
};

</script>


<style lang="scss">

	@import '~@/styles/variables.scss';


	.legend{
		div{
			display: block;
			img{
				display: inline-block; 
				height: 12px; 
				margin: 0 2px; 
				width: auto
			}
		}
	}

	#overviewDiagram{
		display: block;
		max-width: 100%;
		border: 1px solid var(--border);
		border-radius: 3px;
		box-shadow: var(--shadow);
		box-sizing: border-box;
		padding: 10px;
		background-color: white;
	}



</style>