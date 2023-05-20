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

const sendEmailVerification = () => {
  const user = auth.currentUser;
  user.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      alert(`An email verification link has been sent to ${user.email}`);
    })
    .catch((err) => {
      alert(err);
    });
};

const register = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pword').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      window.location.assign('https://fire-chatty.vercel.app/');
    })
    .catch((err) => {
      alert(err);
    });
};


const login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      window.location.assign('https://fire-chatty.vercel.app/');
    })
    .catch((err) => {
      alert(err);
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