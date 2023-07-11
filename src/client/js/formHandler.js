
import { reloadSearchResult, reloadRecentSearchUI, addSearchError, clearSearchInfo } from "./updateUI"

// Add event listerner  

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('travelDate').valueAsDate = new Date();
    getRecentSearch();
});

/* Function called by event listener */

// To search travel location information

const clearSearch = (event) => {
    document.getElementById("location-input").value = '';    
    document.getElementById("search-result").style.display = 'none';

    clearSearchInfo();
}

const searchData = async (event) => {
    // refresh recent search
    await getRecentSearch();

    const location = document.getElementById("location-input").value;

    clearSearchInfo();
    if (!location || location == '') {
        addSearchError('Please enter the destionation to search');
        document.getElementById("location-input").focus();  
        return;
    }
    
    const travelDate = document.getElementById("travelDate").value;

    searchLocation(location, travelDate).then((data) => {
        if (data) {
            reloadSearchResult(data);
        }            
    });
};

const searchLocation = async (location, travelDate) => {
    try {
        const data = await postData('/search', { 'location': location, 'travelDate': travelDate});

        return data;
    } catch (error) {
        console.log("Error", error);
    }
};


// To get recent search information
async function getRecentSearch() {
    try {
        await fetch('/recent')
        .then(res => res.json())
        .then(function(res) {
            reloadRecentSearchUI(res);
        });
    } catch (error) {
        console.log("Error", error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log('Info', newData.message);
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
}

export { searchData, clearSearch, searchLocation }