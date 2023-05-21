firebase.initializeApp(firebaseApp);

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace('login.html');
  } else {
    localStorage.setItem('userEmail', user.email);
  }
});
