import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Overview from './views/Overview.vue';
import Activities from './views/Activities.vue';
// Roles
import Role from './views/Role.vue';

// Authentication
import Error404 from './views/other/error404.vue';

import { store } from '@/store/store'

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: '/',
			name: 'overview',
			component: Overview,
		},
		// Activities
		{
			path: '/activities/',
			name: 'activities',
			component: Activities,
		},
		// Roles
		{
			path: '/role/employees',
			name: 'employees',
			component: Role,
		},
		{
			path: '/role/centerdirectors',
			alias: '/role/#centerdirectors',
			name: 'centerdirectors',
			component: Role,
		},
		{
			path: '/role/coordinators',
			name: 'coordinators',
			component: Role,
		},
		{
			path: '/role/budget',
			name: 'budget',
			component: Role,
		},
		{
			path: '/role/executives',
			name: 'executives',
			component: Role,
		},

		// 404
		// 404
		// 404
		{
			path: '/404',
			name: 'error404',
			component: Error404
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});


export default router;
