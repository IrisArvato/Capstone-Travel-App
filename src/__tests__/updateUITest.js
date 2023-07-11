/**
* @jest-environment jsdom
*/

import { reloadSearchResult, reloadRecentSearchUI, addSearchError, clearSearchInfo } from '../client/js/updateUI'

describe('reloadSearchResult' , () => {
    test('should be defined', async () => {
        expect(reloadSearchResult).toBeDefined();
    });
});

describe('reloadSearchResult' , () => {
    test('should be a function', async () => {
        expect(typeof reloadSearchResult).toBe("function");
    });
});
