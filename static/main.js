firebase.auth().onAuthStateChanged(function(user) {
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
            document.body.innerHTML += "<h4> enter a college! </h4> <form id='myForm'> <input type='text' name='college'> <input type='hidden' name='uid' value='" + user.uid +"'/> <input type='submit'> </form> <br> <p id='colleges'></p>"; //todo figure this out

            populateCollegeTable(user);
            $('#myForm').submit(function(e){
                e.preventDefault();
                $.ajax({
                    url:'/addcollege',
                    type:'post',
                    data:$('#myForm').serialize(),
                    success:function() {
                        alert("Successfully added!");
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
            
            document.getElementById('colleges').innerText = JSON.stringify(text);
        },
        error:function(jqXHR, exception) {
            alert("Something went wrong - that college probably already exists in your records");
        }});
}
