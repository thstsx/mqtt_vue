<template>
   <div>
    <h1>MQTT Node.js + Vue.js</h1>
    <h2>Subscriber</h2>
    <div class="line"></div>
    <ul class="wrapper">
      <li class="form-row">
        <label for="topic">Topic</label>
        <input type="text" id="topic" v-model="topic" />
      </li>
      <li class="form-row">
        <label for="message">Message</label>
        <textarea id="message" v-model="message" rows="10" readonly></textarea>
      </li>
      <li class="form-row">
        <label for="status">Status</label>
        <input type="text" id="status" v-model="status" readonly />
      </li>
      <li class="form-row">
        <div class="btn-container">
          <button type="button" @click="subscribe" id="subscribe">Subscribe</button>
          <button type="button" @click="unsubscribe" id="unsubscribe">Unsubscribe</button>
        </div>
      </li>
    </ul>
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
      status: '' ,
      mqttClient: null
    };
  },
  
  methods: {
    
    connectToBroker() {
      const clientId = "client" + Math.random().toString(36).substring(7);
      const host = "ws://192.168.0.108:9001";
      //const host = "ws://192.168.0.108:9001/mqtt";

      const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
      };

      this.mqttClient = mqtt.connect(host, options);

      this.mqttClient.on("error", (err) => {
        console.log("Error: ", err);
        this.mqttClient.end();
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

      // Received
      this.mqttClient.on("message", (topic, message, packet) => {
        console.log(
          "Received Message: " + message.toString() + "\nOn topic: " + topic
        );
        this.message += message + "\r\n";
      });
    },
    subscribe() {
      this.connectToBroker();

      const status = document.querySelector("#status");
      const topic = this.topic.trim();
      console.log(`Subscribing to Topic: ${topic}`);

      this.mqttClient.subscribe(topic, { qos: 0 });
      status.style.color = "green";
      this.status = "SUBSCRIBED";
    },
    unsubscribe() {
      const status = document.querySelector("#status");
      const topic = this.topic.trim();
      console.log(`Unsubscribing from Topic: ${topic}`);

      this.mqttClient.unsubscribe(topic, { qos: 0 });
      status.style.color = "red";
      this.status = "UNSUBSCRIBED";
    }
  }
};
</script>

<style>
.form-row > input,
.form-row > textarea {
  flex: 2;
}
.form-row > input,
.form-row > button,
.form-row > textarea {
  padding: 0.5em;
  resize: vertical;
  margin: 10px 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  font-size: 1.2em;
}
.form-row > textarea {
  font-size: 1.5em;
  background-color: rgb(242, 248, 248);
  text-align: center;
  font-weight: bold;
}
.btn-container {
  flex: 3;
  column-gap: 10px;
  display: flex;
}
.btn-container > button {
  width: 50%;
  border: 0;
  padding: 1em;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  color: white;
  font-size: 1.2em;
}

#subscribe {
  background-color: green;
}
#unsubscribe {
  background-color: rgb(176, 6, 6);
}

#status {
  background-color: lightcyan; 
  text-align: center;
  font-weight: bold;
}

</style>
