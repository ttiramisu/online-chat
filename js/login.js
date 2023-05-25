let showpwd;

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
      'tcwlx.com'
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

// Check if the IP address has reached the registration limit
const checkRegistrationLimit = (email) => {
  const ipAddress = getIpAddress(); // Implement your own logic to retrieve the IP address
  const maxRegistrationPerIpAddress = 1; // Set the maximum allowed registrations per IP address

  // Implement your own logic to check the registration count for the given IP address
  // You can use a database or any other storage mechanism to keep track of the registration counts per IP address

  // Example code to check the registration count
  const registrationCount = getRegistrationCountByIpAddress(ipAddress); // Implement this function
  if (registrationCount >= maxRegistrationPerIpAddress) {
    return true; // Registration limit reached
  }

  return false; // Registration limit not reached
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
