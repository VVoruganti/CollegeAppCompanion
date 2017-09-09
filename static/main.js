firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("welcome").innerText = "Welcome " + user.displayName;
    
    if(!checkIfUserInit()) {
        document.body.innerHTML += `Enter your phone number (including country code - no dashes or parenthesis) so we can send you notifications <br> <form method="POST"> <input type="text" name="phone">
        <input type="hidden" name="name" value="` + user.displayName + `"/>  <input type="hidden" name="uid" value="` + user.uid + `"/> <br> enter your email so we can email you notifications <br> <input type="text" name="email"> <input type="submit"/>`;
        
        
    } else {
        document.body.innerHTML += "<h4> enter a college! </h4> <form id='myForm'> <input type='text' name='college'> <input type='hidden' name='uid' value='" + user.uid +"'/> <input type='submit'> </form>"; //todo figure this out
        
        $('#myForm').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/addcollege',
            type:'post',
            data:$('#myForm').serialize(),
            success:updateDataTable()
    });
});

    }
} else {
    window.location.replace("login");
  }
});

function checkIfUserInit() {
    //TODO add code
    return true;
}

function updateDataTable() {
    alert("Successfully added!");
}
