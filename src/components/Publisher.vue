<template>
   <div>
    <h1>MQTT Node.js + Vue.js</h1>
    <h2>Publisher</h2>
    <div class="line"></div>
    <form @submit.prevent="publishMessage" id="publishForm">
      <ul class="wrapper">
        <li class="form-row">
          <label for="topic">Topic</label>
          <input type="text" id="topic" v-model="topic" class="input-field" />
        </li>
        <li class="form-row">
          <label for="message">Message</label>
          <input type="text" id="message" v-model="message" class="input-field" />
        </li>
        <li class="form-row">
          <button type="submit" class="publish-button">Publish</button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import mqtt from 'mqtt';

export default {
  data() {
    return {
      topic: '',
      message: '',
      mqttClient: null
    };
  },
  methods: {
    connectToBroker() {
      const clientId = "client" + Math.random().toString(36).substring(7);

      //const hostURL = `${protocol}://${mqttHost}:${port}`;
      const host = "ws://192.168.0.108:9001";

      const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
      };

      // hostURL
      this.mqttClient = mqtt.connect(host, options);

      this.mqttClient.on("error", (err) => {
        console.log("Error: ", err);
        mqttClient.end();
      });

      this.mqttClient.on("reconnect", () => {
        console.log("Reconnecting...");
      });

      this.mqttClient.on("connect", () => {
        console.log("Client connected:" + clientId);
      });

      this.mqttClient.on("close", () => {
      console.log(`Client disconnected`);
      });

      // Received message
      this.mqttClient.on("message", (topic, message, packet) => {
        console.log(`Request Topic :: ${topic}`);
        console.log(`Request Message :: ${message}`);
      });
    },

    // topic, message
    publishMessage() {
      //
      const messageInput = document.querySelector("#message");
      const topic = document.querySelector("#topic").value.trim();
      const message = messageInput.value.trim();
      //
      console.log(`Sending Topic: ${topic}, Message: ${message}`);

      //
      if (this.mqttClient) {
        this.mqttClient.publish(topic, message, {
          qos: 0,
          retain: false,
          });
      } else {
        console.error('mqttClient is not defined');
      }
      //
      //messageInput.value = "";

    }
  },
  created() {
    // Connect to MQTT broker when the component is created
    this.connectToBroker();
  }
};
</script>

<style>
.form-row > input {
  flex: 2;
}

.form-row > input,
.form-row > button {
  padding: 1em;
  margin: 10px 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  font-size: 1.2em;
}
.form-row > button {
  background-color: #3f51b5;
  color: white;
  border: 0;
  flex: 3;
  font-weight: 600;
}
</style>
