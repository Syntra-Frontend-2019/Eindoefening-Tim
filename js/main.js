var name2 = document.querySelector("#name2");
var birthdayday = document.querySelector("#day");
var birthdaymonth = document.querySelector("#month");
var birthdayyear = document.querySelector("#year");
//var gender = document.getElementsByName("gender");
var male = document.querySelector("#male");
var female = document.querySelector("#female");
var other = document.querySelector("#other");
var lstsubscribers = document.querySelector("#lstSubscribers");
var subscriber;
var subscribers;
getData();
male.addEventListener("click", setGender);
female.addEventListener("click", setGender);
other.addEventListener("click", setGender);

function setGender() {
    gender = event.target.id;
    console.log(gender);
}

function addSubscriber() {
    subscriber = {
        name: name2.value,
        birthday: birthdayday.value + "/" + birthdaymonth.value + "/" + birthdayyear.value,
        //birthday: function() {this.birthdayday + "/" + this.birthdaymonth + "/" + this.birthdayyear},
        //birthdayday: birthdayday.value,
        //birthdaymonth: birthdaymonth.value,
        //birthdayyear: birthdayyear.value,
        gender: gender
    }
    //subscribers.unshift(subscriber); //Toevoegen aan het begin van de array
    postData(subscriber);
    console.log(subscribers);
    getData();
}

function listToHTML() {
    while (lstsubscribers.firstChild) {
        lstsubscribers.removeChild(lstsubscribers.firstChild);
    }
        for (var i = 0; i < subscribers.length; i++) {
        subscriber = subscribers[i];
        var new_li = document.createElement("li");
        var new_name = document.createElement("b");
        var new_date = document.createElement("span");
        //var new_date = document.createTextNode(" " + subscribers[i].birthday);
        new_date.innerHTML = subscriber.birthday;
        new_name.innerHTML = subscribers[i].name;
        new_li.appendChild(new_name);
        new_li.appendChild(new_date);
        lstsubscribers.appendChild(new_li);
        if (subscriber.gender == "male")  {
            new_li.style.backgroundColor = "rgba(0, 17, 255, 0.5)";
            new_li.style.borderColor = "rgba(0, 17, 255, 1)";
            }
        else if (subscriber.gender == "female")  {
            new_li.style.backgroundColor = "rgba(255, 0, 179, 0.5)";
            new_li.style.borderColor = "rgba(255, 0, 179, 1)";
            }
        else if (subscriber.gender == "other")  {
            new_li.style.backgroundColor = "rgba(94, 94, 94, 0.5)";
            new_li.style.borderColor = "rgba(94, 94, 94, 1)";
            }
    }


}

function getData() {
    $.ajax({
        type: "GET",
        url: 'https://vanloocke.synology.me:1880/frontend-get',
        //async: false
        })
    .done(function(reply){
        subscribers = reply;
        listToHTML();
    });
}

function postData(data) {
    $.ajax({
        type: 'POST',
        url: 'https://vanloocke.synology.me:1880/frontend-post',
        data: data 
    });
}   

// listToHTML();