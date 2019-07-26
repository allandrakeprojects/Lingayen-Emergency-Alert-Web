
var countEr = 1;
function login(){
  

  
   var userEmail =document.getElementById("email_field").value;
   var userPass = document.getElementById("password_field").value;

   firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(auth){
    console.log(firebase.auth().currentUser);
    if(firebase.auth().currentUser){
  
      nn = firebase.auth().currentUser.uid;
      window.location = 'administrator/user.html';

    } else {
      // No user is signed in.

  
      window.alert('No Such User');
      
    }
  
  

   }).catch(function(error) {
    countEr ++;
    console.log(countEr);
    if(countEr == 4){
      
      window.location = "404error.html";
      countEr = 0;
      return;
    }
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    window.alert("Error : "+ errorMessage);

  });

 // firebase.auth().onAuthStateChanged(function(user) {
   // if (user.emailVerified === true) {
      // User is signed in.
  //window.location = 'administrator/user.html'
   // } else {
      // No user is signed in.
     // window.alert('please verify your email');
   // }
  //});
 
  
  
}

function signUp(){
  var userEmail =document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

 
 
}


 

  function submit() {
    firebase.auth().onAuthStateChanged(function(user) {

      var userId = firebase.auth().currentUser.uid;
      var bname =document.getElementById("bname_field").value;
        var cname = document.getElementById("cname_field").value;
        var cnum =document.getElementById("cnum_field").value;
      if(bname != "" || cname != "" || cnum != ""  ){
    firebase.database().ref('/info/' + userId).set({
      bname: bname,
      uid: userId,
      cname : cname,
      cnum : cnum
    }).then(function(user){
      window.location.href = "administrator/user.html";
    });
    
  } else{

    window.alert('Error : Incomplete details.');
  }
    
  });
 
  }

 
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.assign("index.html");
      }).catch(function(error) {
        // An error happened.
        window.alert(error);
      });
}




Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false
});

var i = 0;
function showWarningAndThrow() {
    if (!i) {
        setTimeout(function () {
            
          console.log("%cDon't try to be funny here bro! Trust me!", "font: 2em sans-serif; color: yellow; background-color: red;");
          console.log("%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a hack you're welcome to try it. :)","font: 2em sans-serif; color: black;");
        }, 1);
        i = 1;
    }
    throw "Console is disabled";
}

var l, n = {
        set: function (o) {
            l = o;
        },
        get: function () {
            showWarningAndThrow();
            return l;
        }
    };
Object.defineProperty(console, "_commandLineAPI", n);
Object.defineProperty(console, "__commandLineAPI", n);

showWarningAndThrow();