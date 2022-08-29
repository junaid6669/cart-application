import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
	Box,
	Button,
	Card,
	Divider,
	FormControl,
	IconButton,
	InputLabel,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@material-ui/core';
import PlusIcon from '../../icons/Plus';
import MinusIcon from '../../icons/Minus';

interface Product {
	id: string;
	img: string;
	name: string;
	price: number;
	quantity: number;
}
interface Colors {
	colour: string;
}
interface CheckoutOrderSummaryProps {
	onQuantityChange?: (productId: string, btnID: string) => void;
	onFilterChange?: (event: ChangeEvent<{ value: string }>) => void;
	products: Product[];
	colors: Colors[];
	total: number;
	selectedValue: string;
}

const CheckoutOrderSummary: FC<CheckoutOrderSummaryProps> = props => {
	const {
		onQuantityChange,
		onFilterChange,
		selectedValue,
		products,
		colors,
		total,
		...other
	} = props;

	return (
		<Card variant='outlined' sx={{ p: 3 }} {...other}>
			<FormControl sx={{ m: 1, minWidth: 180 }} size='small'>
				<InputLabel id='demo-simple-select-label'>Colour Filter</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					label='Colour Filter'
					onChange={onFilterChange}
					value={selectedValue}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{colors.map(res => (
						<MenuItem key={res.colour} value={res.colour}>
							{res.colour}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Divider sx={{ my: 2 }} />
			<List sx={{ mt: 2 }}>
				{products.map(product => (
					<ListItem disableGutters key={product.id}>
						<ListItemAvatar sx={{ pr: 2 }}>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									height: 100,
									justifyContent: 'center',
									overflow: 'hidden',
									width: 100,
									'& img': {
										width: '100%',
										height: 'auto',
									},
								}}
							>
								<img alt={product.name} src={product.img} />
							</Box>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography
									color='textPrimary'
									sx={{ fontWeight: 'fontWeightBold' }}
									variant='subtitle2'
								>
									{product.name}
								</Typography>
							}
							secondary={
								<Typography color='textSecondary' sx={{ mt: 1 }} variant='body1'>
									${numeral(product.price).format('00.00')}
								</Typography>
							}
						/>
						<ListItemSecondaryAction>
							<Stack direction='row' spacing={1}>
								<IconButton
									aria-label='minus'
									onClick={() => onQuantityChange(product.id, 'minus')}
								>
									<MinusIcon />
								</IconButton>
								<Typography
									color='textSecondary'
									style={{ marginTop: '12px' }}
									variant='body1'
								>
									{product.quantity}
								</Typography>
								<IconButton
									aria-label='plus'
									onClick={() => onQuantityChange(product.id, 'plus')}
								>
									<PlusIcon />
								</IconButton>
							</Stack>
							<Stack>
								<Button
									variant='text'
									sx={{ mt: 1, textAlign: 'center' }}
									onClick={() => onQuantityChange(product.id, 'remove')}
								>
									Remove
								</Button>
							</Stack>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			<Divider sx={{ my: 2 }} />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Typography color='textPrimary' variant='subtitle2'>
					Total
				</Typography>
				<Typography color='textPrimary' variant='subtitle2'>
					${numeral(total).format('00.00')}
				</Typography>
			</Box>
		</Card>
	);
};

CheckoutOrderSummary.propTypes = {
	onQuantityChange: PropTypes.func,
	onFilterChange: PropTypes.func,
	products: PropTypes.array,
	colors: PropTypes.array,
	total: PropTypes.number,
	selectedValue: PropTypes.string,
};

export default CheckoutOrderSummary;
