//TODAY
var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = date + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    
var date = dayOfWeek + " " + dayOfMonth + " of " + curMonth + " " + curYear;
var time = curHour + "." + curMinute + " " + curMeridiem;

document.getElementById('date').textContent = date;
document.getElementById('time').textContent = time;

//TOMORROW
// var nextDay = new Date(objToday);
// var tomorrowsDate = nextDay.setDate(objToday.getDate()+1)
// var objNextDay = new Date(tomorrowsDate);
//     weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
//     dayOfWeekTomorrow = weekday[objNextDay.getDay()];

// var dateTomorrow = dayOfWeekTomorrow;

// console.log(dateTomorrow);


// console.log(date)
// console.log(time)

document.getElementById('submit-title-btn').addEventListener('click', function(e){
    e.preventDefault();
    let newTitle = document.getElementById('newTitle').value;
    document.querySelector('h1').textContent = newTitle;
    // console.log(newTitle);
});

document.getElementById('newColorDropdown').addEventListener('change', function(){
    let dropdown = document.getElementById('newColorDropdown');
    let selectedColor = dropdown.options[dropdown.selectedIndex].value;
    document.querySelector('body').style.backgroundColor= selectedColor;
})
// THIS IS FOR THE COLOR PICKER:
// document.getElementById('newColor').addEventListener('change', function(){
//     let newColor = document.getElementById('newColor').value;
//     document.querySelector('body').style.backgroundColor= newColor;
//     // console.log(newColor);
// })

var path = 'https://cors-anywhere.herokuapp.com/https://git.wd-agency.com/snippets/2/raw';

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].day === nameKey) {
            // console.log(myArray[i]);
            let newRow = document.getElementById('task-table').insertRow(-1);
            let newCell1 = newRow.insertCell(0);
            let newCell2 = newRow.insertCell(1);
            let newTime = document.createTextNode(myArray[i].time);
            let newTask = document.createTextNode(myArray[i].description);
            newCell1.appendChild(newTime);
            newCell2.appendChild(newTask);
        }
    }
}

function success(s){
    // console.log(s);
    search(dayOfWeek, s);
}

function error(e){
    console.log(e);
}

function loadJSON(filePath, success, error)
{
    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                success(JSON.parse(xhr.responseText));
            } else {
                if (error)
				error(xhr);
			}
		}
	};
	xhr.open("GET", filePath, true);
	xhr.send();
}

loadJSON(path, success, error)


function successWeather(s){
    console.log(s);
    var temperature = s.main.temp;
    var description = s.weather[0].description;
    document.querySelector('#temperature').textContent = temperature.toFixed()+"°";
    document.querySelector('#weather-description').textContent = description;
}

var api_path = "http://api.openweathermap.org/data/2.5/weather?q=copenhagen,dk&appid=9aeaad271fe4974c31c32eeed9452f85&units=metric"

loadJSON(api_path, successWeather, error)



