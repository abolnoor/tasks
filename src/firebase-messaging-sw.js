
importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js');


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAU60cb5PPzSUimUyBOq9BleKrWWPMmUzM",
    authDomain: "tasks-268523.firebaseapp.com",
    databaseURL: "https://tasks-268523.firebaseio.com",
    projectId: "tasks-268523",
    storageBucket: "tasks-268523.appspot.com",
    messagingSenderId: "400415981464",
    appId: "1:400415981464:web:55347677b94cb8651c75ed",
    measurementId: "G-YWGE6NKVSQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Retrieve Firebase Messaging object.
const messaging = firebase.messaging();





messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
