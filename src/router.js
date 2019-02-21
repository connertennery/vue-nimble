import Vue from 'vue';
import Router from 'vue-router';
import NText from './views/NText.vue';
import NSet from './views/NSet.vue';

Vue.use(Router);

export default new Router({
	routes: [
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
	],
});
