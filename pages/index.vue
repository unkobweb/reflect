<template>
  <div>
    <Hour />
    <HelloMessage />
    <GoogleCalendar />
  </div>
</template>

<script>
import Hour from '~/components/Hour.vue'
import HelloMessage from '~/components/HelloMessage.vue'
import GoogleCalendar from '~/components/GoogleCalendar.vue'

export default {
  components: {
    Hour,
    HelloMessage,
    GoogleCalendar
  },
  data() {
    return {
      isConnected: false,
      name: []
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