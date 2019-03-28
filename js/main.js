// Variabelen creëren met javascript:

var name2 = document.querySelector("#name2");
var birthdayday = document.querySelector("#day");
var birthdaymonth = document.querySelector("#month");
var birthdayyear = document.querySelector("#year");
var male = document.querySelector("#male");
var female = document.querySelector("#female");
var other = document.querySelector("#other");
var lstsubscribers = document.querySelector("#lstSubscribers");
var subscriber;
var subscribers;

// data voor de eerste keer opvragen
getData();

// event Listeners toevoegen op form elementen (kan ook met document.querySelector("#male").checked methode)
male.addEventListener("click", setGender);
female.addEventListener("click", setGender);
other.addEventListener("click", setGender);

// functie om gender in te stellen nadat er een gender geselecteerd is
function setGender() {
    gender = event.target.id;
}

// functie om een subscriber in json formaat om te zetten
function addSubscriber() {
    subscriber = {
        name: name2.value,
        birthday: birthdayday.value + "/" + birthdaymonth.value + "/" + birthdayyear.value,
        gender: gender
    };
    postData(subscriber); // data doorsturen via ajax POST methode
}

//
function listToHTML() {
    while (lstsubscribers.firstChild) {
        lstsubscribers.removeChild(lstsubscribers.firstChild);
    }
        for (var i = 0; i < subscribers.length; i++) {
        subscriber = subscribers[i]; // huidig item ophalen

        // elementen voor in subscriber item aanmaken (jquery en javascript methodes door elkaar)
        var new_li = document.createElement("li");
        new_li.setAttribute("id", subscriber._id);
        var divRemove = $("<div>");
        divRemove.addClass("divRemove");
        var divData = document.createElement("div");
        $(divData).addClass("divData");
        var removeButton = document.createElement("button");
        removeButton.setAttribute("class", "removeButton");
        var removeIcon = document.createElement("i");
        removeIcon.setAttribute("class", "fa fa-trash");
        removeIcon.setAttribute("aria-hidden", "true");
        var new_name = document.createElement("b");
        var new_date = document.createElement("span");

        // Data toevoegen aan subscriber item
        new_date.innerHTML = subscriber.birthday;
        new_name.innerHTML = subscribers[i].name;
        $(divData).append(new_name).append("<br>").append(new_date);
        $(divRemove).append(removeButton);
        $(new_li).append(divData).append(divRemove);
        removeButton.appendChild(removeIcon);
        lstsubscribers.appendChild(new_li);
        $(removeButton).on("click", removeItem);

        // kleuren instellen per gender
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

function removeItem(){
    // console.log($(this));
    var itemID = $(this).parentsUntil('ul', 'li').first().attr('id');
    console.log(itemID);
    $.ajax({
        method: "DELETE",
        url: 'https://vanloocke.synology.me:1880/frontend-delete',
        datatype: 'json',
        data: {"_id": itemID}
    }).fail(function() {
    }).always(function() {
    }).done(function(){
        $("#" + itemID).remove();
    });
}

function getData() {
    $.ajax({
        type: "GET",
        url: 'https://vanloocke.synology.me:1880/frontend-get',
        //async: false
    }).done(function(reply){
        subscribers = reply;
    listToHTML();
    });
}

function postData(data) {
    $.ajax({
        type: 'POST',
        url: 'https://vanloocke.synology.me:1880/frontend-post',
        data: data 
    })
    .done(function(){
        getData(); // data refreshen nadat de post gebeurd is
    });
}   

// listToHTML();