function send() {
    sendargs("16103834757", "hi vinseth what is security");
}

function sendargs(to, text) {
        $.post("https://rest.nexmo.com/sms/json",{api_key:"3763e1cc", api_secret:"6efbe39cd7742b20", to:to, from:"12016441506", text:text}, (data, status, xhr) => {console.log(data)});
}