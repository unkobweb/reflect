<template>
  <div>
    <div class="container">
      <div class="time-container">
        <h1 id="hour">{{ hour }}</h1>
      </div>
      <div class="weather-container">
        <h2 id="date">{{ date }}</h2>
        <h1 class="temperature">{{temperature}}°C</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" defer>
import Vue from 'vue'

export default Vue.extend({
    data() {
        return{
            hour: "",
            date: "",
            weather: "",
            temperature: 0
        }
    },
    methods: {
        twoDigits(digit: number | string){
            if (typeof digit == "number"){
                digit = digit.toString()
            }

            if (digit.length == 1){
                digit = "0" + digit
            }

            return digit
        },
        verboseDate(date: Date){
            return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()+1).padStart(2, '0')}`
        },
        updateDateAndHour(){
            const theDateAndHour = new Date()
            this.hour = this.twoDigits(theDateAndHour.getHours()) + ":" + this.twoDigits(theDateAndHour.getMinutes())
            this.date = this.verboseDate(theDateAndHour)
        },
        async updateWeather(){
            const weather = await this.$axios.$get(`https://api.openweathermap.org/data/2.5/weather?q=nantes&units=metric&lang=fr&appid=f6320fdee3a50c0db74d2d612f012bcc`)
            this.weather = weather.weather[0].description
            this.temperature = Math.round(weather.main.temp*10)/10
        }
    },
    mounted(){
        this.updateWeather()
        setInterval(() => {
            this.updateDateAndHour()
        },1000)
        setInterval(() => {
            this.updateWeather()
        },60000)
    }
})
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px;
        padding-left: 10px;
        padding-top: 3px;
        padding-bottom: 0;
        width: fit-content;
        position: absolute;
        right: 240px;
        top: 27%;
        z-index : 1;
    }
    .time-container {
      display: flex;
      flex-direction: column;
    }
    #hour{
      font-family: 'Calibre';
      font-size: 260px;
      font-weight: 500;
      opacity: 0;
      transform: translateY(-20px);
      animation: appearFromUp 1s 5s forwards;
      margin-bottom: -90px;
      padding: 0;
      /* text-shadow: 0px 15px 5px rgba(0,0,0,0.1),
                 10px 20px 5px rgba(0,0,0,0.05),
                 -10px 20px 5px rgba(0,0,0,0.05); */
    }
    #date{
        opacity: 0;
        transform: translateY(20px);
        animation: appearFromDown .5s 7s forwards;
        margin: 0;
        padding-bottom: 5px;
        font-size: 75px;
        font-family: 'Calibre';
        /* text-shadow: 0px 15px 5px rgba(0,0,0,0.1),
                 10px 20px 5px rgba(0,0,0,0.05),
                 -10px 20px 5px rgba(0,0,0,0.05); */
    }

    @keyframes appearFromDown {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    @keyframes appearFromUp {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    .weather-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        padding-left: 20px;
        padding-right: 10px;
    }
    .temperature{
        font-size: 80px;
        font-family: 'Calibre';
        animation: appearFromDown .5s 8s forwards;
        opacity: 0;
        transform: translateY(20px);
        /* text-shadow: 0px 15px 5px rgba(0,0,0,0.1),
                 10px 20px 5px rgba(0,0,0,0.05),
                 -10px 20px 5px rgba(0,0,0,0.05); */
    }
</style>