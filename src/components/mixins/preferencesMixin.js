// Peferences Mixin
export default {
	methods: {
		/////////////////////////////
		//    Dark Mode Toggle    //
		///////////////////////////
		toggleDarkMode: function(mode){

			// If true/false argument passed
			if(mode != null){
				// If true, turn on
				if(mode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}

			}else{
				// Else simply toggle it
				if(this.$store.getters.userPreferences.darkMode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}
			}
		},
		////////////////////////
		// Toggle animations //
		//////////////////////
		toggleAnimations: function(){
			
			// Toggle no-animations class on body tag to toggle them
			if(this.$store.getters.userPreferences.animations){
				// Turn animations back on
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}else{
				// Turn animations off with no-animations class on body
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}
		},

		//////////////////////
		// Get Preferences //
		////////////////////
		// Get preferences from local storage if they exist
		getPrefs: function(){
			let _this = this;

			// Get prefs from local storage
			if (localStorage.getItem('user_preferences')){
				_this.$store.commit('userPreferences', JSON.parse(localStorage.getItem('user_preferences')));
			}else{

				// No dark mode saved, check device settings
				var currentPrefs = _this.$store.getters.userPreferences;
				// If dark system settings
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					_this.toggleDarkMode(true);
					currentPrefs["darkMode"] = true;
					_this.$store.commit('userPreferences', currentPrefs);
				}else{
					// Else set to false, which makes default theme light
					_this.toggleDarkMode(false);
					currentPrefs["darkMode"] = false;
					_this.$store.commit('userPreferences', currentPrefs);
				}
			}

			// Make changes based on gotten prefs
			_this.setPrefs();
		},
		//////////////////////
		// Set Preferences //
		////////////////////
		// Call this function to set preferences on UI based on value
		setPrefs: function(){
			// Start Page
			// Only load if user visits home
			// That way if they purposefully visit another URL directly, it won't switch it.
			if(this.$route.path == "/"){
				// Only reroute if it's NOT to '/' since it's already there.
				if(this.$store.getters.userPreferences.startPage && this.$store.getters.userPreferences.startPage != '/'){
					this.$router.push(this.$store.getters.userPreferences.startPage);
					document.documentElement.scrollTop = 0;
				}
			}
			

			// Dark mode
			if(this.$store.getters.userPreferences.darkMode){
				document.documentElement.setAttribute('data-theme', 'dark');
			}else{ // Else set light
				document.documentElement.setAttribute('data-theme', 'light');
			}
	
			// Animations
			if(this.$store.getters.userPreferences.animations != null && !this.$store.getters.userPreferences.animations){
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}else{
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}
		},

	}
};
