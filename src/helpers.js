export function cl(x) {
  return console.log(x);
}

export function getUnique(arr, comp) {
  var unique = arr.map(function(e) {
      return e[comp];
    }).map(function(e, i, final) {
      return final.indexOf(e) === i && i;
    }).filter(function(e) {
      return arr[e];
    }).map(function(e) {
      return arr[e];
    });
  return unique;
}

export function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
