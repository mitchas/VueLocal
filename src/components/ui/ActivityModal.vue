<template>
	<div>

		<transition name="lightbox">
			<div class="lightbox" v-if="showModal"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="closeActivityModal()" v-if="showModal">

				<div class="modal">

					<!-- Header -->
					<div class="modal-title">
						<div>{{activity.title}}</div>
						<div class="activity-fy">{{getActivityFY(activity.subtitle)}}</div>
						<!-- Other activity infoo -->
						<div class="activity-meta">
							<!-- Type -->
							<div class="tag" v-bind:class="getTypeColor(activity.type)">
								{{activity.type}}
							</div>
							<!-- Dates -->
							<div class="month">
								<span>
									<span>{{$store.getters.dates.months[activity.monthStart]}}</span>
									<span v-if="activity.monthDuration != 1"> - {{$store.getters.dates.months[(activity.monthStart + (activity.monthDuration - 1))]}}</span>
								</span>
							</div>
						</div>
					</div>

					<!-- Body Content -->
					<div class="modal-body">
						<!-- Description -->
						<section class="usa-prose margin-top-1 font-sans-xs" v-if="activity.description != ''">
							<p v-html="activity.description"></p>
						</section>
						<hr class="margin-top-2" v-if="activity.description != ''"/>
						<!-- Grid display -->
						<div class="list-block margin-top-2">
							<!-- Accountable -->
							<div class="list" v-if="activity.accountable">
								<label>Who is accountable?</label>
								<ul class="font-sans-xs">
									<li v-for="item in splitBR(activity.accountable)" :key="item" v-html="item"></li>
								</ul>
							</div>
							<!-- Responsible -->
							<div class="list" v-if="activity.role">
								<label>Who is responsible?</label>
								<ul class="font-sans-xs">
									<li v-for="item in splitBR(activity.role)" :key="item" v-html="item"></li>
								</ul>
							</div>
							<!-- Involved -->
							<div class="list" v-if="activity.involved">
								<label>Who is Involved?</label>
								<ul class="font-sans-xs">
									<li v-for="item in splitBR(activity.involved)" :key="item" v-html="item"></li>
								</ul>
							</div>
						</div>
					</div>

					<!-- Footer/Buttons -->
					<div class="modal-footer center">
						<!-- Close Modal -->
						<button class="usa-button usa-button--secondary" type="button" aria-label="Close Window" @click="closeActivityModal()">
							<span>Close</span>
						</button>
					</div>

				</div> <!-- End modal body -->

			</div>

		</transition>
	</div>
</template>


<script>
import metaMixin from "@/components/mixins/metaMixin.js";
import navigateMixin from "@/components/mixins/navigateMixin.js";
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";

export default {
	name: "ActivityModal",
	mixins: [
		scrollLockMixin,
	],
	props: ['activity', 'currentRole'],
	data() {
		return {
			// Show activity modal, set to true on mounted.
			showModal: false,
		};
	},
	mounted() {
		// Show modal, lock scroll
		this.showModal = true;
		this.scrollLock(true)
	},
	computed: {
	},
	methods: {
		// Close modal, emit close
		closeActivityModal: function(){
			let _this = this;
			// Hide Modal
			_this.showModal = false;
			// Unlock Scroll
			_this.scrollLock(false)

			// Emit to hide component after 0.3s to account for transition
			setTimeout(function(){
				_this.$emit("activityModalClosed");
			}, 300)
		},

		// Converts string to readable FY Text
		getActivityFY: function(string){
			var readableString = string.replace("FY-0", this.$store.getters.dates.fullCurrentYear)
							.replace("FY-1", this.$store.getters.dates.fullCurrentYear - 1)
							.replace("FY+1", this.$store.getters.dates.fullCurrentYear + 1)
							.replace("FY+2", this.$store.getters.dates.fullCurrentYear + 2);
			return readableString;
		},

		// Pass (type) from activity, get associated category color
		getTypeColor: function(string){
			var type = string.toLowerCase();

			if(type == "communications"){
				return "orange";
			}else if(type == "internal executive meeting"){
				return "yellow";
			}else if(type == "formulation"){
				return "green";
			}else if(type == "information synthesis"){
				return "red";
			}else if(type == "planning and performance"){
				return "purple";
			}else if(type == "policy document"){
				return "pink";
			}else if(type == "other"){
				return "blue";
			}

		},

		// Split string at <br/>
		splitBR: function(string){
			var _this = this;
			// Hold split string
			var filtered = [];

			if(string){

				var split = string.split('<br/>');
				var i = 0;
				split.forEach(function(activity) {
					// If matches current role, highlight it with em
					if(_this.currentRole && activity.trim() == _this.currentRole.replace("<br/>", "").trim()){
						filtered.push("<em>" + activity + "</em>")
					}else{
						// Else just add to filtered array
						filtered.push(activity);
					}
					// Counter
					i++;
				});	

				// Return modified array
				return filtered;
			}else{
				return "";
			}
		}
	}
};
</script>

<style lang="scss">

	@import '~@/styles/variables.scss';

	// Activity FY subtitle
	.activity-fy{
		font-size: 12px;
		font-weight: 500;
	}
	// Meta in modal header, below title
	.activity-meta{
		font-size: 13px;
		font-weight: 400;
		display: flex;
		margin-top: 2px;
		// border-top: 1px solid var(--border);
		padding-top: 2px;

		div{
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-right: 25px;

			span{
				display: inline-block;
			}

			&.month{
				font-weight: 700;
				white-space:pre;
			}

			&.tag{
				border: 1px solid rgba(0,0,0,0.2);
				border-radius: 4px;
				box-sizing: border-box;
				padding: 0px 8px;
				font-weight: 600;
				background-color: var(--altBackground);

				&.orange{background-color: $cal-orange;}
				&.yellow{background-color: $cal-yellow;}
				&.green{background-color: $cal-green;}
				&.red{background-color: $cal-red;}
				&.purple{background-color: $cal-purple;}
				&.pink{background-color: $cal-pink;}
				&.blue{background-color: $cal-blue;}
			}
		}
	}

	// List block in modal body to show role responsibilities
	.list-block{
		display: flex;
		flex-wrap: wrap;

		.list{
			display: block;
			width: 50%;
			margin-bottom: 15px;
			flex-grow: 3;

			label{
				font-weight: 700;
			}

			ul{
				margin: 6px 0 0 0;

				em{
					background-color: $cal-yellow;
					font-style: normal;
				}
			}

		}
	}


</style>