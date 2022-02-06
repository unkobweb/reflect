<template>
    <div class="event">
        <h3>{{event.summary}}</h3>
        <span class="event-times"><div class="start-time">{{event.start.date ? parseDate(event.start.date) : parseDateAndHours(event.start.dateTime)}}</div><div class="travel-time" v-if="event.location && travel !== null">{{travel}}</div></span>
        <div v-if="event.location" class="location-container"><img src="endroit.png"><p>{{event.location}}</p></div>
    </div>
</template>

<script lang="ts">
//@ts-nocheck
import Vue from 'vue'
export default Vue.extend({
    props: ['event'],
    data() {
        return {
            travel: null
        }
    },
    methods: {
        parseDateAndHours(date) {
            const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
            const months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"]
            date = new Date(date)
            const today = new Date()
            const tomorrow = new Date()
            tomorrow.setDate(today.getDate() + 1)
            if (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()){
                return `Aujourd'hui à ${String(date.getHours()).padStart(2,'0')}h${String(date.getMinutes()).padStart(2,'0')}`
            } else if (tomorrow.getDate() == date.getDate() && tomorrow.getMonth() == date.getMonth() && tomorrow.getFullYear() == date.getFullYear()) {
                return `Demain à ${String(date.getHours()).padStart(2,'0')}h${String(date.getMinutes()).padStart(2,'0')}`
            } else {
                return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} à ${String(date.getHours()).padStart(2,'0')}h${String(date.getMinutes()).padStart(2,'0')}`
            }
        },
        parseDate(date){
            const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
            const months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"]
            date = new Date(date)
            const today = new Date()
            const tomorrow = new Date()
            if (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()){
                return `Aujourd'hui - Toute la journée`
            } else if (tomorrow.getDate() == date.getDate() && tomorrow.getMonth() == date.getMonth() && tomorrow.getFullYear() == date.getFullYear()) {
                return `Demain - Toute la journée`
            } else {
                return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} - Toute la journée`
            }
        }
    }
})
</script>

<style scoped>
.event{
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  color: #000000;
  max-width: 20vw;
  margin-left: 10px;
  margin-bottom: 5px;
}
.location-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  margin-top: 5px;
}
.location-container img{
  max-height: 30px;
  margin-right: 12px;
}
.event h3 {
  font-size: 32px;
  font-weight: 800;
  font-family: 'Calibre';
}
.event span {
  font-size: 14px;
  font-weight: 600;
}
.travel-time{
    font-family: 'Calibre';
    transform: translateY(2px);
}
.start-time{
    font-family: Montserrat;
}
.event-times{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>