import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

describe('List', () => {
	it('should render list component', async () => {
		const tree = await render(<List />);

		const { container, getByTestId } = tree;

		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
