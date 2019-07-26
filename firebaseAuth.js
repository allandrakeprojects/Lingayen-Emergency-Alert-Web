   firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
window.location = 'administrator'
        } else {
          // No user is signed in.
          window.location = "index.html";
        }
      });

