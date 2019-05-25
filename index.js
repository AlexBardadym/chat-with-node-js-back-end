$(document).ready(function () {
    $('input#user, input#password, input#email').characterCounter();
});

$("#reset").on("click", function () {
    $('label').removeClass('active');
});


let submit = document.getElementById('submit');
let send = document.getElementById('send');
let message = document.getElementById('message');
let render = document.getElementById('render');
let userName = document.getElementById('user');
// let main = document.getElementById('main');
// let autorization = document.getElementById('autorization');
let currentUser = '';

function sendMessage() {
    let data = JSON.stringify({
        "message": `${message.value}`,
        "name": `${currentUser}`
    });

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://sleepy-island-80114.herokuapp.com/msg");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    message.value = '';
}

function makeConnect(userName) {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", `https://sleepy-island-80114.herokuapp.com/conn/${userName}`);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    xhr.onload = () => {
        let mess = document.createElement('div');
        let res = JSON.parse(xhr.responseText);
        if (currentUser === res.from) {
            mess.innerHTML = `<div class="message-blue">
            <p class="message-content">${res.text}</p>
        </div>`
        } else {
            mess.innerHTML = `<div class="message-orange">
        <p class="message-content">${res.text}</p>
        <div class="message-timestamp-left">from: ${res.from}</div>
    </div>`
        }


        render.appendChild(mess);

        render.scrollTop = render.scrollHeight;

        makeConnect(userName);
    }
}

submit.addEventListener('click', () => {
    let user = {};
    user.name = userName.value;
    currentUser = userName.value;
    let data = JSON.stringify(user);

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://sleepy-island-80114.herokuapp.com/reg");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
    xhr.onload = () => {
        let res = JSON.parse(xhr.responseText);
        if (res.response) {
            $("#login-section").slideUp(200);
            $("#chat-section").css("display", "flex");
            makeConnect(user.name);
        } else {
            alert('user allready exist');
        }



    }



})

send.addEventListener('click', () => {
    sendMessage();
})

$('#message').keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 13) {
        sendMessage();
    }
});

