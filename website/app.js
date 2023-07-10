/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '45d9c70b158b7f87907303efc7472974';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Add event listerner on submit button
const submitButton = document.getElementById("generate");
submitButton.addEventListener('click', generateData);

/* Function called by event listener */

// To retrieve the last saved result
function generateData() {
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;

    // Get WeatherData with promise
    getWeatherData(zip).then((data) => {
        if (data) {
            const mappedData = {
                date: newDate,
                temp: data.main.temp,
                content: content,
                zip: zip
            };

            postData("/add", mappedData);
            reloadUi();
        }
    });
};

/* Function to GET Web API Data*/
const getWeatherData = async (zip) => {
    try {
        const param = '&appid=' + apiKey + '&units=imperial';
        const res = await fetch(baseUrl + zip + param);
        const data = await res.json();

        return data;
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

/* Update UI */
const reloadUi = async () => {
    const res = await fetch('/all');
    try {        
        if (res.status == 204) 
        {
            document.getElementById("content").innerHTML = "No recent entry";
            return;
        }

        const result = await res.json();
        console.log(result);
        
        document.getElementById("zip").value = result.zip;
        document.getElementById("feelings").value = result.content;

        document.getElementById("date").innerHTML = "Date: " + result.date;
        document.getElementById("temp").innerHTML = "Temperature: " + result.temp + '&degF';
        document.getElementById("content").innerHTML = "Your Feeling: " + result.content;
    } catch (error) {
        console.log("Error", error);
    }
};

// Start loading Ui with the last saved data
reloadUi();