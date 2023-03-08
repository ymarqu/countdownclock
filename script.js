const dates = () => {
    let _todaysDate = new Date();

    const getTodaysDate = () =>{
        return _todaysDate;
    }
    const ConvertToDate = (day) => {
        console.log(day)
        let dateFormat = new Date(day);
        console.log(dateFormat);

                return dateFormat;
    }

    return {
        getTodaysDate,
        ConvertToDate
    }


}
const Timer = () => {

    calculateTimeLeft = (days, year, hours, seconds) => {
        let day = new Date();

        let todayDay = day.getDate();
        let todayMins = day.getMinutes();
        let todayHour = day.getHours();
        let todaySeconds = day.getSeconds();

        let daysLeft = days - todayDay;
        let hoursLeft = 22 - todayHour;
        if(hoursLeft < 10){
            hoursLeft = "0" +  hoursLeft.toString();
        }
        let minutesLeft = 59 - todayMins;
        if(minutesLeft < 10){
            minutesLeft = "0" + minutesLeft.toString();
        }
        let secondsLeft = 60 - todaySeconds;
        if(secondsLeft < 10){
            secondsLeft = "0" + secondsLeft.toString();
        }
        if(secondsLeft === 60){
            secondsLeft = "00";
        }

        return{
          daysLeft,
          hoursLeft,
          minutesLeft,
          secondsLeft
        }

    }
    GetTimerStart = (birthdayDate) => {
        let dayy = birthdayDate.getDate();
        let minutes = birthdayDate.getMinutes();
        birthdayDate.setHours(0, 0, 0,0)
        let hours = birthdayDate.getHours();

        let seconds = birthdayDate.getSeconds();

        return {
            dayy, minutes, hours, seconds
        }

    }

    return {
        GetTimerStart,
        calculateTimeLeft
    }

}




const ScreenControl = (() => {

    let dateUtils = dates();
    let timer = Timer();

    let getUserBirthday = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
     e.preventDefault();
     let birthday = form.birthday.value
     console.log(birthday);
     let birthdayDateFormat = dateUtils.ConvertToDate(birthday)
     console.log(birthdayDateFormat)
    if(dateUtils.getTodaysDate().getTime() > birthdayDateFormat.getTime())
    {
        document.querySelector('.error').classList.remove("hide")
        form.reset();
    }else{

    let format = timer.GetTimerStart(birthdayDateFormat);
    setInterval(()=> {
       let timeLeft = timer.calculateTimeLeft(format.dayy, format.hours, format.minutes, format.seconds)
       updateScreen(timeLeft.daysLeft, timeLeft.hoursLeft, timeLeft.minutesLeft, timeLeft.secondsLeft)
    }, 1000)


    document.querySelector('.modal-overlay').classList.add('hide');
    document.querySelector('main').classList.remove('hide');
    document.querySelector(".user-bday").innerHTML = birthdayDateFormat;
}
    });
  }
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
