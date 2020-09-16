// App Base 
<template>
	<!-- <div id="app"> -->
	<div id="app">
		<transition name="load">

			<div class="app-wrapper" v-if="pageMounted">

				<!-- Top bar component -->
				<!-- Logo, account dropdown, etc -->
				<TopBar></TopBar>

				<!-- All page content contained within main -->
				<main id="content">

					<!-- Sidebar Component -->
					<!-- <Sidebar></Sidebar> -->
				
					<!-- Center/Main Content -->
					<div class="body-content no-sidebar">
						<!-- page transition defined in base.scss -->
						<transition name="page" mode="out-in">
							<router-view :key="$route.fullPath" />
						</transition>
					</div>
					
				</main>

				<!-- Footer -->
				<Footer></Footer>

				<!-- Toast Component -->
				<Toast ref="toastComponent"></Toast>

			</div>
		</transition>
	</div>
</template>


<script>
// Components
import Toast from "@/components/ui/Toast";
import TopBar from "@/components/ui/TopBar";
import Footer from "@/components/ui/Footer";
// import Sidebar from "@/components/ui/Sidebar";
// Mixins
import navigateMixin from "@/components/mixins/navigateMixin.js";



export default {
	name: "app",
	mixins: [
		navigateMixin,
	],
	components: {
		Toast,
		TopBar,
		Footer,
		// Sidebar
	},
	data() {
		return {
			scrollLockPos: 0,
			pageMounted: false,
			thisYear: '2012',
			
		};
	},
	created: function () {

		// Get current month in FY
    	var d = new Date();
		var regularMonth = d.getMonth() + 3;
		if(regularMonth > 11){regularMonth = regularMonth - 12}
    	this.$store.getters.dates.FYMonth = regularMonth;
    	// $scope.currentTextMonthInFiscalYear = $scope.months[$scope.currentMonthInFiscalYear];


		
	},
	computed: {
  	},
	watch: {
	},
	mounted() {
		this.pageMounted = true;
	},
	beforeDestroy() { 
	},
	methods: {

		//////////////////
		//    Toast    //
		////////////////
		// This forwards the toast content to the component, which displays it
		relayToast: function(title, body, color, icon) {
			this.$refs.toastComponent.showToast(title, body, color, icon);
		},

	}
};
</script>

<style lang="scss">
	@import '~@/styles/variables.scss';

	#app {
		display: block;
		width: 100%;
		margin: 0;
		min-height: 100%;
		box-sizing: border-box;
		min-height: 100%;

		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			min-height: 100%;
			display: block;
		}

	}


	//////////////////////////////
	//    Main Content         //
	////////////////////////////
	main#content{
		box-sizing: border-box;
		padding-right: 0;
		z-index: 60;
		display: flex;
		min-height: 85vh;
		min-height: calc(100% - 92px);


		// Main body content
		// Main body content
		// Main body content
		.body-content{
			box-sizing: border-box;
			padding: 0;
			flex-grow: 3;
			min-height: 90vh;
			// to account for header
			min-height: calc(100% - 100px);

			@media (min-width: $screenMD) {
				padding-left: 45px;
				padding-right: 35px;
			}
			@media (min-width: $screenLG) {
				padding-left: 60px;
			}
			@media (min-width: $screenXL) {
				padding-left: 70px;
				padding-right: 45px;
			}

			// No sidebar
			&.no-sidebar{
				@media (min-width: $screenMD) {
					padding: 0 0;
				}
				@media (min-width: $screenLG) {
					padding-left: 0px;
				}
				@media (min-width: $screenXL) {
					padding: 0 0;
				}
			}
		}
	}


</style>
