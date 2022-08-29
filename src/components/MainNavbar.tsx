import { AppBar, Box, Divider, Toolbar } from '@material-ui/core';

const MainNavbar = () => (
	<AppBar
		elevation={0}
		sx={{
			backgroundColor: 'background.paper',
			color: 'text.secondary',
		}}
	>
		<Toolbar sx={{ minHeight: 64 }}>
			<Box sx={{ flexGrow: 1 }} />
			<Box
				sx={{
					alignItems: 'center',
					display: {
						md: 'flex',
						xs: 'none',
					},
				}}
			>
				Header Here
			</Box>
		</Toolbar>
		<Divider />
	</AppBar>
);

export default MainNavbar;
