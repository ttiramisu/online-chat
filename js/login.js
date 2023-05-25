let showpwd;
let ipAddress;

const firebaseApp = {
  apiKey: 'AIzaSyCc1RCwcQLgHCIbdAYQw-iyD9oRm0TfknM',
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

// Custom validation rules
const customValidationRules = [
  // Check for suspicious email domains
  (email) => {
    const domain = email.split('@')[1];
    const suspiciousDomains = [
      "example.com",
      "spamdomain.com",
      "tempmail.org",
      'mevori.com',
      'mailtouiq.com',
      '.website',
      'mailtouiq.com',
      'tcwlx.com',
      'favilu.com',
      'e4ward.com',
      'sharklasers.com',
      'guerrilla',
      'pokemail.net',
      'grr.la',
      'spam4.me'
    ];
    return suspiciousDomains.includes(domain);
  },
];

// Registration validation
const validateRegistration = (email, password) => {
  const errors = [];

  // Email validation
  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  // Custom validation rules
  if (customValidationRules.some((rule) => rule(email))) {
    errors.push("Email address is not allowed.");
  }

  return errors;
};

// Validate email address format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getIpAddress = () => {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      ipAddress = data.ip;
      // Use the ipAddress as needed
      console.log('IP Address: ' + ipAddress);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// New database
const storeRegistrationInfo = (ipAddress, registrationTime) => {
  const registrationsCollection = firebase.firestore().collection('registrations');

  // Create a new document with auto-generated ID
  registrationsCollection.add({
    ipAddress: ipAddress,
    registrationTime: registrationTime
  })
    .then((docRef) => {
      console.log('Registration information stored');
    })
    .catch((error) => {
      console.error('Error storing registration information:', error);
    });
};

const checkRegistrationLimit = (email) => {
  // Retrieve the maximum allowed registrations per IP address from a configuration or constant
  const maxRegistrationPerIpAddress = 3;

  return getRegistrationCountByIpAddress(ipAddress)
    .then((registrationCount) => {
      return registrationCount >= maxRegistrationPerIpAddress;
    })
    .catch((error) => {
      console.error('Error checking registration limit:', error);
      return false; // Return false in case of an error
    });
};

// Retrieve registration count by IP address from Firestore
const getRegistrationCountByIpAddress = (ipAddress) => {
  const registrationsCollection = firebase.firestore().collection('registrations');

  return registrationsCollection.where('ipAddress', '==', ipAddress).get()
    .then((querySnapshot) => {
      return querySnapshot.size; // Return the count of matching documents
    })
    .catch((error) => {
      console.error('Error retrieving registration count:', error);
      return 0; // Return 0 in case of an error
    });
};

const register = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pword').value;

  const validationErrors = validateRegistration(email, password);
  if (validationErrors.length > 0) {
    // Display validation errors to the user
    validationErrors.forEach((error) => {
      alert("Error: " + error);
    });
    return;
  }

  if (checkRegistrationLimit(email)) {
    alert("Registration limit reached for your IP address. Please try again later.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        sendEmailVerification(user);
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

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user && user.emailVerified) {
        window.location.assign('chat.html');
        localStorage.setItem('userEmail', email);
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

const showPwd = () => {
  const passwordField = document.getElementById("pword");
  passwordField.type = (passwordField.type === "password") ? "text" : "password";
};
