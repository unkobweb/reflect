<template>
  <div>
    <div v-if="users.length > 0">
      <Hour />
      <HelloMessage />
      <GoogleCalendar />
    </div>
    <div v-else>
      <BigHour />
      <iframe src="http://dynmap.alkana.fr/?worldname=world&mapname=surface&zoom=5&x=-620&y=64&z=354&overlay=hidden" width="1920" height="1080" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import Hour from '~/components/Hour.vue'
import HelloMessage from '~/components/HelloMessage.vue'
import GoogleCalendar from '~/components/GoogleCalendar.vue'
import BigHour from '~/components/BigHour.vue'

export default {
  components: {
    Hour,
    HelloMessage,
    GoogleCalendar,
    BigHour
  },
  data() {
    return {
      isConnected: false,
      name: []
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/getUsers']
    }
  },

  sockets: {
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    names(data) {
      this.$store.dispatch('users/setUsers', data.names)
    }
  },
}
</script>