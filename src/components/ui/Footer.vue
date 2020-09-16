<template>
	<footer id="footer" aria-label="Footer">

		<div class="footer-links font-sans-xs">
			<a href="https://www.doi.gov/privacy" target="_blank">Privacy Policy</a>
			<a href="/policies-and-notices" target="_blank">Legal</a>
			<a href="/accessibility-and-us-geological-survey" target="_blank">Accessibility</a>
			<a href="/sitemap" target="_blank">Site Map</a>
			<a href="https://answers.usgs.gov/" target="_blank">Contact USGS</a>
		</div>
		<div class="footer-links font-sans-xs">
			<a href="https://www.doi.gov/" target="_blank">U.S. Department of the Interior</a>
			<a href="https://www.doioig.gov/" target="_blank">DOI Inspector General</a>
			<a href="https://www.whitehouse.gov/" target="_blank">White House</a>
			<a href="https://www.whitehouse.gov/omb/management/egov/" target="_blank">E-Gov</a>
			<a href="https://usa.gov" target="_blank">USA.gov</a>
			<a href="https://www.doi.gov/pmb/eeo/no-fear-act" target="_blank">No FEAR Act Data</a>
			<a href="/about/organization/science-support/foia" target="_blank">FOIA</a>
		</div>

	</footer>
</template>

<script>
export default {
	name: "Sidebar",
	mixins: [
	],
	data() {
		return {
		};
	},
	mounted() {
	},
	methods: {
	}
};
</script>

<style lang="scss">

	@import '~@/styles/variables.scss';

	footer#footer{
		display: block;
		height: auto;
		z-index: 40;
		width: 100%;
		box-sizing: border-box;
		padding: 25px 25px; 
		background-color: var(--usgsBlue);

		@media (max-width: $screenMD) {
		}

		.footer-links{
			margin: 10px 0;

			a{
				color: var(--white);
				text-decoration-color: rgba(255,255,255,0.75);
				display: inline-block;
				margin: 0 10px 5px 0;

				&:hover{
					text-decoration-color: rgba(255,255,255,1);
				}
			}
		}


	} // End Sidebar
	
</style>