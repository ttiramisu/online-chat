// let one = one
let showpwd;

const firebaseApp = {
  apiKey: "AIzaSyCc1RCwcQLgHCIbdAYQw-iyD9oRm0TfknM",
  authDomain: "chat-test-88207.firebaseapp.com",
  databaseURL: "https://chat-test-88207-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-test-88207",
  storageBucket: "chat-test-88207.appspot.com",
  messagingSenderId: "475093710040",
  appId: "1:475093710040:web:13a5dcf2b0b8aae81d53ad"
};

firebase.initializeApp(firebaseApp);

const db = firebase.firestore();
const auth = firebase.auth();

const register = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pword').value;
  const username = document.getElementById('username').value; // Get the username value

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        // Store the username in the real-time database
        db.collection('users').doc(user.uid).set({
          username: username
        })
          .then(() => {
            sendEmailVerification(user);
          })
          .catch((error) => {
            console.error('Error storing username:', error);
          });
      } else {
        alert('User registration failed.');
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

const sendEmailVerification = (user) => {
  user.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      alert('An email verification link has been sent to your email address. Please verify your email before logging in.');
      window.location.assign('index.html');
    })
    .catch((error) => {
      alert(error.message);
    });
};

const login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pword').value;
  localStorage.setItem('userEmail', email);

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user && user.emailVerified) {
        // Retrieve the username from the real-time database
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const username = doc.data().username;
              localStorage.setItem('username', username); // Store the username in local storage
              window.location.assign('chat.html');
            } else {
              alert('User does not exist.');
            }
          })
          .catch((error) => {
            console.error('Error retrieving username:', error);
            alert('Error retrieving username. Please try again.');
          });
      } else if (user) {
        alert('Please verify your email before logging in.');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

const resetPwd = () => {
  const email = document.getElementById('email').value;
  // let emailResetText = document.getElementById('pwdresetemailtext')
  // emailResetText.innerHTML = `Password reset Email sent to the following Email ${email}`

  auth.sendPasswordResetEmail(email);
};

const showPwd = function () {
  showpwd = document.getElementById("pword");
  if (showpwd.type === "password") {
    showpwd.type = "text";
  } else {
    showpwd.type = "password";
  }
};