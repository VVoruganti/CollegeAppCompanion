firebase.auth().onAuthStateChanged(function(user) {
  var globaluser = user;
  if (user) {
    document.getElementById("welcome").innerText = "Welcome " + user.displayName;
    
    $.ajax({
        url:'/checkuser',
        type:'post',
        data:{"uid":user.uid},
        success:function() {
            document.body.innerHTML += `Enter your phone number (including country code - no dashes or parenthesis) so we can send you notifications <br> <form method="POST"> <input type="text" name="phone">
            <input type="hidden" name="name" value="` + user.displayName + `"/>  <input type="hidden" name="uid" value="` + user.uid + `"/> <br> enter your email so we can email you notifications <br> <input type="text" name="email"> <input type="submit"/>`;
        },
        error:function(jqXHR, exception) {
            document.body.innerHTML += "<h4> enter a college! </h4> <form id='myForm'> <input type='text' name='college'> <input type='hidden' name='uid' value='" + user.uid +"'/> <input type='submit'> </form> <br> <table><tbody id='colleges'> </tbody></table>"; //todo figure this out

            populateCollegeTable(user);
            $('#myForm').submit(function(e){
                e.preventDefault();
                $.ajax({
                    url:'/addcollege',
                    type:'post',
                    data:$('#myForm').serialize(),
                    success:function() {
                        alert("Successfully added!");
                        populateCollegeTable(user);
                    },
                    error:function(jqXHR, exception) {
                        alert("Something went wrong - that college probably already exists in your records");
                    },
                });
            });      
        },
    });
} else {
    window.location.replace("login");
  }
});


function populateCollegeTable(user) {
    $.ajax({
        url:'/getcolleges',
        type:'post',
        data:{'uid':user.uid},
        success:function(text) {
            document.getElementById('colleges').innerHTML = "";
            var str = "";
            Object.keys(text).forEach(function(k){
                console.log(k);
                if(k!=="total") {
                    str += "<tr>";
                    str += "<td> "+ text[k]["deadline"] + "</td>";
                    str += "<td> "+ text[k]["name"] + "</td>";


                    Object.keys(text[k]).forEach(function(q) {
                    })
                    str += `<td> <input type="date" name="bday" id=` + k + `>  <button onclick="addDeadline('` + k + `')"> add/edit deadline </button> </td>`
                    
                    str += "</tr>";
                }
            });
            document.getElementById('colleges').innerHTML = str;
            console.log(document.getElementById('colleges').innerHTML);
        },
        error:function(jqXHR, exception) {
            alert("Something went wrong - that college probably already exists in your records");
        }});
}

function addDeadline(college) {
    var user = firebase.auth().currentUser;
    console.log(college);
    $.ajax({       
        url:'/deadlines',
        type:'post',
        data:{'uid':user.uid, "college":college, "deadline":document.getElementById(college).value},
        success: new function() {
            
        }
    });
}