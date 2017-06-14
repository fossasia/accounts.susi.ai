var app = angular.module("loklak", ['ngRoute']);
app.controller("status", function($scope, $http) {
  $http.get("http://api.susi.ai/aggregation/status.json").
    success(function(data, status, headers, config) {
      $scope.index = data.index;
    });
});

app.controller("search", function($scope, $http) {
  $scope.query = '';
  $scope.results = [];
  $scope.search = function() {
    if ($scope.query != '') {
      $scope.results = [];
      $http.get("http://api.susi.ai/aaa/search.json?q=" + $scope.query).
        success(function(data, status, headers, config) {
          for (var i = 0; i < data.statuses.length; i++) {
            $scope.results.push(data.statuses[i].text);
          }
        });
    }
  }
});

app.filter("reverse", function() {
  return function(items) {
    if (!items || !items.length) {
      return;
    }
    return items.slice().reverse();
  };
});

angular.element(document).ready(function () {
  var navString = "";
  var winLocation = window.location.href;
  var navString = "";
  var winLocation = window.location.href;
  var navItems = [];
  var count = 0;
  $.ajax("http://api.susi.ai/cms/topmenu.json", {
    data: { checkLogin: true },
    dataType: "jsonp",
    success: function (response) {
      navItems = response.items;
      navItems = navItems.reverse();
      $.each( navItems, function(index, itemData) {
        name = Object.keys(itemData);
        link = itemData[name];
        liItem = "<li>";
        if (winLocation.indexOf(link) != -1 && count != 1) {
        liItem = "<li class='active'>";
        count = count + 1;
        }
        if(name == "Blog") { // The Blog tab redirects to the loklak blog (http://blog.loklak.net/)
        liItem += "<a href='"+link+"'>"+name+"</a></li>";
        }
        else {
        liItem += "<a href='\/"+link+"'>"+name+"</a></li>";
        }
        liItem = $(liItem);
        $('#navbar > ul').prepend(liItem);
        });
      },
    error: function (xhr, ajaxOptions, thrownError) {
    },
  });
});
