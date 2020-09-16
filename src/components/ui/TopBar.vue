<template>
	<span>
		<!-- USWDS Government Banner -->
		<section class="usa-banner" aria-label="Official government website">
  			<div class="usa-accordion">
    			<header class="usa-banner__header">
      				<div class="usa-banner__inner">
       					<div class="grid-col-auto">
          					<img class="usa-banner__header-flag" src="@/assets/img/us_flag_small.png" alt="U.S. flag">
        				</div>
						<div class="grid-col-fill tablet:grid-col-auto">
							<p class="usa-banner__header-text">An official website of the United States government</p>
							<p class="usa-banner__header-action" aria-hidden="true">Here’s how you know</p>
        				</div>
        				<button class="usa-accordion__button usa-banner__button" aria-expanded="false" aria-controls="gov-banner">
          					<span class="usa-banner__button-text">Here’s how you know</span>
        				</button>
     		 		</div>
    			</header>
    			<div class="usa-banner__content usa-accordion__content" id="gov-banner">
      				<div class="grid-row grid-gap-lg">
        				<div class="usa-banner__guidance tablet:grid-col-6">
          					<img class="usa-banner__icon usa-media-block__img" src="@/assets/img/icon-dot-gov.svg" role="img" alt="Dot gov">
          					<div class="usa-media-block__body">
								<p>
									<strong>Official websites use .gov</strong>
									<br/>
									A <strong>.gov</strong> website belongs to an official government organization in the United States.
            					</p>
          					</div>
        				</div>
        				<div class="usa-banner__guidance tablet:grid-col-6">
          					<img class="usa-banner__icon usa-media-block__img" src="@/assets/img/icon-https.svg" role="img" alt="Https">
          					<div class="usa-media-block__body">
           	 					<p>
              						<strong>Secure .gov websites use HTTPS</strong>
									<br/>
              						A <strong>lock</strong> (
									<span class="icon-lock"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64" class="usa-banner__lock-image" role="img" aria-labelledby="banner-lock-title banner-lock-description"><title id="banner-lock-title">Lock</title><desc id="banner-lock-description">A locked padlock</desc><path fill="#000000" fill-rule="evenodd" d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"/></svg></span>
									) or <strong>https://</strong> means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.

            					</p>
          					</div>
        				</div>
      				</div>
    			</div>
  			</div>
		</section>


		<!-- 
			===========================
			USGS Bar
			===========================
		-->
		<div id="usgsBar">
			<!-- Branding - Logo -->
			<div id="branding">
				<a id="logo" href="https://usgs.gov" target="_blank">
					<img src="@/assets/img/USGS_Logo.png" alt="USGS Logo"/>
				</a>
			</div>
		</div>

		<!-- 
			===========================
			Title and nav Bar
			===========================
		-->
		<div id="appBar" :class="{'unstick': $route.name == 'activities'}">
			<!-- Title -->
			<div id="appTitle">Annual Science Planning Process - {{$store.getters.dates.fullCurrentYear}}</div>
			<!-- Links -->
			<div id="appNav" class="no-scrollbars">
				<button class="nav-item" @click="navigate('/')" aria-label="Home" v-bind:class="{'active': $route.path == '/'}">
					Overview
				</button>
				<button class="nav-item" @click="navigate('/activities/')" aria-label="Activities" v-bind:class="{'active': $route.name == 'activities'}">
					Activities
				</button>
				<button class="nav-item" @click="navigate('/role/employees/')" aria-label="Employees" v-bind:class="{'active': $route.name == 'employees'}">
					Employees
				</button>
				<button class="nav-item" @click="navigate('/role/centerdirectors/')" aria-label="Center Directors" v-bind:class="{'active': $route.name == 'centerdirectors'}">
					Center Directors
				</button>
				<button class="nav-item" @click="navigate('/role/coordinators/')" aria-label="Program Coordinators" v-bind:class="{'active': $route.name == 'coordinators'}">
					Program Coordinators
				</button>
				<button class="nav-item" @click="navigate('/role/budget/')" aria-label="Budget Planners" v-bind:class="{'active': $route.name == 'budget'}">
					Budget Planners
				</button>
				<button class="nav-item" @click="navigate('/role/executives/')" aria-label="Executives" v-bind:class="{'active': $route.name == 'executives'}">
					Executives
				</button>
			</div>
		</div>
	</span>
</template>

<script>
import navigateMixin from "@/components/mixins/navigateMixin.js";


export default {
	name: "Sidebar",
	mixins: [
		navigateMixin,
	],
	components: {
	},
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="scss">

	@import '~@/styles/variables.scss';

	// USGS Bar - Dark blue, usgs logo
	#usgsBar{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		height: 70px;
		// position: sticky;
		top: 0px;
		background: var(--usgsBlue);
		z-index: 50;

		&:after{
			content: ' ';
			width: 0px;
			height: 0px;
			position: absolute;
			opacity: 0;
			transition: all 0s ease 0.22s, opacity 0.22s ease;
		}


		// Adjust padding on larger screens
		@media (min-width: $screenMD) {
			padding: 0 35px;
		}

		// Logo
		#branding{
			display: flex;
			flex-direction: column;
			justify-content: center;

			#logo{
				// transform: scale(1.0);
				transition: var(--transition);

				img{
					height: 50px;
					width: auto;
					margin-top: 4px;
				}

				&:hover{
					transition: var(--transition);
					cursor: pointer;
					// transform: scale(0.975);
				}
			}
		}
	}

	// Title and nav bar
	#appBar{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		padding: 0;
		box-sizing: border-box;
		height: 100px;
		background: var(--altBackground);
		padding: 0 0;
		border-bottom: 1px solid var(--border);
		z-index: 50;
		position: sticky;
		top: 0px;
		box-shadow: var(--shadow);

		&.unstick{
			position: unset;
			box-shadow: none;
		}

		// Shrink and reduce padding
		@media (max-width: $screenMD) {
			padding: 0;
		}

		#appTitle{
			width: 100%;
			box-sizing: border-box;
			height: 50px;
			padding: 0 35px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 18px;
			font-weight: 700;
			border-bottom: 1px solid var(--borderHover);

			// Shrink and reduce padding
			@media (max-width: $screenMD) {
				padding: 0 20px;
				height: 40px;
				font-size: 16px;
			}
		}

		#appNav{
			display: flex;
			flex-grow: 3;
			height: 50px;

			// Shrink and reduce padding
			@media (max-width: $screenLG) {
				overflow: auto;
			}

			.nav-item{
				background-color: transparent;
				border: none;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;
				font-size: 15px;
				font-weight: 600;
				padding: 0;
				margin: 0 15px;
				border-top: 3px solid transparent;
				border-bottom: 3px solid transparent;
				transition: var(--transition);

				&:first-child{
					margin-left: 20px;
					// Adjust padding on larger screens
					@media (min-width: $screenMD) {
						margin-left: 35px;
					}
				}
				&:last-child{
					padding-right: 20px;
				}

				// Shrink and reduce padding
				@media (max-width: $screenLG) {
					white-space: nowrap;
					font-size: 14px;
					margin: 0 10px;
				}
				@media (max-width: $screenMD) {
					// margin: 0;
					font-size: 13.5px;
					white-space: nowrap;
					// height: 50%;
				}

				&:hover{
					cursor: pointer;
					border-bottom-color: var(--grey);
					transition: var(--transition);
				}

				&.active{
					color: var(--blue);
					border-bottom: 3px solid var(--blue);
				}
			}
		}
	}

</style>