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

// get user data

function get(user_uid) {
  var user_ref = database.ref('users/' + firebase.auth().currentUser.uid)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

  })

}


// update options

function update_opt(){
  var username = document.getElementById('namefield').value
  var gradyear = document.getElementById('gradyear').value

  var updates = {
    gradyear : gradyear,
    full_name : username
  }

  database.ref('users/' + firebase.auth().currentUser.uid).update(updates)
    event.preventDefault();
  Swal.fire(
  'Profile updated! :D',
    '',
  'success'
)
}


// update details

function update() {
  var password = document.getElementById('passwords').value
  var email = document.getElementById('hermail').value

  var updates = {
    email : email,
    password : password
  }

  database.ref('users/' + firebase.auth().currentUser.uid).update(updates)
    event.preventDefault();
  Swal.fire(
  'Profile updated! :D',
    '',
  'success'
)
}



// log out

function logout(){    
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yuppp!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged Out!',
          'We are sad to see ya go ;( ',
          'success',
        auth.signOut()
        )
      }
    })
}



// delete account
function remove() {
    event.preventDefault();
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        database.ref('users/' + firebase.auth().currentUser.uid).remove()
        )
      }
    })
    
}


// update teachers

function get_teachers(uid){
  var user_ref = database.ref('users/' +  uid + '/ratings')
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()
    console.log('-->', data)
      for(i in data){   
          var value = data[i]['rating'] / 2 + 1;
            jQuery('<a/>', {
            "class" : 'mb-1 mt-1 btn btn-dark',
            "name": 'mainDiv',
            "text" : i + " " + value + '/5',
            "style" : 'color: aliciablue;',
            "href" : 'ratings.html?teacher=' + i}).appendTo('#left');
            jQuery('<br/>', {}).appendTo('#left');
      }
  })
    
}

// tracking user across pages


auth.onAuthStateChanged(user =>{
    console.log(user)
    if(user){
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

      })
            $("#search_bar").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar").val()
            window.location.href = "ratings.html?teacher=" + words;
        event.preventDefault()
        }
    });
        if(firebase.auth().currentUser.emailVerified){
            console.log('verified')
            $("#alertss").hide()
        }
        else{
            console.log('not verified')
        }
        $("#loginbtn").hide();
        console.log('logged <3')
          var user_ref = database.ref('users/' + user.uid)
          user_ref.on('value', function(snapshot) {
            var data = snapshot.val()
            $('#namefield').val( data.full_name);
            $('#hermail').val(data.email);
            $('#gradyear').val(data.gradyear);
              get_teachers(user.uid);
            for(i in data['saved']){
            jQuery('<a/>', {
            "class" : 'mb-1 mt-1 btn btn-dark',
            "name": 'mainDiv',
            "text" : i + " ",
            "style" : 'color: aliciablue;',
            "href" : 'ratings.html?teacher=' + i}).appendTo('#saved');
            jQuery('<br/>', {}).appendTo('#saved');
            }
          })
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

      })
        $("#search_bar").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if(keycode == '13') {
            words = $("#search_bar").val()
            window.location.href = "ratings.html?teacher=" + words;
        event.preventDefault()
        }
    });
        
    }
    else{
        console.log('nopeeeedxd')
        $("#profilebtn").hide();
        $("#addbtn").hide();
        window.location.href = "index.html";   
    }
    
})







// Validate Functions
function validate_email(email) {
  expression = new RegExp('[a-z0-9]+@gmail.com');
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
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