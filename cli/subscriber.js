const mqtt = require("mqtt");

//var mqttClient;
let mqttClient;

// Config
//const mqttHost = "192.168.0.108";
const mqttHost = "localhost";
const protocol = "mqtt";
const port = "1883";

// ---------------------------------------------------------------
// window.addEventListener("load", (event) => {
//   connectToBroker();

//   const subscribeBtn = document.querySelector("#subscribe");
//   subscribeBtn.addEventListener("click", function () {
//     subscribeToTopic();
//   });

//   const unsubscribeBtn = document.querySelector("#unsubscribe");
//   unsubscribeBtn.addEventListener("click", function () {
//     unsubscribeToTopic();
//   });
// });
// ----------------------------------------------------------------------


function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Config
  const hostURL = `${protocol}://${mqttHost}:${port}`;
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

  // hostURL or host
  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );

    // Extra logic needed for UI here
    // I can choose either 
    // 1. basic method (sending messages every sec) or 2. web push

    //startSendingMessages(message.toString());
    //sendPushNotification(message.toString());
    // ------------------------------------------------------------
    //const messageTextArea = document.querySelector("#message");
    //messageTextArea.value += message + "\r\n";
    // ---------------------------------------------

  });
}

// function sendPushNotification(message) {
//   if (!("serviceWorker" in navigator)) {
//     console.error("Service workers are not supported.");
//     return;
//   }

//   // Check if the service worker is ready
//   navigator.serviceWorker.ready.then(function(registration) {
//     // Create the payload for the push notification
//     const payload = {
//       title: "New Message",
//       body: message,
//       //icon: "path/to/icon.png", // Replace with the path to your icon
//       data: {
//         url: window.location.href // Include any additional data you need
//       }
//     };

//     // Send the push notification
//     registration.showNotification(payload.title, payload);
//   });
// }


// function sendPushNotification(message) {
//   if (!("serviceWorker" in navigator)) {
//     console.error("Service workers are not supported.");
//     return;
//   }

//   // Check if the service worker is ready
//   navigator.serviceWorker.ready.then(function(registration) {
//     // Create the payload for the push notification
//     const payload = {
//       title: "New Message",
//       body: message,
//       //icon: "path/to/icon.png", // Replace with the path to your icon
//       data: {
//         url: window.location.href // Include any additional data you need
//       }
//     };

//     // Send the push notification
//     registration.showNotification(payload.title, payload);
//   });
// }


function startSendingMessages(message) {
  if (sendInterval) {
    clearInterval(sendInterval);
  }
  
  sendInterval = setInterval(() => {
    // Send the message every second
    console.log("Sent message:", message);
    
    // You can perform additional actions here, such as sending the message over WebSocket
    // or any other desired functionality.
  }, 1000); // 1000 milliseconds = 1 second
}

// topic
function subscribeToTopic(topic) {

  //const status = document.querySelector("#status");
  //const topic = document.querySelector("#topic").value.trim();

  console.log(`Subscribing to Topic: ${topic}`);
  mqttClient.subscribe(topic, { qos: 0 });

  //status.style.color = "green";
  //status.value = "SUBSCRIBED";
}

// ----------------------------------------------------------------
function unsubscribeToTopic(topic) {
  //const status = document.querySelector("#status");
  //const topic = document.querySelector("#topic").value.trim();
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, { qos: 0 });
  //status.style.color = "red";
  //status.value = "UNSUBSCRIBED";
}

connectToBroker();
subscribeToTopic("temperature");
