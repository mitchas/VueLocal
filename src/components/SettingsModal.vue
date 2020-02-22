<template>
	<div>
		<transition name="lightbox">
			<div class="lightbox" v-if="showModal"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="closeSettings()" v-if="showModal">

					<div class="modal">

						<!-- Close Modal (optional) -->
						<!-- <i class="far fa-times modal-close" @click="closeSettings()"></i> -->
						<!-- Header -->
						<div class="modal-title">Settings</div>
						<!-- Body Content -->
						<div class="modal-body" id="settingsBody">

							<!-- General Preferences -->
							<div class="settings-group">
								<div class="settings-body">
									<!-- UI Animations -->
									<div class="setting-toggle">
										<div class="setting-toggle-input">
											<input id="animationToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.animations" @change="toggleAnimations()"/>
										</div>
										<label class="setting-toggle-label" for="animationToggle">
											UI Animations
											<small>You can turn off the UI animations like the ones that transition between pages.</small>
										</label>
									</div>
									<!-- Email Address -->
									<div class="setting-toggle">
										<div class="setting-toggle-input">
											<input id="darkmodeToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()"/>
										</div>
										<label class="setting-toggle-label" for="darkmodeToggle">
											Dark Mode
										</label>
									</div>

									<!-- Clear local storage -->
									<div class="field-row" id="clearLocalStorage">
										<div class="field-body">
											<button class="button red small" type="button" aria-label="Clear Local Storage" @click="clearLocalStorage()">
												<span>Clear Local Storage</span>
												<i class="far fa-trash"></i>
											</button>
											<!-- Local storage help toggle -->
											<button id="localStorageHelpButton" @click="showLocalStorageHelp = !showLocalStorageHelp">
												<span v-if="!showLocalStorageHelp">More Info about local storage</span>
												<span v-else>Hide More Info</span>
												<i v-bind:class="{'far fa-chevron-down': !showLocalStorageHelp, 'far fa-chevron-up': showLocalStorageHelp}"></i>
											</button>
										</div>
									</div>

									<!-- Paragraph explaining local storage -->
									<transition name="basic">
										<div id="localStorageHelp" v-if="showLocalStorageHelp">
											<p>
												This site saves your preferences and data using your browser's local storage - which is basically just a file on <b>your</b> computer that this site can access every time you visit. None of the data ever leaves your computer.
											</p>
											<p>
												However, this means that anyone who visits this site on this computer and browser will be using your preferences and data. If you're on a shared computer, or just want to clear the local storage, click the button above.
											</p>
											<p>
												Note: user_preferences are set to their defaults in your local storage when the page loads again after clearing it.
											</p>
											<p v-if="localStorageString">
												Your local storage currently looks like this:
											</p>
											<!-- Code block to show existing local storage -->
											<div class="local-storage-code-display" v-if="localStorageString">
												<code>
													{{localStorageString}}
												</code>
											</div>
											
										</div>
									</transition>

								</div>
							</div>

						</div>
						<!-- Footer/Buttons -->
						<div class="modal-footer center">
							<!-- Close Modal -->
							<button class="button invert" type="button" aria-label="Close Settings" @click="closeSettings()">
								<span>Close Settings</span>
								<i class="far fa-times"></i>
							</button>
						</div>

					</div> <!-- End modal body -->

			</div>

		</transition>
	</div>
</template>

<script>
import metaMixin from "@/components/mixins/metaMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import navigateMixin from "@/components/mixins/navigateMixin.js";
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";
import toastMixin from "@/components/mixins/ui/toastMixin.js";

export default {
	name: "SettinigsModal",
	mixins: [
		metaMixin,
		toastMixin,
		preferencesMixin,
		navigateMixin,		
		scrollLockMixin,
	],
	data() {
		return {
			// Show settings modal, set to true on mounted.
			showModal: false,
			// Toggle help
			showLocalStorageHelp: false,
			// Variable to hold entire *string* of local storage for displaying to user
			localStorageString: JSON.stringify(this.getAllLocalStorage()).split('\\').join(''),
		};
	},
	mounted() {
		// Show modal, lock scroll
		this.showModal = true;
		this.scrollLock(true)
	},
	methods: {
		// Close modal, emit close
		closeSettings: function(){
			let _this = this;
			// Hide Modal
			_this.showModal = false;
			// Unlock Scroll
			_this.scrollLock(false)

			// Emit to hide component after 0.3s to account for transition
			setTimeout(function(){
				_this.$emit("settingsModalClosed");
			}, 300)
		},

		// Delete all items from local storage
		clearLocalStorage: function(){
			let _this = this;

			// Clear local storage
			localStorage.clear();

			// Toast
			_this.toast("Local Storage Cleared", "Your data & preferences have been cleared from your browser's local storage.", "", "far fa-trash-alt");

			// Close modal - this shows user an action,
			// Also forcing them to open settings again shows accurate localstorage string
			_this.closeSettings();
		},
		// This function returns all local storage data available
		getAllLocalStorage: function(){

			var values = [];
			var keys = Object.keys(localStorage);
			console.log(keys);
			var i = keys.length;

			while( i-- ){
				var item = {}
				item[keys[i]] = localStorage.getItem(keys[i])

				values.push(item);
			}

			return values;
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';


	// Individual groups of settings
	.settings-group{
		margin: 15px auto 15px auto;
	}

	
	// Horizontal row layout for toggles
	.setting-toggle{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 10px 0;
		width: 100%;
		position: relative;

		.setting-toggle-input{
			display: block;
			padding-right: 15px;
		}

		.setting-toggle-label{
			font-weight: 500;
			font-size: 14px;
			letter-spacing: 0.3px;
			display: block;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 16px;
			letter-spacing: 0.4px;
			font-weight: 600;

			small{
				font-size: 12px;
				font-weight: 400;
				line-height: 16px;
				padding-top: 2px;
				font-family: var(--systemFont);
			}
		}
		
	}


	

	// Field to clear local storage, everything inside
	#clearLocalStorage{
		margin-top: 20px;

		// Center content inside
		.field-body{
			text-align: left;
		}

		// More info button
		#localStorageHelpButton{
			display: inline-block;
			width: fit-content;
			color: var(--text);
			font-size: 13px;
			padding: 10px 0 10px 15px;

			i{
				margin-left: 5px;
			}
		}
	}

	// Local storage help
	#localStorageHelp{
		background-color: var(--background);
		box-sizing: border-box;
		padding: 10px;
		border-radius: var(--borderRadiusSmall);
		border: 1px solid var(--border);
		margin: 10px 0 0 0;

		p{
			display: block;
			padding: 0 0 10px 0;
			font-size: 12px;
			letter-spacing: 0.5px;
			font-weight: 400;
			line-height: 22px;
			letter-spacing: 0.2px;
			color: var(--textLightest);
		}
	}

	// Code display to show all local storage data
	.local-storage-code-display{
		box-sizing: border-box;
		padding: 0 25px 15px 25px;
		// background-color: var(--grey);
		// border-radius: var(--borderRadiusSmall);
		margin: 0 auto;

		code{
			font-family: monospace;
			display: block;
			box-sizing: border-box;
			padding: 5px 0;
			line-height: 22px;
		}

		pre{
			white-space: pre-wrap;
		}
	}



</style>