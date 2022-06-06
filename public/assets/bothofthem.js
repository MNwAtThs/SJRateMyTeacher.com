 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = 
 {
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
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value


    
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
    
    
 
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

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


// Set up our login function
function login () {
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
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// get user teacher

function geteacher() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
  var user_ref = database.ref('teachers/' + teacher)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()
    console.log(data['subject'])
    document.getElementById("teacher_name").textContent=data['name'];
    document.getElementById("subject").textContent=data['subject'];
    for(i in data['ratings']){
    document.getElementById("follow1").textContent=data['ratings'][i]['tags']['0'];
    document.getElementById("follow2").textContent=data['ratings'][i]['tags']['1'];
    document.getElementById("follow3").textContent=data['ratings'][i]['tags']['2'];   
    }


  })

}



// give rating to teacher

function feedback(uid){
    event.preventDefault();
  var user_ref = database.ref('users/' + uid)

  var comment = document.getElementById('comment').value
  var aa = $("#www").css("transform");
  var num = aa.charAt(aa.length - 5);
    star = num;
  var hers = num / 2 + 1
  var terrible = 0
  var bad  = 0 
  var okay = 0
  var good = 0
  let great = 0
  if(hers == 5) {
      great = 1
  }
  if(  hers == 4){
          good =1
  }
  if( hers == 3){
      okay = 1
  }
  if(hers == 2){
      bad = 1
  }
  if(hers == 1){
      terrible = 1
  }
  
 var dif = $( "#diflev" ).val();
    var attendance;
  var attendancenope = document.getElementById('nopeatt')
  if(attendancenope == true){
      attendance = "nope";
  }
  else{
      attendance = "yeah";
  }
    var again;
  var nopeAgain = document.getElementById('nopeAgain')
  if(nopeAgain == true){
      again = "nope";
  }
  else{
      again = "yeah";
  }
  var nopeAgain = document.getElementById('nopeAgain')
  if(nopeAgain == true){
      again = "nope";
  }
  else{
      again = "yeah";
  }
  var ocredit;
  var credit = document.getElementById('credit')
  if(credit == true){
      ocredit = "nope";
  }
  else{
      ocredit = "yeah";
  }
  var bookuse;
  var books = document.getElementById('book')
  if(books == true){
      bookuse = "nope";
  }
  else{
      bookuse = "yeah";
  }
  var tags = $("#select-tags").val();
  var grade = $("#select-tools").val();

    
  var updates = {
    comment : comment,
    stars : star,
    level : dif,
    repeat : again,
    attendance : attendance,
    tags : tags,
    textbook : bookuse,
    credit_only : ocredit,
    grade : grade,
  }
  user_ref.on('value', function(snapshot) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    var data = snapshot.val()
      database.ref('teachers/' +  teacher + '/ratings/' + data['full_name']).update(updates)
      Swal.fire(
      'Rating sent! :D',
        '',
      'success'
    )
  })
  var user_updates = {
    rating : star,
    comment : comment,
  }
      const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
  database.ref('users/' + uid + '/ratings/' + teacher).update(user_updates)
    
    var teacher_ref = database.ref('teachers/' + teacher)
      teacher_ref.on('value', function(lolz) {
        var teach = lolz.val()
      })
    
    
    
}

function teacherfb(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    
    var teacher_ref = database.ref('teachers/' + teacher)
      teacher_ref.on('value', function(lolz) {
        var teach = lolz.val()
        console.log('8===D', teach['averages'])
          var int_media = parseInt(teach['averages']['media'])
          var new_media = int_media + star
          var ass = teach['averages']['counter_media']
          var a  = parseInt(ass)
          console.log(a)
          new_media1 = new_media / a
          console.log(new_media)
          var rt = parseInt(teach['averages']['counter_media']) + 1
          console.log(rt)
          var average_updates ={
          media : 14,
          retake : 12,
          counter_media : 1,
          counter_retake :rt,
      }
          database.ref('teachers/' +  teacher + '/averages' ).update(average_updates)
      })
    
}


//  function for counting stars

function stars(){
    var final = 0;
    for (let step = 1; step <= 5; step++) {
      // Runs 5 times, with values of step 0 through 4.
      var star = document.getElementById(step).value
    var hers =  '#' +  star
    if ($(hers).is(":checked")) {
      // do A
        console.log('tes');
        final = star;
        break;
    }
        
    }
    if (final == 0){
        return false
    }
    else {
        return final;
    }
    
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


// tracking user across pages

auth.onAuthStateChanged(user =>{
    if(user){
        $("#submitrating").click(function()
        {
           feedback(user.uid);
        });
        $("#loginbtn").hide();
        console.log('logged <3')
        geteacher();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
      var user_ref = database.ref('teachers/' + teacher +  '/ratings/')
      user_ref.on('value', function(snapshot) {
          var sum = 0;
          var counter = 0;
          var yeahs = 0;
        var data = snapshot.val()
        for (i in data){
            if(data[i]['repeat'] == 'yeah'){
                yeahs = yeahs + 1;
            } 

        }

      })
    }
    else{
        console.log('nopeeeedxd')
        $("#profilebtn").hide();
        $("#addbtn").hide();
        window.location.href = "index.html";
    }
    
})


//add a new teacher

function teacher(){
  var name = document.getElementById('namefield').value
  var subj = document.getElementById('subject').value
          
          var average_updates ={
          media : 0,
          retake : 0,
          counter_media : 1,
          counter_retake :0,
      }
  var updates = {
    name : name,
    subject : subj
  }
  var alls = {
      terrible : 0,
      bad : 0,
      okay : 0,
      good : 0,
      great : 0
  }
  database.ref('teachers/' +  name + '/averages/' ).update(average_updates)
  database.ref('teachers/' +  name + '/all_ratings/' ).update(alls)

  database.ref('teachers/' + name).update(updates)
    event.preventDefault();
  Swal.fire(
  'Settings updated! :D',
    '',
  'success'
)
    
    
}



// calculate percentage

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
} 


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