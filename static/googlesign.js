function doLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);

    var user = firebase.auth().currentUser;
    if(!user) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          // ...
          window.location.replace("main");
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("error " + errorMessage);
        });

    } else {
        window.location.replace("main");
    }
}