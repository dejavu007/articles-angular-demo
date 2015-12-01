(function() {
  var app = angular.module('myArticles', []);

  app.controller('ArticlesController', ['$scope', '$http', function($scope, $http){
    var allArticles = this;
    allArticles.currentPager = 1;
    allArticles.itemsPerPage = 2;
    $http.get('/rest/all-articles.json').success(function(data){
      allArticles.allNodes = data;
      allArticles.nodes = allArticles.allNodes.slice(0, allArticles.itemsPerPage);
      allArticles.totalItems = allArticles.allNodes.length;
      $scope.pagerCount = Math.ceil(allArticles.totalItems / allArticles.itemsPerPage);
    });
    $scope.getPagerCount = function(n){
      return new Array(n);
    };
    allArticles.changePage = function(currentPage){
      var start = (currentPage - 1) * allArticles.itemsPerPage;
      var end = start + allArticles.itemsPerPage;
      allArticles.nodes = allArticles.allNodes.slice(start, end);
      allArticles.currentPager = currentPage;
    }
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