/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=07cb458e25d3d53d4fe14b756e3f5683&units=imperial';
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

document.getElementById("generate").addEventListener('click', (e) => {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    if (zip.length === 0) {
        console.error("Enter a Valid Zip Code");
        return;
    }
    let url = baseUrl + zip + apiKey; // url
    getData((url)).then(data => {
        if ("message" in data && 'cod' in data) {
            document.getElementById('content').innerHTML = data.message;
            return;
        }
        else {
            const newData = { temp: data.main.temp, date: newDate, content: feelings }

            postData(newData);
        }

    })


})


//get data from WEB-API
const getData = async (url = "") => {

    const response = await fetch(url)
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("error @ getData", error);
    }

}

//Post Data to Server
const postData = async (data = {}) => {
    console.log("post", data)
    fetch("/add", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    }).then((data) => {
        updateUI();
    }).catch(err => console.error("error", err));


}

//get data from server and display it
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}