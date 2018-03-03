employeesApp.controller('homeController', ['$scope', '$http', 'orderByFilter', function($scope, $http, orderBy) {
    $http.get("./employee-data.json").then(function(response) {
        $scope.employeesInfo = response.data;
    });

    $scope.display = null;

	$scope.sortBy = function(display) {
		$scope.display = display;
		$scope.reverse = display !== null ? !$scope.reverse : false;

		if (display === 'hierarchy') {
			$scope.employeesInfo.employees = orderBy($scope.employeesInfo.employees, $scope.display, $scope.reverse, $scope.hierarchy);
		} else {
			$scope.employeesInfo.employees = orderBy($scope.employeesInfo.employees, $scope.display, $scope.reverse);
		}
	};

	$scope.hierarchy = function(v1, v2) {
		var value = 0;
		var myId = $scope.employeesInfo.employees[v1.index].id;
		var theirId = $scope.employeesInfo.employees[v2.index].id;
		var theirManagerId = $scope.employeesInfo.employees[v2.index].managerid;

		if (!theirManagerId) {
			value = -1;
		} else if (myId === theirManagerId || myId < theirId) {
			value = 1;
		} else {
			value = -1;
		}

		return value;
	}

}]);
