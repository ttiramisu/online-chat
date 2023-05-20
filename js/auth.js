firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, allow access to the webpage
  } else {
    // User is not signed in, redirect to the login page
    window.location.replace('login.html');
  }
});
