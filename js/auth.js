const firebaseInfo = {
  apiKey: "AIzaSyCc1RCwcQLgHCIbdAYQw-iyD9oRm0TfknM",
  authDomain: "chat-test-88207.firebaseapp.com",
  databaseURL: "https://chat-test-88207-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-test-88207",
  storageBucket: "chat-test-88207.appspot.com",
  messagingSenderId: "475093710040",
  appId: "1:475093710040:web:13a5dcf2b0b8aae81d53ad"
};

firebase.initializeApp(firebaseInfo);

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace('index.html');
    localStorage.removeItem('userEmail');
  } else {
    localStorage.setItem('userEmail', user.email);
  }
});