$(document).ready(function() {

  function getList(){
    $.ajax('/api/contacts/', {
      dataType: "json",
      success: function (data) {
        var list = $('#result');
        populateList(list, data);
      },
      fail: function(jqXHR, textStatus){
        console.log("Failed because: " + jqXHR.textStatus);
      }
    });
  };

  $('#list-all').on('click', function(){
    var $listAll = $('#list-all');
    var $contactList = $('#result');
    $contactList.toggleClass('show hidden');
    if ($contactList.hasClass('show')){
      getList();
      $listAll.text('Hide all contacts');
    } else {
      $listAll.text('Show all contacts');
    };
  });

  //Populates list but keeps headers
  var populateList = function(list, contacts) {
    $('#result tr').slice(1).remove();
    for(i=0; i<contacts.length; i+=1){
      var contact = contacts[i];
      var $newContact = $('<tr>');
      var $contactName = $('<td>');
      var $contactEmail = $('<td>');
      var $contactPhone = $('<td>');
      var $contactId = contact.id;
      $contactName.text(contact.first_name + " " + contact.last_name);
      $contactEmail.text(contact.email);
      $contactPhone.text(contact.phone_number);
      $newContact.append($contactName, $contactEmail, $contactPhone);
      $newContact.attr('data-info', contact.id);
      list.append($newContact);
    }
  };

  //Performs get request on submit to popopulate
  //search results
  $("#searchForm").on('submit', function(event){
    event.preventDefault();
    var searchResults = $('#result');
    var searchTerm = $('#searchField').val();
    var data = {searchQuery: searchTerm}
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/api/search/",
      data: data,
      success: function(data){
        searchResults.toggleClass('hidden show');
        populateList(searchResults, data);
      },
      fail: function(jqXHR, textStatus){
      console.log("Failed because: " + jqXHR.textStatus);
      } 
    });
  });

  //Unhides the create new contact button on click
  $("#create-new-contact").on('click', function(){
    $(".new-contact").toggleClass('show hidden')
  });

  //Submits new contact via Ajax 
  $("#new-contact").submit(function(event){
    event.preventDefault();
    var first_name = $('#first-name').val();
    var last_name = $('#last-name').val();
    var email = $('#email').val();
    var phone_number = $('#phone').val();
    var data = {firstname: first_name, lastname: last_name, email: email, phoneno: phone_number};
    $.ajax({
      method: "POST",
      url:"/api/new/",
      dataType: "json",
      data: data, 
    }).done(function(contact){
      console.log("Successfully added new contact");
      $("#new-contact")[0].reset();
      populateList(newContactCreate, contact);
      getList();
      $(".new-contact").toggleClass('show hidden')
    }).fail(function(jqXHR, textStatus){
      console.log("Failed because: " + jqXHR.textStatus);
    }).always(function(){
      console.log("Always");
    });
  });

  $('#delete-contact-button').on('click', function(){
    $('.delete').toggleClass('show hidden');
  });

  $("#delete").submit(function(){
    event.preventDefault();
    var query = $("#d").val();
    var data = {param: query};
    if($("#result tr > td:contains('" + query + "')").length === 1){
      var answer = confirm ("Are you sure you want to delete" + " " + query + " " + "from the database?");
      if (answer) {
        $.ajax({
          type: 'post',
          dataType: "json",
          url: "/api/delete/",
          data: data,
        }).done(function(contact){
          console.log("Successful deletion");
          getList();
          $("#delete")[0].reset();
          alert('Successful deletion');
        }).fail(function(jqXHR, textStatus){
          console.log("Delete failed because: " + jqXHR.textStatus);
        }).always(function(){
          console.log("Always");
        });
      };
    }
    else {
      alert('Something went wrong. Please try again');
    }
  });
  
  getList();

});

