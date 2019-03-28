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
// $(".removeButton").on("click", removeItem);
var testdiv = $("<div>");
testdiv.addClass("divData");
$(".test").append(testdiv);
// $(".test").append("<div>").addClass("divData");
// $('body').append('<div>')

function setGender() {
    gender = event.target.id;
    // console.log(gender);
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
    // console.log(subscribers);
    getData();
}

function listToHTML() {
    while (lstsubscribers.firstChild) {
        lstsubscribers.removeChild(lstsubscribers.firstChild);
    }
        for (var i = 0; i < subscribers.length; i++) {
        subscriber = subscribers[i];
        var new_li = document.createElement("li");
        var divRemove = $("<div>");
        divRemove.addClass("divRemove");
        var divData = document.createElement("div");
        // var divData = $("<div>");
        $(divData).addClass("divData");
        new_li.setAttribute("id", subscriber._id);
        var removeButton = document.createElement("button");
        removeButton.setAttribute("class", "removeButton");
        var removeIcon = document.createElement("i");
        removeIcon.setAttribute("class", "fa fa-trash");
        removeIcon.setAttribute("aria-hidden", "true");
        var new_name = document.createElement("b");
        var new_date = document.createElement("span");
        //var new_date = document.createTextNode(" " + subscribers[i].birthday);
        new_date.innerHTML = subscriber.birthday;
        new_name.innerHTML = subscribers[i].name;
        $(divData).append(new_name);
        $(divData).append("<br>");
        $(divData).append(new_date);
        $(divRemove).append(removeButton);
        $(new_li).append(divData);
        $(new_li).append(divRemove);
        // new_li.appendChild(new_date);
        // new_li.appendChild(removeButton);
        removeButton.appendChild(removeIcon);
        lstsubscribers.appendChild(new_li);
        $(removeButton).on("click", removeItem);
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
        alert( "error" );
    }).always(function() {
        alert( "complete" );
    }).done(function(){
        alert( "success" );
        // console.log(data);
        getData();
    });
    $("#" + itemID).remove();
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
    });
}   

// listToHTML();