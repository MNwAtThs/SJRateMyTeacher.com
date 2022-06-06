 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBbSFFezfD7M_dWtQnCdhA0SEVzITJBSj0",
  authDomain: "sjratemyteacher.firebaseapp.com",
  databaseURL: "https://sjratemyteacher-default-rtdb.firebaseio.com",
  projectId: "sjratemyteacher",
  storageBucket: "sjratemyteacher.appspot.com",
  messagingSenderId: "225219615383",
  appId: "1:225219615383:web:1816cedee5f14c486627d2",
  measurementId: "G-9KHKE96B1K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('emails').value
  password = document.getElementById('passwords').value
  full_name = document.getElementById('full_names').value



  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
    event.preventDefault();

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        alert('Email Verification Sent!');
      });
    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
            $("#profilebtn").show();
        $("#addbtn").show();

      //window.location.href = "dashboard.html";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert("There has been an error, the email may already exist!")
    })
}


// Set up our login function
function login () {
    event.preventDefault();
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)
    // DOne
      alert("User logged!")

      window.location.href = "dashboard.html";

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// get user data

function get(user_uid) {
  var user_ref = database.ref('users/' + 'G14F8z5aXrhhf5ZMsY0N4ZqTta32')
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

    console.log(data)

  })

}


// get all teachers


function geteachers() {
  var user_ref = database.ref('teachers/')
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()
    for(i in data){
        console.log(data[i])
    }

  })

}

// searchbar function

function searches(data, search_word){
    const options = {
  includeScore: true
}

    const fuse = new Fuse(data, options)

    const result = fuse.search(search_word)
    return result

}

    function sendEmailVerification() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        alert('Email Verification Sent!');
      });
    }


// tracking user across pages


auth.onAuthStateChanged(user =>{
    if(user){
        if(firebase.auth().currentUser.emailVerified){
            console.log('verified')
        }
        else{
            console.log('not verified')
        }
        console.log('logged <3')
        get(user.uid)
        $("#loginbtn").hide();
      var user_ref = database.ref('teachers/')
      user_ref.on('value', function(snapshot) {
        var data = snapshot.val()
        var teachers_list = []
        for(i in data){
            teachers_list.push(data[i]['name'])

        }
              $("#search_bar").autocomplete({
            source: teachers_list
          });
              $("#search_bar1").autocomplete({
            source: teachers_list
          });
                  $("#search_bar2").autocomplete({
            source: teachers_list
          });
                  $("#search_bar3").autocomplete({
            source: teachers_list
          });

      })
    $("#search_bar").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar").val()
            window.location.href = "ratings.html?teacher=" + words;
        event.preventDefault()
        }
    });
    $("#search_bar1").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar1").val()
            window.location.href = "ratings.html?teacher=" + words;
        event.preventDefault()
        }
    });
    $("#search_bar2").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar2").val()
            window.location.href = "teacher.html?teacher=" + words;
        event.preventDefault()
        }
    });
    $("#search_bar3").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar3").val()
            window.location.href = "teacher.html?teacher=" + words;
        event.preventDefault()
        }
    });
    }
    else{
        console.log('nopeeeedxd')
        $("#profilebtn").hide();
        $("#addbtn").hide();
    }

})


function reset_email(){
    event.preventDefault();
    var email = document.getElementById('emmls').value
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("Email Sent")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("There has been an error")
        // ..
      });
}


// Validate Functions
function validate_email(email) {
  expression = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$');
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
      alert(email)
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
