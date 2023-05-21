firebase.initializeApp(firebaseApp);

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace('https://fire-chatty.vercel.app/');
  } else {
    localStorage.setItem('userEmail', user.email);
  }
});
