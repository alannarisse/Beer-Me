'use strict';

function getBreweries(searchTerm) {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${searchTerm}`;
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $(".js-search-results").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.result-list').empty();
  if (responseJson.length > 0){
    for (let i = 0; i < responseJson.length; i++){
      $('.result-list').append(`<li><a href="${responseJson[i].website_url}">${responseJson[i].name}</a></li>
  `)
    }
    ;}
  else {
    $('.result-list').append("<li>Sorry, no results match your search</li>")
  }
  $('.js-search-results').removeClass('hidden');
}

function watchForm() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getBreweries(query);
  });
}

$(watchForm);