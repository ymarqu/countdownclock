
//Date functions
const dates = () => {
    let _todaysDate = new Date();

    const getTodaysDate = () =>{
        return _todaysDate;
    }
    const ConvertToDate = (day) => {
        let dateFormat = new Date(`${day}T00:00`);
        return dateFormat;
    }

    return {
        getTodaysDate,
        ConvertToDate
    }


}

//Timer functions
//Purpose: Handles the timer aspect
const Timer = () => {

      let date = dates();
      calculateTimeLeft = (bd) => {
      let dayConversion = 1000 * 3600 * 24;
      let hourConversion = 1000 * 3600;
      let currentDay = new Date().getTime(); // Todays dates and current time
      let endDay = date.ConvertToDate(bd); // countDown deadline with 12 am as end time
      let timeLeft = endDay - currentDay;
      let days = Math.floor( timeLeft / dayConversion);
      let remainderHours = timeLeft % dayConversion;
      let hours = Math.floor((remainderHours) / (hourConversion));
      let remainderMinutes = timeLeft % hourConversion;
      let minutes = Math.floor(remainderMinutes / (1000 * 60))
      let remainderSeconds = timeLeft % (1000 * 60);
      let seconds = Math.floor(remainderSeconds / 1000);

      minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
      seconds = seconds < 10 ? '0' + seconds.toString() : seconds;

        return{
            days,
            hours,
            minutes,
            seconds
        }

    }

    return {
        calculateTimeLeft
    }

}



//Screen controller module
// Purpose: Handels the html and css rendered to the user
const ScreenControl = (() => {

    let dateUtils = dates();
    let timer = Timer();

    const getUserBirthday = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
     e.preventDefault();
     let birthday = form.birthday.value
     let birthdayDateFormat = dateUtils.ConvertToDate(birthday)

     let timeLeft = timer.calculateTimeLeft(birthday)
     updateScreen(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds)

     //If time is after today's day error message is displayed. If input is valid timer starts
     if(dateUtils.getTodaysDate().getTime() > birthdayDateFormat.getTime()){
        document.querySelector('.error').classList.remove("hide")
        form.reset();
     }else{
       setInterval(()=> {
         timeLeft = timer.calculateTimeLeft( birthday)
         updateScreen(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds)
         }, 1000);
         //Modal styles
         document.querySelector('.modal-overlay').classList.add('hide');
         document.querySelector('main').classList.remove('hide');
         document.querySelector(".user-bday").innerHTML = birthdayDateFormat.toDateString();
        }
    });
  };
  //update timer on user display
  const updateScreen = (d,h, m,s) => {

    document.querySelector(".days-left").innerHTML = d;
    document.querySelector(".hours-left").innerHTML = h;
    document.querySelector(".minutes-left").innerHTML = m;
    document.querySelector(".seconds-left").innerHTML = s;
  }

    return {
        getUserBirthday,
    }
})();

ScreenControl.getUserBirthday();
