<template>
    <div>
        <div class="container">
            <div class="time-container">
                <h1 id="hour">{{ hour }}</h1>
                <h2 id="date">{{ date }}</h2>
            </div>
            <div class="weather-container">
                <h1 class="temperature">{{temperature}}°C</h1>
                <h2 class="weather">{{weather}}</h2>
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
            let days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
            let months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
            return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        },
        updateDateAndHour(){
            const theDateAndHour = new Date()
            this.hour = this.twoDigits(theDateAndHour.getHours()) + ":" + this.twoDigits(theDateAndHour.getMinutes()) + ":" + this.twoDigits(theDateAndHour.getSeconds())
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
        flex-direction: row;
        justify-content: space-between;
        margin: 10px;
        padding-left: 10px;
        padding-top: 3px;
        padding-bottom: 0;
        width: fit-content;
        position: relative;
        z-index : 1;
    }
    #hour{
        font-size: 50px;
        font-weight: 500;
        opacity: 0;
        animation: appear 1s 1s forwards;
    }
    #date{
        opacity: 0;
        transform: translateY(-10px);
        animation: appearFromUp .5s 2s forwards;
        margin: 0;
        padding-bottom: 5px;
    }
    .container::before{
        content : "";
        position: absolute;
        left    : 0;
        top  : 0;
        width   : 1px;  /* or 100px */
        border-left: 1px solid white;
        animation: extenderHeight 2s 1s forwards;
    }
    .container::after{
        content : "";
        position: absolute;
        left    : 0;
        top  : 0;
        height  : 1px;
        border-top: 1px solid white;
        animation: extenderWidth 2s 1s forwards;
    }

    @keyframes extenderWidth {
        from {
            width: 0%;
        }
        to {
            width: 100%
        }
    }

    @keyframes extenderHeight {
        from {
            height: 0%
        }
        to {
            height: 100%
        }
    }

    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes appearFromUp {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    @keyframes appearTemp {
        from {
            transform: translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateY(6px);
            opacity: 1;
        }
    }
    @keyframes appearFromDown {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(-4px);
            opacity: 1;
        }
    }
    .weather-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 140px;
        padding-left: 20px;
        padding-right: 10px;
    }
    .temperature{
        font-family: 'Calibre';
        transform: translateY(-100px);
        animation: appearTemp 1s 3s forwards;
    }
    .weather {
        font-size: 15px;
        transform: translateY(50px);
        text-transform: capitalize;
        opacity: 0;
        animation: appearFromDown 1s 4s forwards;
    }
</style>