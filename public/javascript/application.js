$(document).ready(function() {
  // $('#search').on('click', function(){
  //   $.getJSON()
  // })

  $.ajax('/api/contacts/', {
    dataType: "json",
    success: function (data) {
      console.log(data);
      var $contactList = $('#contactList');
      populateList($contactList, data);
      // for (var i = 0; i < data.length; i++) {
      //   var contact = data[i];
      //   var $newContact = $('<tr>');
      //   var $contactName = $('<td>');
      //   var $contactEmail = $('<td>');
      //   var $contactPhone = $('<td>');
      //   $contactName.text(contact.first_name + " " + contact.last_name);
      //   $contactEmail.text(contact.email);
      //   $contactPhone.text(contact.phone_number);
      //   $newContact.append($contactName, $contactEmail, $contactPhone);
      //   $contactList.append($newContact);
      // }
    }
  });

  var populateList = function(list, contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var $newContact = $('<tr>');
        var $contactName = $('<td>');
        var $contactEmail = $('<td>');
        var $contactPhone = $('<td>');
        $contactName.text(contact.first_name + " " + contact.last_name);
        $contactEmail.text(contact.email);
        $contactPhone.text(contact.phone_number);
        $newContact.append($contactName, $contactEmail, $contactPhone);
        list.append($newContact);
      }
  }

  var getPropertyValue = function(key) {
      return this[key];
  }

  // The "this" value for the function below is the search term
  var valueThatInclude = function(value) {
    return value.toString().includes(this);
  }

  // The "this" value for the function below is the search term. Returns true if the search term is contained within the object.
  var objectHasTermInValueFilter = function(someObj) {
    var allObjectValues = Object.keys(someObj).map(getPropertyValue, someObj);
    return allObjectValues.some(valueThatInclude, this);
  }

//attach submit handler to form
  $("#searchForm").submit(function(event){
    //stop form from submitting normally
    event.preventDefault();
    var searchResults = $('#result');
    searchResults.empty();
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/api/contacts/",
      success: function(data){
        var searchTerm = $('#s').val();
        data = data.filter(objectHasTermInValueFilter, searchTerm);
        populateList(searchResults, data);
        // console.log('search results', data);
      }
    });
  })

});
