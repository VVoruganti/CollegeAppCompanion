firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("welcome").innerText = "Welcome " + user.displayName;
    
    if(!checkIfUserInit()) {
        document.body.innerHTML += `<form method="POST"> <input type="text" name="phone">
        <input type="hidden" name="name" value="` + user.displayName + `"/> <input type="hidden" name="uid" value="` + user.uid + `"/> <input type="submit"/>`;
        
        
    } else {
        document.body.innerHTML += ""; //todo figure this out
    }
} else {
    window.location.replace("login");
  }
});

function checkIfUserInit() {
    //TODO add code
    return false;
}