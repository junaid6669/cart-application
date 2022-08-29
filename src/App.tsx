import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@material-ui/core';
import routes from './routes';

const App: FC = () => {
	const content = useRoutes(routes);

	return (
		<>
			<CssBaseline />
			<Toaster position='top-center' />
			{content}
		</>
	);
};

export default App;
