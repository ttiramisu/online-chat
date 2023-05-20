firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.assign('chat.html')
  } else {
    // User is not signed in, redirect to the login page
    window.location.replace('login.html');
  }
});
