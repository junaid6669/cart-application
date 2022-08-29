import type { FC } from 'react';
import { Box, Container, Grid } from '@material-ui/core';

const Footer: FC = props => (
	<Box
		sx={{
			backgroundColor: 'background.default',
			pb: 6,
			pt: {
				md: 15,
				xs: 6,
			},
		}}
		{...props}
	>
		<Container maxWidth='lg'>
			<Grid container spacing={3}>
				Footer Here
			</Grid>
		</Container>
	</Box>
);

export default Footer;
