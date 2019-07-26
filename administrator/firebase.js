      var otherApp = "";
      var list_users = new Array();
      var sort_detect = false;
      $(document).ready(function(){
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCktVjMB4PC-uv5HV0F_Ns6QNPK3VsmVOM",
        authDomain: "alertapp1-47d0a.firebaseapp.com",
        databaseURL: "https://alertapp1-47d0a.firebaseio.com",
        projectId: "alertapp1-47d0a",
        storageBucket: "alertapp1-47d0a.appspot.com",
        messagingSenderId: "738948375197"
      };
      var config_2 = {
        apiKey: "AIzaSyCKPgEBoOD7eCb_5dorAx7mb_KQBlCKtXo",
        authDomain: "alertapp2.firebaseio.com",
        databaseURL: "https://alertapp2.firebaseio.com",
        projectId: "alertapp2",
        storageBucket: "alertapp2.appspot.com",
        messagingSenderId: "738948375197"
      };
      firebase.initializeApp(config);

      otherApp = firebase.initializeApp(config_2, "secondary");
      var reftest = otherApp.database().ref().child("user");
      reftest.on('child_added', snapshot=> {
        var email = snapshot.child("email").val();
        var bname = snapshot.child("bname").val();
        var uid = snapshot.child("uid").val();
        var status = snapshot.child("status").val();
        if(status == "X"){
          $("#tableUsers").append("<tr><td>"+email+"</td><td>"+bname+"</td><td><button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+uid+"' onclick='cancel_users(this);'>Cancel</button> <button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+uid+"' onclick='upData_users(this);'>Confirm</button></td></tr>");
        }
      }, function (error) {
        console.log("Error: " + error.code);
      });
      
      firebase.auth().onAuthStateChanged(function(user) {
        if(user){
          // User is signed in.

          //fetch brgy name
          var userId = firebase.auth().currentUser.uid;
          var ref = firebase.database().ref().child("info");
            ref.orderByChild("uid").equalTo(userId).on("child_added", snapshot => {
        var bname = snapshot.child("bname").val();
        var cname = snapshot.child("cname").val();
         var cnum = snapshot.child("cnum").val();
        
         if(bname != "" && cname != "" && cnum != ""){
          //end
          

          //fetch tb
          var snapFetch = firebase.database().ref().child("transaction");

            snapFetch.child(userId).orderByChild("time").on("child_added", snapshot => {
              
        var tname = snapshot.child("u_name").val();
        var emergency = snapshot.child("emerg").val();
        var msg = snapshot.child("msg").val();
        var readstate = snapshot.child("read").val();
        var dTime = snapshot.child("time").val();
        var id = snapshot.child("id").val();
        if(readstate == "false"){
          var egc = emergency;
          var audio = new Audio('../audio/alert_sound.mp3');
          audio.loop = true;
          audio.play(); 
          $("#tableTransaction").append("<tr class='"+egc+"'><td>"+tname+"</td><td>"+emergency+"</td><td><button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+id+"' onclick='upData();'>Action</button></td></tr>");
          $("#tableTransaction1").append("<tr class='"+egc+"'><td>"+tname+"</td><td>"+emergency+"</td><td><button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+id+"' onclick='upData();'>Action</button></td></tr>");
        }
        else{
          $("#tableTransactionHistory").append("<tr><td>"+tname+"</td><td>"+emergency+"</td><td>"+msg+"</td></tr><td>"+dTime+"</td></tr>");
          $("#tableTransactionHistory1").append("<tr><td>"+tname+"</td><td>"+emergency+"</td></tr><td>"+dTime+"</td></tr>");
          
          window.setInterval(function() {
            if(!sort_detect){
              sort();
              sort_detect = true;
            }
          }, 1000);
        }        
}, function (error) {
                 console.log("Error: " + error.code);
            });

            // 
            
          }
          else{
            window.location = "../desc.html";
          }
      
            // document.getElementById("userName").innerHTML = bname;
            
            }, function (error) {
                 console.log("Error: " + error.code);
            });
      }
        else {
          // No user is signed in.
          window.location = "../../";
        }
      });
});

function upData_users(elem) {
  var uid = elem.value;
  var ref = otherApp.database().ref().child("user");
  ref.orderByChild("uid").equalTo(uid).on("child_added", snapshot => {
  var bname = snapshot.child("bname").val();
  var email = snapshot.child("email").val();
  var postData = {
    bname : bname,
    email : email,
    status : "A",
    uid : uid
  };
  var updates = {};
  updates['/user/'+uid] = postData;
  otherApp.database().ref().update(updates);
  location.reload();
}, function (error) {
  alert(error.code);
  console.log("Error: " + error.code);
});
}

function cancel_users(elem) {
  var uid = elem.value;
  var ref = otherApp.database().ref().child("user");
  ref.orderByChild("uid").equalTo(uid).on("child_added", snapshot => {
  var bname = snapshot.child("bname").val();
  var email = snapshot.child("email").val();
  var postData = {
    bname : bname,
    email : email,
    status : "C",
    uid : uid
  };
  var updates = {};
  updates['/user/'+uid] = postData;
  otherApp.database().ref().update(updates);
  location.reload();
}, function (error) {
  alert(error.code);
  console.log("Error: " + error.code);
});
}

function sort(){
  $("#tblCustomers tbody").each(function(elem,index){
    var arr = $.makeArray($("tr",this).detach());
    arr.reverse();
      $(this).append(arr);
  });
}

function upData() {
  firebase.auth().onAuthStateChanged(function(user) {

    var userId = firebase.auth().currentUser.uid;

    var ref = firebase.database().ref().child("transaction");
    
    ref.child(userId).on("child_added", snapshot => {
  var emerg = snapshot.child("emerg").val();
  var id = document.getElementById("readstate_field").value;
  var msg = snapshot.child("msg").val();
  var time = snapshot.child("time").val();
  var u_id = snapshot.child("u_id").val();
  var c_id = snapshot.child("c_id").val();
  var u_name = snapshot.child("u_name").val();


        var tripx = document.getElementById("readstate_field").value;
  var readState = "true";
  // A post entry.
  var postData = {
    read: readState,
    emerg :emerg,
    id : id,
    msg: msg,
    time : time,
    c_id : c_id,
    u_id : u_id,
    u_name : u_name
  };

  // Get a key for a new Post.


  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/transaction/'+userId+'/' + id] = postData;


  firebase.database().ref().update(updates);
  var loc = msg.split(': ').pop();
  
window.open(loc);
location.reload();
});
}, function (error) {
console.log("Error: " + error.code);
});

}

function putangina(){

  var from=document.getElementById("searchFrom").value;
  
  console.log(from.replace(/-|:|T/g,''));

  var to=document.getElementById("searchTo").value;
  
  console.log(to.replace(/-|:|T/g,''));


  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
  
            if (firebase.auth().currentUser.emailVerified) {

              

      // User is signed in.

      //fetch brgy name
      var userId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref().child("info");
      
        ref.orderByChild("uid").equalTo(userId).on("child_added", snapshot => {
    var bname = snapshot.child("bname").val();
    var cname = snapshot.child("cname").val();
     var cnum = snapshot.child("cnum").val();
    
     if(bname != "" && cname != "" && cnum != ""){
      //end
      

      //fetch tb
      var snapFetch = firebase.database().ref().child("transaction");

        snapFetch.child(userId).orderByChild("time").startAt(from).endAt(to).on("child_added", snapshot => {
          
    var tname = snapshot.child("u_name").val();
    var emergency = snapshot.child("emerg").val();
    var msg = snapshot.child("msg").val();
    var readstate = snapshot.child("read").val();
    var dTime = snapshot.child("time").val();
    var id = snapshot.child("id").val();
console.log(id);
    if(readstate == "false"){
      var egc = emergency;
      var audio = new Audio('../audio/alert_sound.mp3');
      audio.loop = true;
      audio.play();
      $("#tableTransaction").append("<tr class='"+egc+"'><td>"+tname+"</td><td>"+emergency+"</td><td><button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+id+"' onclick='upData();'>Location</button></td></tr>");
      $("#tableTransaction1").append("<tr class='"+egc+"'><td>"+tname+"</td><td>"+emergency+"</td><td><button class='au-btn au-btn-icon au-btn--blue' id='readstate_field' value='"+id+"' onclick='upData();'>Location</button></td></tr>");
      
    }
    else{
      alert(dTime);
      $("#tableTransactionHistory").append("<tr><td>"+tname+"</td><td>"+emergency+"</td><td>"+msg+"</td></tr><td>"+dTime+"</td></tr>");
      $("#tableTransactionHistory1").append("<tr><td>"+tname+"</td><td>"+emergency+"</td></tr><td>"+dTime+"</td></tr>");

}          
}, function (error) {
             console.log("Error: " + error.code);
        });

        //
        
      }
      else{
      window.location = "../desc.html";

      }
  
        // document.getElementById("userName").innerHTML = bname;
        
        }, function (error) {
             console.log("Error: " + error.code);
        });
       

        
    }
    else{
      window.location = "../error.html";
    }
  }
    else {
      // No user is signed in.
      window.location = "../../";
    }
  });

}

function signOut(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = "../index.html"
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