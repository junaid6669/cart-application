/*eslint-disable*/
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = Component => props =>
	(
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);

// Other pages

const Checkout = Loadable(lazy(() => import('./pages/Checkout')));

const routes: RouteObject[] = [
	{
		path: '*',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Checkout />,
			},
		],
	},
];

export default routes;
