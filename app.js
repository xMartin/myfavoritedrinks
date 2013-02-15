(function() {
  var inputElement;
  var formElement;
  var ulElement;
  var drinkRowPrefix = 'drinkrow-';

  function prefixId(id) {
    return drinkRowPrefix + id;
  }
  function unprefixId(prefixedId) {
    return prefixedId.replace(drinkRowPrefix, '');
  }

  function init() {
    formElement = document.getElementById('add-drink');
    inputElement = formElement.getElementsByTagName('input')[0];
    ulElement = document.getElementById('drink-list');

    loadDrinks();

    ulElement.addEventListener('click', function(event) {
      if(event.target.tagName === 'SPAN') {
        removeDrink(unprefixId(event.target.parentNode.id));
      }
    });

    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
      var trimmedText = inputElement.value.trim();
      if(trimmedText) {
        addDrink(trimmedText);
      }
      inputElement.value = '';
    });
  }

  function loadDrinks() {
    var drinks = {};
    for (var i = 0, l = localStorage.length; i < l; ++i) {
      var id = localStorage.key(i);
      if (id.indexOf('drink-') === 0) {
        var value = localStorage.getItem(id);
        drinks[id.substr(6)] = {name: value};
      }
    }
    displayDrinks(drinks);
  }

  function addDrink(name) {
    var id = name.toLowerCase().replace(/\s|\//g, '-');
    localStorage.setItem('drink-' + id, name);
    displayDrink(id, name);
  }

  function removeDrink(id) {
    localStorage.removeItem('drink-' + id);
    undisplayDrink(id);
  }

  function displayDrinks(drinks) {
    for(var drinkId in drinks) {
      displayDrink(drinkId, drinks[drinkId].name);
    }
  }

  function displayDrink(id, name) {
    var domID = prefixId(id);
    var liElement = document.getElementById(domID);
    if(! liElement) {
      liElement = document.createElement('li');
      liElement.id = domID;
      ulElement.appendChild(liElement);
    }
    liElement.appendChild(document.createTextNode(name));//this will do some html escaping
    liElement.innerHTML += ' <span title="Delete">×</span>';
  }

  function undisplayDrink(id) {
    var elem = document.getElementById(prefixId(id));
    ulElement.removeChild(elem);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
