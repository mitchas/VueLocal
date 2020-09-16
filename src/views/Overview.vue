<template>
	<div class="page">

    	<p class="usa-intro margin-top-5">
            The USGS Annual Science Planning Process is designed to include the input from USGS employees, stakeholders, partners, the Department of the Interior, and the Administration. The breadth of information contributes to decisions on mission direction, program investments, and resource allocation to meet the needs of our customers.
		</p>

		

		<hr class="margin-top-5 margin-bottom-5"/>

		<div id="overviewDiagram" class="margin-bottom-2">
			<img src="@/assets/img/Overview_Diagram.png"/>
		</div>
        <a href="/img/Overview_Diagram_Detailed.png" target="_blank" class="usa-button usa-button--secondary margin-bottom-2">
			View Detailed Diagram
		</a>
        <a href="/img/Overview_Diagram.png" target="_blank"  class="usa-button usa-button--primary">
			Download Overview Diagram
		</a>

		<!-- What's my role? -->
		<section class="usa-prose margin-top-10 font-sans-md ">
			<h2>What's my role?</h2>
			<p>
				It is the collective responsibility of all USGS employees to ensure an effective and efficient science planning process. Employees in science and science support roles are all essential to document, track, report, and communicate information on project implementation, funding, and products to facilitate science planning. Visit the links at the top to learn more about specific roles or visit the activities tab to view the full calendar of science planning activities.
			</p>
		</section>


		<!-- Upcoming activities -->
		<section class="usa-prose margin-top-10 font-sans-md ">
			<h2>Upcoming Activities for {{$store.getters.dates.months[$store.getters.dates.FYMonth]}}</h2>
		</section>

		<section>
			<div class="activities-list">

				<div class="activities-list-header font-sans-md">
					<span class="title">Title</span>
					<span class="role">Activity Type</span>
				</div>

				<button class="activity font-sans-sm" v-for="activity in filteredActivities" :key="activity.title" @click="openActivityModal(activity)">
					<span class="title">
						{{activity.title}} - for {{$store.getters.dates.fullCurrentYear + activity.fy}} budget
					</span>
					<span class="role">{{activity.type}}</span>
				</button>

			</div>
		</section>


		<!-- Leadership Guidance -->
		<section class="usa-prose margin-top-10 font-sans-md ">
			<h2>USGS Leadership Guidance</h2>
			<div class="confluence-body font-sans-sm" v-html="confluenceData"></div>
			<!-- <p class="body" ng-bind-html="overviewCommunicationUpdates"></p>
			<div class="no-confluence" ng-if="!overviewCommunicationUpdates">
				Unable to connect to server.
			</div> -->
		</section>
		

		<!-- Activity Modal Component -->
		<ActivityModal v-if="showActivityModal" v-on:activityModalClosed="showActivityModal = false" v-bind:activity="selectedActivity"></ActivityModal>

	</div>
</template>

<script>
// @ is an alias to /src
import metaMixin from "@/components/mixins/metaMixin.js";
import ActivityModal from "@/components/ui/ActivityModal";
import axios from 'axios';
import navigateMixin from "@/components/mixins/navigateMixin.js";


export default {
	name: "overview",

	components: {
		ActivityModal,
	},

	mixins: [
		metaMixin,
		navigateMixin,
	],

	data() {
		return {
			confluenceData: "",
			// Modal
			selectedActivity: null,
			showActivityModal: false,
		};
	},

	created() {
		// Fixes routes for previous AngularJS app
		// ie /#/role/coordinators/ will redirect and load the component at /role/coordinators/
		if(this.$route.fullPath.includes("#/")){
			this.navigate(this.$route.fullPath.replace("#/", ""));
		}

		// Get confluence body
		axios.get("https://my.usgs.gov/confluence/rest/api/content/590942818?expand=body.storage").then(response => {
			// JSON responses are automatically parsed.
			this.confluenceData = response.data.body.storage.value;
		})
		.catch(error => console.log(error))
	},

	mounted() {
		this.updateMeta("Science Planning Overview", "");
	},

	computed: {
		filteredActivities: function () {
			let _this = this;
			let filtered = [];

			// Get current FY Month from store
			var FYMonth = this.$store.getters.dates.FYMonth;

			_this.$store.getters.activities.forEach(function(activity) {
				if(activity.monthStart == FYMonth){
					filtered.push(activity);
				}else if(activity.monthStart <= FYMonth && FYMonth <= (activity.monthStart + activity.monthDuration - 1)){
					filtered.push(activity);
				}
			});	

			// Filter by date?
			return _.orderBy(filtered, ['fy'], ['desc']);
		},
	},
	
	methods: {
		// Download full-size diagram
		downloadDiagram: function(){
			axios({
				method: 'get',
				url: this.url,
				responseType: 'arraybuffer'
			})
			.then(response => {
				this.forceFileDownload(response)
			})
			.catch(() => console.log('error occured'))
		},

		// Open activity modal to clicked activity
		openActivityModal: function(activity){
			this.selectedActivity = activity;
			this.showActivityModal = true;
		},
	}
};

</script>


<style lang="scss">

	@import '~@/styles/variables.scss';

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