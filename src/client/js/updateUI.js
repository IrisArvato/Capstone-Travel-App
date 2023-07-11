
// To update the search result 
function reloadSearchResult(tripData) {
    document.getElementById('location-img').src = tripData.imgURL;
    
    document.getElementById('location-info').innerHTML = `
    <div><label>Name  :</label>${tripData.name}</div><div></div>
    <div><label>Country Name  :</label>${tripData.countryName}</div>   
    <div><label>Country Code  :</label>${tripData.countryCode}</div>            
    <div><label>Latitude :</label>${tripData.lat}</div>
    <div><label>Longitude :</label>${tripData.lng}</div>
    <div><label>Travel Date :</label>${tripData.travelDate} ${getCountDown(tripData.travelDate)}</div>`;

    if (tripData.weather.date != null) { 
        const weatherData = tripData.weather;
        document.getElementById('weather-info').innerHTML = `
        <div><label>Weather Forecast :</label>${weatherData.min_temp}°C - ${weatherData.max_temp}°C (${weatherData.description})</div>`;

        if (weatherData.current_temp != null) {
            document.getElementById('weather-info').innerHTML += `
            <div><label>Current Temperature :</label>${weatherData.current_temp}°C (${weatherData.current_description})</div>`;
        }
    }

    document.getElementById("search-result").style.display = 'block';
}

// To reload the recent search card in UI
function reloadRecentSearchUI(tripDatas) {    
    const recentBlock = document.getElementById('recent-search-trip');
    recentBlock.innerHTML = ''
    
    tripDatas.forEach(data => {
        console.log(data);
        
        const card = document.createElement('div');
        card.className = "card";

        card.innerHTML = `<img class="card-img" src='${data.imgURL}' />
        <p><strong>Place: ${data.name}</strong></p>
        <p><strong>Trave Date:${data.travelDate}</strong></p>`;

        if (data.weather.date != null) {
            const weather = data.weather;
            card.innerHTML += `<p><strong>Temp: ${weather.min_temp}°C -${weather.max_temp}°C </strong></p>`;
            card.innerHTML += `<p><strong>Weather: ${weather.description} </strong></p>`;
        }

        recentBlock.appendChild(card);
        console.log(data);
    });     
}

// Get the count down until travel date
function getCountDown(date) {
    const today = new Date();
    today.setHours(0,0,0,0);

    const travelDate = new Date(date);
    travelDate.setHours(0,0,0,0);

    const diffTime = travelDate - today;
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays > 1) {
        return `(${diffDays} days away)`
    }
    else if (diffDays == 1) {
        return `(tomorrow)`
    }
    else if (diffDays < 0) {
        return `(${Math.abs(diffDays)} days passed)`
    }

    return `(today)`;
}


const addSearchError = (txt) => {
    const srcInfo = document.getElementById('search-info');
    const srcContent = document.createElement('li');
    srcContent.innerText = txt;
    srcContent.style.color = 'red';
    srcInfo.appendChild(srcContent);
};

const clearSearchInfo = () => {
    const srcInfo = document.getElementById('search-info');
    srcInfo.innerHTML = '';
};

export { reloadSearchResult, reloadRecentSearchUI, addSearchError, clearSearchInfo };