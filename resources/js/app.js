// MODULE
var emasApp = angular.module('emasApp', ['ngRoute', 'ngResource']);

// ROUTES
emasApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/current-month', {
            templateUrl: 'views/current-month.html',
            controller: 'currentMonthPageController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'mainController'
        })
        .when('/direction', {
            templateUrl: 'views/direction.html',
            controller: 'mainController'
        })
        .when('/contact-us', {
            templateUrl: 'views/contactus.html',
            controller: 'mainController'
        })
        .when('/leadership', {
            templateUrl: 'views/leadership.html',
            controller: 'mainController'
        })
        .when('/services', {
            templateUrl: 'views/services.html',
            controller: 'mainController'
        })
        .when('/programs', {
            templateUrl: 'views/programs.html',
            controller: 'mainController'
        })
        .when('/leadership', {
            templateUrl: 'views/leadership.html',
            controller: 'mainController'
        })
        .when('/donate', {
            templateUrl: 'views/donate.html',
            controller: 'mainController'
        })
        .when('/resources', {
            templateUrl: 'views/resources.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

// SERVICES
emasApp.service('currentMonthService', function () {
	function getCurrentMonth() {
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var d = new Date();
		var currentMonth = monthNames[d.getMonth()];
		console.log('Current month is: ' + currentMonth);
		return currentMonth;
	};
	
	// Gets current month
	this.currentMonth = getCurrentMonth();
	
	// Gets corresponding current month JSON file
	this.currentMonthJSON = function () {
		var currentMonth = getCurrentMonth().toLowerCase();
		var url = '../../data/prayer/' + currentMonth + '.json';
		console.log("Reading the current month JSON file using angular at the path: " + url);
		return url;
	};
	
	// Gets the Quran JSON file
	this.quranData = function () {
		var quranUrl = '../../data/reminder/quran/quran-1.json';
		console.log("Reading the Quran JSON file using angular at the path: " + quranUrl);
		return quranUrl;
	};
	
	// Gets hadith JSON file
	this.hadithData = function () {
		var hadithUrl = '../../data/reminder/hadith/hadith-2.json?v=1.1';
		console.log("Reading the JSON file using angular at the path: " + hadithUrl);
		return hadithUrl;
	};
	
	// Gets supplication JSON file
	this.supplicationData = function () {
		var supplicationUrl = '../../data/reminder/supplication/supplication.json';
		console.log("Reading the Supplication JSON file using angular at the path: " + supplicationUrl);
		return supplicationUrl;
	};
});

// CONTROLLERS
// Main Controller
emasApp.controller('mainController', ['$scope', function ($scope) {}]);

// Home Controller
emasApp.controller('homeController', ['$scope', '$http', 'currentMonthService', function ($scope, $http, currentMonthService) {
	$scope.currentMonth = currentMonthService.currentMonth;
	$scope.quranUrl = currentMonthService.quranData();
	$scope.JSON_Url = currentMonthService.currentMonthJSON();
	$scope.hadithUrl = currentMonthService.hadithData();
	$scope.supplicationUrl = currentMonthService.supplicationData();
	$scope.todayDateString = new Date().toDateString();
	$http.get($scope.JSON_Url).success(function (data) {
		$scope.prayerData = data;
		console.log($scope.prayerData);
		angular.forEach(data, function (value, key) {
			var todaysDate = new Date().getDate();
			var todaysDateFromJson = value.day;
			if (todaysDate === todaysDateFromJson) {
				console.log('The key value for the matching date was: ' + key);
				console.log('The matching date was: ' + value.day);
				$scope.key = key;
				return false;
			}
		});
	});
	
	$http.get($scope.quranUrl).success(function (data) {
		$scope.quranData = data;
		console.log($scope.quranData);
		angular.forEach(data, function (value, key) {
			var todaysDate = new Date().getDate();
			var todaysDateFromJson = value.day;
			if (todaysDate === todaysDateFromJson) {
				console.log('The key value for the matching quran ayat was: ' + key);
				console.log('The matching date was: ' + value.day);
				$scope.key = key;
				return false;
			}
		});
	});
	
	$http.get($scope.hadithUrl).success(function (data) {
		$scope.hadithData = data;
		console.log($scope.hadithData);
		angular.forEach(data, function (value, key) {
			var todaysDate = new Date().getDate();
			var todaysDateFromJson = value.day;
			if (todaysDate === todaysDateFromJson) {
				console.log('The key value for the matching date was: ' + key);
				console.log('The matching date was: ' + value.day);
				$scope.key = key;
				return false;
			}
		});
	});
	
	$http.get($scope.supplicationUrl).success(function (data) {
		$scope.supplicationData = data;
		console.log($scope.supplicationData);
		angular.forEach(data, function (value, key) {
			var todaysDate = new Date().getDate();
			var todaysDateFromJson = value.day;
			if (todaysDate === todaysDateFromJson) {
				console.log('The key value for the matching supplication was: ' + key);
				console.log('The matching date was: ' + value.day);
				$scope.key = key;
				return false;
			}
		});
	});
}]);

// Current Month Page Controller
emasApp.controller('currentMonthPageController', ['$scope', '$http', 'currentMonthService', function ($scope, $http, currentMonthService) {
	$scope.currentMonth = currentMonthService.currentMonth;
	$scope.JSON_Url = currentMonthService.currentMonthJSON();
	$http.get($scope.JSON_Url).success(function (data) {
		$scope.count = 1;
		$scope.items = [];
		angular.forEach(data, function (val, key) {
			var todaysDate = new Date().getDate();
			var todaysDateFromJson = val.day;
			if (todaysDate === todaysDateFromJson) {
				$scope.items.push("<tr class='prayer-table-cd'>");
			}
			else {
				$scope.items.push("<tr>");
			}
			$scope.items.push("<td id=''" + key + ">" + $scope.count + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.fajir + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.fajirIqamah + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.sunrise + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.duhur + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.duhurIqamah + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.asr + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.asrIqamah + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.maghrib + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.maghribIqamah + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.isha + "</td>");
			$scope.items.push("<td id=''" + key + ">" + val.ishaIqamah + "</td>");
			$scope.count++;
		});
		$('<tbody/>', {
			html: $scope.items.join("")
		}).appendTo("#current-month-table");
	});
}]);

// Collapse mobile navbar after clicking on the link
$(document).on('click', '.navbar-collapse.in', function (e) {
	if ($(e.target).is('a') && ($(e.target).attr('class') != 'dropdown-toggle')) {
		$(this).collapse('hide');
	}
});