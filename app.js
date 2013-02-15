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

  function addDrink(name) {
    var id = name.toLowerCase().replace(/\s|\//g, '-');
    displayDrink(id, name);
  }

  function removeDrink(id) {
    undisplayDrink(id);
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
