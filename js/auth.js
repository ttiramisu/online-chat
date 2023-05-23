firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace('index.html');
    localStorage.removeItem('userEmail');
  } else {
    localStorage.setItem('userEmail', user.email);
  }
});