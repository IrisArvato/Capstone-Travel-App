/**
* @jest-environment jsdom
*/

import { searchData, searchLocation } from '../client/js/app'

describe('searchData should exist' , () => {
    test('It should return true', async () => {
        expect(searchData).toBeDefined();
    });
});

describe('searchData should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof searchData).toBe("function");
    });
});

describe('searchLocation should exist' , () => {
    test('It should return true', async () => {
        expect(searchLocation).toBeDefined();
    });
});

describe('searchLocation should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof searchLocation).toBe("function");
    });
});
