import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import routes from './routes';

const App: FC = () => {
	const content = useRoutes(routes);

	return (
		<>
			<CssBaseline />
			{content}
		</>
	);
};

export default App;
