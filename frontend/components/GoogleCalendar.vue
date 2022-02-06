<template>
  <div id="app">
    <!-- <button @click="toggle('alexandre')">Alexandre</button>
    <button @click="toggle('leone')">Leone</button> -->
    <div v-if="events">
      <div v-for="user in actualUsers" :key="user">
        <div class="user-container" v-if="user.toLowerCase() !== 'unknown'">
          <transition name="usertransition">
            <div v-if="!willBeDeletedUsers.includes(user)" class="user-name">{{user}}</div>
          </transition>
          <transition-group name="slidein">
            <!-- <p v-for="index in (events[user] ? (events[user].length > maxEvents ? maxEvents : events[user].length) : 0)" :key="index" v-if="events[user][index]">{{index}}{{events[user][index]}}</p> -->
            <Event v-for="index in (events[user] ? (events[user].length > maxEvents ? maxEvents : events[user].length+1) : 0)" :key="index-1" v-if="events[user][index-1]" :event="events[user][index-1]"/>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import Vue from "vue";
import Event from "~/components/Event.vue";
const API_URL = process.env.API_URL || "http://127.0.0.1:4000"
export default Vue.extend({
  components: {
    Event
  },
  computed: {
    users() {
      return this.$store.getters['users/getUsers']
    }
  },
  data() {
    return {
      loading: false,
      lastUsers: [],
      willBeDeletedUsers: [],
      actualUsers: [],
      events: {},
      maxEvents: 6
    };
  },
  methods: {
    // toggle(name) {
    //   // if user is already in the list, remove it, else add it
    //   const userArray = [...this.users];
    //   const index = userArray.indexOf(name);
    //   if (index > -1) {
    //     userArray.splice(index, 1);
    //   } else {
    //     userArray.push(name);
    //   }
    //   this.$store.dispatch('users/setUsers', [...userArray])
    // },
    async wait(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    async getUserEvents(name) {
      this.willBeDeletedUsers = [...this.willBeDeletedUsers, name];
      this.actualUsers = [...this.actualUsers, name];
      await this.wait(100)
      this.willBeDeletedUsers = this.willBeDeletedUsers.filter(user => user !== name);
      await this.$axios.$get(`${API_URL}/calendars/${name}`).then(async response => {
        for (const event of response) {
          await this.wait(450);  
          this.events[name] = this.events[name] ? [...this.events[name], event] : [event]; 
          this.events = JSON.parse(JSON.stringify(this.events)); 
        }
      });
      await this.wait(250);
    },
    async removeUser(name) {
      const length = this.events[name].length;
      for (let i = 0; i < length; i++) {
        this.events[name].pop();
        this.events = JSON.parse(JSON.stringify(this.events));
        await this.wait(300);
      }
      this.willBeDeletedUsers = [...this.willBeDeletedUsers, name];
      await this.wait(1000);
      this.actualUsers = this.actualUsers.filter(user => user !== name);
      this.willBeDeletedUsers = this.willBeDeletedUsers.filter(user => user !== name);
    },
    async toggleUsers() {
      if (this.loading || this.areSameArrays(this.users,this.actualUsers)) return;
      this.loading = true;
      const actualUsers = [...this.users];
      const promises = [];
      // check user to remove
      const userToRemove = this.lastUsers.filter(user => actualUsers.indexOf(user) === -1);
      for (const user of userToRemove) {
        console.log("Remove user", user);
        promises.push(this.removeUser(user))
      }
      // check user to come
      const userToCome = actualUsers.filter(user => this.lastUsers.indexOf(user) === -1);
      for (const user of userToCome) {
        console.log("Add user", user);
        promises.push(this.getUserEvents(user))
      }
      console.log(actualUsers.length)
      if (actualUsers) console.log(6/actualUsers.length)
      promises.push(this.setMaxEvents(actualUsers.length ? 6/actualUsers.length : 6));
      await Promise.all(promises);
      this.lastUsers = [...this.actualUsers];
      this.loading = false;
      this.toggleUsers();
    },
    areSameArrays(array1, array2) {
      const temp1 = [...array1].sort();
      const temp2 = [...array2].sort();
      return temp1.length === temp2.length && temp1.every((value, index) => value === temp2[index]);
    },
    async setMaxEvents(number) {
      const maxEvents = this.maxEvents;
      if (number > maxEvents) {
        for (let i = maxEvents; i <= number; i++) {
          await this.wait(200);
          this.maxEvents = i;
        }
      } else if (number < maxEvents) {
        for (let i = maxEvents; i >= number; i--) {
          await this.wait(200);
          this.maxEvents = i;
        }
      }
    }
  },
  watch: {
    users: {
      async handler(){
        console.log("users changed")
        this.toggleUsers();
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped>
.user-container{
  display: block;
}
.user-name{
  display: block;
  text-transform: capitalize;
  font-size: 24px;
  margin-left: 15px;
  font-weight: 800;
  font-family: 'Calibre';
  margin-top: 20px;
}
.usertransition-enter-active {
  animation: nameAppear .4s forwards;
}
.usertransition-leave-active {
  animation: nameAppear .4s reverse;
}
.slidein-enter-active {
  animation: slideFromLeft .4s forwards;
}
.slidein-leave-active {
  animation: slideFromLeft .3s reverse;
}
.slidein-move {
  transition: transform 1s;
}
@keyframes nameAppear {
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes slideFromLeft {
  0%{
    transform: translateX(-500px);
  }
  80%{
    transform: translateX(20px);
  }
  100%{
    transform: translateX(0px);
  }
}
</style>