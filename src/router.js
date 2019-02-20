import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NText from './views/NText.vue';
import NSet from './views/NSet.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/NText',
			name: 'ntext',
			component: NText,
		},
		{
			path: '/NSet',
			name: 'nset',
			component: NSet,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
		},
	],
});
