<template>
    <div id="hello-box">
        <transition name="hello">
            <h1 v-if="displayingName" id="hello-msg">Bonjour {{ displayingName }} <img :src="'emojis/'+this.getRandomEmoji()+'.png'" alt=""> !</h1>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            showing: false,
            displayedNames: [],
            needToDisplayNames: [],
            displayingName: null,
        }
    },
    computed: {
        names() {
            return this.$store.getters['users/getUsers']
        }
    },
    watch: {
        names(newNames, oldNames) {
            const notDisplayedNames = newNames.filter(name => !this.displayedNames.includes(name) && name.toLowerCase() !== 'unknown')
            this.needToDisplayNames = [...this.needToDisplayNames, ...notDisplayedNames]
            this.displayedNames = [...this.displayedNames, ...notDisplayedNames]
            if (this.displayedNames.length > 0) this.displayName()
        }
    },
    created() {
        this.$crontab.addJob({
            name: 'new-day',
            interval: {
                hours: '0',
                minutes: '0',
                seconds: '1'
            },
            job: this.resetDay
        })
    },
    methods: {
        wait(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        },
        getRandomEmoji(){
            const allEmojis = ["face-savoring-food","face-blowing-a-kiss","partying-face","cowboy-hat-face","waving-hand"]
            return allEmojis[Math.floor(Math.random() * Math.floor(allEmojis.length))];
        },
        resetDay() {
            this.displayedNames = [];
        },
        async displayName() {
            if (this.needToDisplayNames.length === 0 || this.showing) return; 
            this.showing = true;
            this.displayingName = this.needToDisplayNames.pop();
            await this.wait(2500);
            this.displayingName = null;
            await this.wait(1000);
            this.showing = false;
            this.displayName();
        }
    }
})
</script>

<style>
    .hello-enter-active {
        animation: displayHello .5s forwards;
    }
    .hello-leave-active {
        animation: displayHello .5s reverse;
    }
    #hello-box{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
        width: 100vw;
        display: flex;
        margin-top: 15px;
        justify-content: center;
    }
    #hello-box #hello-msg {
        font-size: 30px;
        text-transform: capitalize;
        display: flex;
        align-items: center;
    }
    #hello-box #hello-msg img {
        max-width: 30px;
        max-height: 30px;
        margin-left: 10px;
        margin-right: 10px;
    }
    @keyframes displayHello {
        0% {
            opacity: 0;
            transform: translateY(-35px);
        }
        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
</style>