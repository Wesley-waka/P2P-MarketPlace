// plugins/socket.js
import io from 'socket.io-client'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  let socket = null

  nuxtApp.provide('socket', {
    connect(userId) {
      if (socket) socket.close()

      socket = io('http://localhost:4000', {
        query: {
          userId
        }
      })
      return socket
    },
    disconnect() {
      if (socket) {
        socket.close()
        socket = null
      }
    },
    getSocket() {
      return socket
    }
  })
})