<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <div>{{dateTime}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      dateTime: null,
    }
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log('Connected to server!')
      this.isConnected = true;
    },

    disconnect() {
      console.log('Disconnected from server!')
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    date(data) {
      console.log('Received date from server!')
      console.log(data)
      this.dateTime = data
    }
  },
}
</script>