<template>
	<div class="page full">

		<div class="calendar-nav">
			<!-- Filters -->
			<div class="cal-top-bar">
				<!-- Role Involved -->
				<div class="filter-item">
					<label class="font-sans-xs" for="involvedFilter">Role Involved</label>
					<select v-model="involvedFilter" id="involvedFilter">
						<option value="">All</option>
						<option value="Director">Director</option>
						<option value="Deputy Director">Deputy Director</option>
						<!-- <option value="associate director">Associate Directors</option> -->
						<option value="Associate Director for Budget, Planning, and Integration">Associate Director for Budget, Planning, and Integration</option>
						<option value="Associate Director for Communications and Publishing">Associate Director for Communications and Publishing</option>
						<option value="Associate Director for Office of Administration">Associate Director for Office of Administration</option>
						<option value="Mission Area Associate Directors">Mission Area Associate Directors</option>
						<option value="Regional Directors">Regional Directors</option>
						<option value="Center Directors">Center Directors</option>
						<option value="Budget Coordinators">Budget Coordinators</option>
						<option value="Program Coordinators">Program Coordinators</option>
						<!-- <option value="cost centers">Cost Centers</option> -->
						<option value="Congressional Liaison Officer">Congressional Liaison Officer</option>
						<option value="Members of councils and similar mechanisms">Members of councils and similar mechanisms</option>
						<option value="center employees">Center Employees</option>
					</select>
				</div>
				<!-- Activity Type -->
				<div class="filter-item">
					<label class="font-sans-xs" for="typeFilter">Activity Type</label>
					<select v-model="typeFilter" id="typeFilter">
						<option value="">All</option>
						<option value="communications">Communications</option>
						<option value="internal executive meeting">Internal Executive Meeting</option>
						<option value="formulation">Formulation</option>
						<option value="information synthesis">Information Synthesis</option>
						<option value="planning and performance">Planning & Performance</option>
						<option value="policy document">Policy Document</option>
						<option value="other">Other</option>
					</select>
				</div>
				<!-- Fiscal Year -->
				<div class="filter-item">
					<label class="font-sans-xs" for="fyFilter">Fiscal Year</label>
					<select v-model="fyFilter" id="fyFilter">
						<option value="">All</option>
						<option value="FY-1">{{this.$store.getters.dates.fullCurrentYear - 1}}</option>
						<option value="FY-0">{{this.$store.getters.dates.fullCurrentYear}}</option>
						<option value="FY+1">{{this.$store.getters.dates.fullCurrentYear + 1}}</option>
						<option value="FY+2">{{this.$store.getters.dates.fullCurrentYear + 2}}</option>
					</select>
				</div>
				<!-- Month -->
				<div class="filter-item">
					<label class="font-sans-xs" for="monthFilter">Month</label>
					<select v-model="monthFilter" id="monthFilter">
						<option value="">All</option>
						<option value="0">October</option>
						<option value="1">November</option>
						<option value="2">December</option>
						<option value="3">January</option>
						<option value="4">February</option>
						<option value="5">March</option>
						<option value="6">April</option>
						<option value="7">May</option>
						<option value="8">June</option>
						<option value="9">July</option>
						<option value="10">August</option>
						<option value="11">September</option>
					</select>
				</div>
				<!-- Clear Filters -->
				<div class="filter-item button">
					<button class="usa-button usa-button--primary" @click="fyFilter = ''; involvedFilter = ''; monthFilter = ''; typeFilter = ''" v-if="fyFilter || involvedFilter || monthFilter || typeFilter">
						Clear Filters
					</button>
				</div>
				
				<!-- Legend -->
				<div class="calendar-legend">
					<div class="legend-item" v-if="involvedFilter">
						<div class="marker accountable"></div>
						<label class="accountable">Accountable</label>
					</div>
					<div class="legend-item" v-if="involvedFilter">
						<div class="marker responsible"></div>
						<label class="responsible">Responsible</label>
					</div>
					<div class="legend-item">
						<div class="marker orange"></div>
						<label>Communications</label>
					</div>
					<div class="legend-item">
						<div class="marker yellow"></div>
						<label>Internal Executive Meeting</label>
					</div>
					<div class="legend-item">
						<div class="marker green"></div>
						<label>Formulation</label>
					</div>
					<div class="legend-item">
						<div class="marker red"></div>
						<label>Information Synthesis</label>
					</div>
					<div class="legend-item">
						<div class="marker purple"></div>
						<label>Planning & Performance</label>
					</div>
					<div class="legend-item">
						<div class="marker pink"></div>
						<label>Policy Document</label>
					</div>
					<div class="legend-item">
						<div class="marker blue"></div>
						<label>Other</label>
					</div>
					<div class="legend-item" v-if="involvedFilter || fyFilter">
						<div class="marker" style="background-color: #F2F0F3;"></div>
						<label>Filtered</label>
					</div>
				</div>
			</div>


			<!-- Actual Calendar View -->
			<div class="calendar-wrapper">
				<div class="calendar-view">

					<div class="cal-columns">

						<!-- Month Labels -->
						<div class="month-labels">
							<div class="month" v-for="month in $store.getters.dates.months" :key="month"><span>{{month}}</span></div>
						</div>

						<!-- Current Year // FY0 -->
						<!-- Current Year // FY0 -->
						<!-- Current Year // FY0 -->
						
						<!-- v-bind:class="getActivityClass(activity, index)" -->
						<div class="activity-wrapper">
							<div v-for="(activity, index)  in this.$store.getters.activities" :key="index" class="cal-activity"
								v-bind:class="getActivityClass(activity, index)"
								v-bind:style="{marginTop: (100 * activity.monthStart)+(10) + 'px', height: 80 + (100 * (activity.monthDuration - 1)) + 'px'}"
								@click="openActivityModal(activity)">
									<b>
										<img src="@/assets/img/flag-red.png" title="Red Flag - Role is accountable for" alt="Red Flag" id="accountableFlag"/>
										<img src="@/assets/img/flag-navy.png" title="Navy Flag - Role is responsible for" alt="Red Flag" id="responsibleFlag"/>
										{{activity.title}}
									</b>
									<span class="subtitle" v-if="activity.subtitle">{{getActivityFY(activity.subtitle)}}</span>
							</div>
						</div>

					</div>
				</div>


			</div>
		</div>

		<!-- Activity Modal Component -->
		<ActivityModal v-if="showActivityModal" v-on:activityModalClosed="showActivityModal = false" v-bind:activity="selectedActivity" v-bind:currentRole="involvedFilter"></ActivityModal>

	</div>
</template>

<script>
// @ is an alias to /src
import metaMixin from "@/components/mixins/metaMixin.js";
import axios from 'axios';
import ActivityModal from "@/components/ui/ActivityModal";

export default {
	name: "activities",

	components: {
		ActivityModal,
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
			involvedFilter: "",
			fyFilter: "",
			roleFilter: "",
			monthFilter: "",
			typeFilter: "",
			// Modal
			selectedActivity: null,
			showActivityModal: false,
		};
	},

	created() {
	},

	mounted() {
		this.updateMeta("Activities - Science Planning", "");
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
		// Converts string to readable FY Text
		getActivityFY: function(string){
			var readableString = string.replace("FY-0", this.$store.getters.dates.fullCurrentYear)
							.replace("FY-1", this.$store.getters.dates.fullCurrentYear - 1)
							.replace("FY+1", this.$store.getters.dates.fullCurrentYear + 1)
							.replace("FY+2", this.$store.getters.dates.fullCurrentYear + 2);
			return readableString;
		},
		// Generates class string for each activity calendar entry, based on index and other factors
		getActivityClass: function(activity, index){
			let _this = this;
			
			var classString = " ";
			classString = classString + activity.type.split(' ').join('-').toLowerCase();
			classString = classString + " a-" + index;

			var inv = "",
				rsp = "",
				acc = "",
				role = "",
				type = "",
				monthStart = activity.monthStart,
				duration = parseInt(activity.monthDuration) - 1,
				sub = " ";

			// Set values if they exist, split into arrays at br
			if(activity.involved){inv = activity.involved.toLowerCase().trim().split("<br/>");}
			if(activity.responsible){rsp = activity.responsible.toLowerCase().trim().split("<br/>");}
			if(activity.accountable){acc = activity.accountable.toLowerCase().trim().split("<br/>");}
			if(activity.type){type = activity.type.toLowerCase().trim().split("<br/>");}
			if(activity.subtitle){sub = activity.subtitle.toLowerCase().trim();}

			if(activity.role){role = activity.role.toLowerCase().split("<br/>");}

			// Fade if...
			var invFilter = _this.involvedFilter.toLowerCase().trim();

			if(
				(!inv.includes(invFilter) // "involved" does not include selected role dropdown
				&& !rsp.includes(invFilter) //  AND "responsible" does not include selected role dropdown
				&& !role.includes(invFilter) //  AND "responsible" does not include selected role dropdown
				&& !acc.includes(invFilter) ) // AND "accountable" does not include selected role dropdown
				|| (_this.fyFilter && !sub.includes(_this.fyFilter.toLowerCase().trim())) // OR if it's not in the selected FY Filter dropdown
				|| (_this.typeFilter && !type.includes(_this.typeFilter.toLowerCase().trim())) // OR if type doesn't match type filter
				|| (_this.monthFilter && ((_this.monthFilter > monthStart + duration) || (this.monthFilter < monthStart) )) // OR if not within month filter
			){
				classString = classString + " fade"; // Add fade string
			}

			// Add responsible and accountable flag classes
			if(_this.involvedFilter && role.includes(invFilter)){
				classString = classString + " responsible";
			}
			if(_this.involvedFilter && acc.includes(invFilter)){
				classString = classString + " accountable";
			}

			// Return final string
			return classString;
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



</style>