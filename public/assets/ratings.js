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
        event.preventDefault();
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



function redirects(){
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    window.location.href = "teacher.html?teacher=" + teacher;
    
    
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

// charts

function chartss(){
    
     const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')    
    var teacher_ref = database.ref('teachers/' + teacher)
      teacher_ref.on('value', function(lolz) {
        var teach = lolz.val()
        var trb = 0
        var bad = 0
        var okay = 0
        var good = 0
        var great = 0
        for( i in teach["ratings"]){
            var a = parseInt(teach["ratings"][i]["stars"])
            if(a / 2 + 1 == 5){
                great = great+1
            }
            if(a / 2 + 1 == 4){
                good = good+1
            }
            if(a / 2 + 1 == 3){
                okay = okay+1
            }
            if(a / 2 + 1 == 2){
                bad = bad+1
            }
            if(a / 2 + 1 == 1){
                trb = trb+1
            }
        }
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['😡', '😔', '😐', '😃', '😊'],
        datasets: [{
            label: 'Number of ratings',
            data: [trb, bad, okay, good, great],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
      })

    
    
}

//funtion like click


function like_click(name, uid, id){
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    var updates={
        "likes" : 'yes'
    }
    database.ref('teachers/' + teacher +  '/ratings/' + name + '/likes/' + uid ).update(updates)
    var like_ref = database.ref('teachers/' + teacher +  '/ratings/' + name + '/likes')
    like_ref.on('value', function(snapshot) {
        var us= 0
        var her = snapshot.val()
        for (me in her){
            us = us + 1
            console.log(me)
        }
        $('#' + id).text(us)
    })

}

function dislike_click(name, uid, id){
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    var updates={
        "likes" : 'yes'
    }
    database.ref('teachers/' + teacher +  '/ratings/' + name + '/dislikes/' + uid ).update(updates)
    var like_ref = database.ref('teachers/' + teacher +  '/ratings/' + name + '/dislikes')
    like_ref.on('value', function(snapshot) {
        var us= 0
        var her = snapshot.val()
        for (me in her){
            us = us + 1
            console.log(me)
        }
        $('#' + id).text(us)
    })

}

// tracking user across pages

auth.onAuthStateChanged(user =>{
    if(user){
        console.log('user here', user['uid'])
        chartss()
        user_uid = user['uid']
        $("#loginbtn").hide();
        console.log('logged <3')
        geteacher();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacher = urlParams.get('teacher')
    var tch_ref= database.ref('/teachers/')
    tch_ref.on('value', function(snapshot){
        var tch_ar = []
        var lolz = snapshot.val()
        var att = 0
        for (i in lolz){
            tch_ar.push(lolz[i]['name'])
            att =att+1
        }
        shuffle(tch_ar);
        for(i in tch_ar){
            if(i > 5){
                break
            }
            else if(tch_ar[i] != teacher){
            jQuery('<a/>', {
                "style" : 'font-size=20px; color:black',
                "href" : "ratings.html?teacher=" + tch_ar[i],
                "class" : "mr-1",
                "text" : tch_ar[i] + ','
                        }).appendTo("#similar");
            }
        }
        console.log('love cozy', att, tch_ar)
        
    })
      var user_ref = database.ref('teachers/' + teacher +  '/ratings/')
      user_ref.on('value', function(snapshot) {
          $("#form").empty()
          $("#similar").empty()
          var sum = 0;
          var counter = 0;
          var yeahs = 0;
          var dif_lvl = 0;
          var mult_ctn = 100000
        var data = snapshot.val()
        for(i in data){
            document.getElementById("follow1").textContent=data[i]['tags']['0'];
            document.getElementById("follow2").textContent=data[i]['tags']['1'];
            document.getElementById("follow3").textContent=data[i]['tags']['2'];   
    }
        for (i in data){
            if(data[i]['repeat'] == 'yeah'){
                yeahs = yeahs + 1;
            } 
            console.log('luk here-->',data[i])
            star = parseInt(data[i]['stars']) / 2 +1
            ccc = parseInt(data[i]['level'])
            counter = counter+1
            mult_ctn = mult_ctn +3
            dif_lvl = dif_lvl + ccc
            sum = sum + star
            var $div = $("<div>", {id: "foo", "class": "mt-2 content love_all", "style":"width: 100%;"});

            jQuery('<i/>', {
            "class": 'fa fa-thumbs-o-down dislike_button',
                name: "dislike",
            "aria-hidden" : "true",
            }).appendTo(jQuery('<button/>', {
            "id" : mult_ctn,
            "class": 'dislike lk_btn  ml-1 mt-1',
            "type":'button',
             "onclick" : 'dislike_click(' + `"` + i + `"` + ',' + `"` + user_uid + `"` +  ',' + `"` + mult_ctn + `"`  +')',
            }).appendTo($div))
            
;
            jQuery('<i/>', {
            "class": 'fa fa-thumbs-o-up like_button',
            name: "like",
            "aria-hidden" : "true",
            }).appendTo(jQuery('<button/>', {
            "id" : counter,
            "class": 'like lk_btn  ml-1 mt-1',
                        "type":'button',
            "onclick" : 'like_click(' + `"` + i + `"` + ',' + `"` + user_uid + `"` +  ',' + `"` + counter + `"`  +')',
            }).appendTo($div))
            
            
            
            $("#form").append($div);
        var $info_div = jQuery('<div/>', {
            "name": 'infoDiv',
            "class": 'info',
            }).appendTo($div);
         var $users_infos = jQuery('<div/>', {
            "name": 'user-info',
            "class": 'user-info',
            }).appendTo($info_div); 
        var b = parseInt(data[i]['stars']);
        var rating = b / 2 + 1;
       jQuery('<h1/>', {
            "name": '',
            "class": '',
           "style" : 'color : black',
            "text" : i + ' , ' + "Grade " + rating}).appendTo($users_infos);
        var $btn_grp =  jQuery('<div/>', {
            "id": 'follow',
            "class": 'btn-group',
            "role" : 'group',
            }).appendTo($users_infos);
        for ( e in  data[i]['tags']){
       jQuery('<h2/>', {
            "id": 'follow',
            "class": 'follow',
           "style" : 'color : black',
            "text" : data[i]['tags'][e]}).appendTo($btn_grp);
        }
         
        var $extra_div =          jQuery('<div/>', {
            "name": 'extra-info',
            "class": 'extra-info',
            }).appendTo($div);  
        var $left_div = jQuery('<div/>', {
            "name": 'extra-info',
            "class": 'left',
            "style" : 'color : black',
            "text" : 'Attendance : ' + data[i]['attendance'] + ', ' + 'Retake : ' + data[i]['repeat'] + ', '+ 'Grade received:' + ' ' + data[i]['grade'],
            }).appendTo($extra_div);  
            

        var $coment_div = jQuery('<div/>', {
            "name": 'comments',
            "class": 'comments',
            }).appendTo($div);
        var $coments_div = jQuery('<div/>', {
            "name": 'comments',
            "class": 'comment card',
            }).appendTo($coment_div);
       jQuery('<h2/>', {
            "name": 'mainDiv',
            "class": 'card-title',
            "text" : data[i]['comment']}).appendTo($coments_div);
       
        }

        
        sum = sum / counter
        console.log('sum', sum)
        console.log('counter', counter)
        ouch = "Average grade " + sum + "<sup>/5</sup>"
        perc =   percentage(counter, yeahs)
        dif_lvl = dif_lvl / counter
        rtk = "Would take again " + perc + "%"
        $( "#avg_grade" ).html( ouch  );
        $( "#retakes" ).html( rtk  );
        love_all = "Difficulty : " + dif_lvl
        $("#dif").html (love_all);
      })
        $("#save_btn").click(function(e){
        e.preventDefault();
          var saved = {
            teacher : teacher,
            
          }
          database.ref('users/' + user.uid + '/saved/' + teacher ).update(saved)

        $("#save_btn").text("saved!")
       });

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
  database.ref('teachers/' +  name + '/averages/' ).update(average_updates)

  database.ref('teachers/' + name).update(updates)
    event.preventDefault();
  Swal.fire(
  'Settings updated! :D',
    '',
  'success'
)
    
    
}

// shuffle function

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
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