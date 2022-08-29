import { useState, useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid } from '@material-ui/core';
import { CheckoutOrderSummary } from '../components/checkout';

import axios from 'axios';
import * as _ from 'lodash';

interface Product {
	id: string;
	img: string;
	name: string;
	colour: string;
	price: number;
	quantity: number;
}
interface Colors {
	colour: string;
}

const Checkout: FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [productsCopy, setProductsopy] = useState<Product[]>([]);
	const [colors, setColors] = useState<Colors[]>([]);
	const [selectedValue, setSelectedValue] = useState<string>('');

	useEffect(() => {
		axios
			.get('https://my-json-server.typicode.com/benirvingplt/products/products')
			.then(response => {
				const data = response.data.map(res => {
					console.log();
					return {
						...res,
						quantity: 0,
					};
				});

				const allColors: any[] = _.map(
					_.groupBy(data, 'colour'),
					(allColorsList, colour) => ({
						colour,
					})
				);

				setColors(allColors);
				setProducts(data);
				setProductsopy(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const handleProductQuantityChange = (
		productId: string,
		btnID: string
	): void => {
		setProducts(prevProducts =>
			prevProducts.map(product => {
				if (product.id === productId) {
					console.log('event', product.quantity);
					let quantity = 0;
					if (btnID === 'minus') {
						quantity = product.quantity - 1;
					} else if (btnID === 'plus') {
						quantity = product.quantity + 1;
					} else {
						quantity = 0;
					}
					if (quantity < 0) quantity = 0;
					return {
						...product,
						quantity,
					};
				}

				return product;
			})
		);
	};
	const handleProductFilterChange = (
		event: ChangeEvent<{ value: string }>
	): void => {
		const currentValue = event.target.value;
		const cProducts = [...productsCopy];
		if (currentValue === '') {
			setProducts(cProducts);
		} else {
			const newProductList = cProducts.filter(product => {
				if (product.colour === currentValue) {
					return {
						...product,
					};
				}
				return null;
			});

			setProducts(newProductList);
		}
		setSelectedValue(currentValue);
	};

	const subtotal = products.reduce(
		(accumulator, product) => accumulator + product.price * product.quantity,
		0
	);

	return (
		<>
			<Helmet>
				<title>Basket</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.paper',
					minHeight: '100%',
					py: 2,
				}}
			>
				<Container maxWidth='lg'>
					<Box mt={0}>
						<Grid container>
							<Grid item lg={12} md={12} xs={12}>
								<CheckoutOrderSummary
									onQuantityChange={handleProductQuantityChange}
									onFilterChange={handleProductFilterChange}
									products={products}
									colors={colors}
									total={subtotal}
									selectedValue={selectedValue}
								/>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Checkout;
