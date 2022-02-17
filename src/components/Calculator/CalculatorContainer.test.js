import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import fetchMock from "fetch-mock";
import CalculatorContainer from './CalculatorContainer.js';

describe('Test Calcuator Container', () => {
 
    afterEach(() => {
        cleanup();
        fetchMock.restore();
    });

    test('Should match calculator snapshot', () => {
        const { asFragment } = render(<CalculatorContainer />)

        expect(asFragment(<CalculatorContainer />)).toMatchSnapshot();
     });
     
    test('Should render calculated mortgage payment after submit', async () => {
        // TODO: extract into setUpTest
        fetchMock.mock('https://sheltered-escarpment-94741.herokuapp.com/mortgage/v1/calculator', {
            body: { paymentPerSchedule: 1000 },
            status: 200
        });

        const { getByTestId, findByText } = render(<CalculatorContainer />);

        fireEvent.click(getByTestId('calculate-btn'));

        const mortgagePayment = await findByText('Your mortgage payment is $1000 with a Biweekly payment schedule.');      
        expect(mortgagePayment).toBeInTheDocument();
     });
     
     test('Should clear after reset', () => {
         const { getByTestId } = render(<CalculatorContainer />); 
         
         fireEvent.click(getByTestId('reset-btn'));
     
         expect(getByTestId('mortgage-payment')).toHaveTextContent('--');
     });
});
