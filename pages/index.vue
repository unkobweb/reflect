<template>
  <div>
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      name: []
    }
  },

  sockets: {
    connect() {
      console.log('Socket connected')
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    names(data) {
      this.name = data
    }
  },
}
</script>