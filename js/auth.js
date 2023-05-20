firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    
  } else {
    // User is not signed in, redirect to the login page
    window.location.replace('login.html');
  }
});
