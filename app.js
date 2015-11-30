(function() {
  var app = angular.module('myArticles', []);

  app.controller('ArticlesController', ['$http', function($http){
    var allArticles = this;
    allArticles.nodes = [];
    $http.get('/rest/all-articles.json').success(function(data){
      allArticles.nodes = data;
      console.log(data);
    });
  }]);

  app.filter('htmlToPlaintext', function() {
    return function(text) {
      var string = String(text).replace(/<[^>]+>/gm, '');
      return string.replace(/&amp;/g, '&');
    }
  });
  app.filter('stringTrimmer', function () {
    return function (value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace != -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  });
})();