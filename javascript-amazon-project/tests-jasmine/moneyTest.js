import { formatCurrency } from "../scripts/utils/money";

// describe() creates a test suite
describe('test suite: formatCurrency', () => {

    // it() creates a test
    it('converts Cents Into Dollars', () => {

        // expect() compares a value to another value
        expect(formatCurrency(2095).toEqual('20.95'));
    });
});