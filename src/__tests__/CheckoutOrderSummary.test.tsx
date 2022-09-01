import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckoutOrderSummary, {
	CheckoutOrderSummaryProps,
} from '../components/checkout/CheckoutOrderSummary';

function renderCheckoutOrderSummary(
	props: Partial<CheckoutOrderSummaryProps> = {}
) {
	const defaultProps: CheckoutOrderSummaryProps = {
		onQuantityChange() {
			return;
		},
		onFilterChange() {
			return;
		},
		products: [
			{
				id: '1',
				name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
				price: 10,
				img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
				quantity: 1,
			},
		],
		colors: [{ colour: 'green' }, { colour: 'black' }],
		total: 0,
		selectedValue: '',
	};
	return render(<CheckoutOrderSummary {...defaultProps} {...props} />);
}

test('should display products on the page', async () => {
	const { queryAllByTestId } = renderCheckoutOrderSummary();
	const allProducts = await queryAllByTestId('product-name');
	expect(allProducts).toHaveLength(1);
});
