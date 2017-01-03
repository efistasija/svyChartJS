angular.module('servoychartjsStaticChart', ['servoy']).directive('servoychartjsStaticChart', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi",
				handlers: "=svyHandlers",
				svyServoyapi: "="
			},
			controller: function($scope, $element, $attrs) {
				var tmp;
				var str;

				/**
				 * Initialize the bar chart with default properties. Use to draw the chart on first show of the form
				 */
				$scope.initChart = function() {
					if ($scope.model.data) {

						//if the user wants an advanced chart, he needs to pass a node object that defines all properties
						if ($scope.model.node) {
							//we need to pass a fresh node object to the chart each time we paint it as the library Chart.js
							// modifies the node object. On a second show if the node object has not changed, we pass it the same node object,
							//which this time is already once modified by the chart library and it will not draw the graph
							if (tmp !== $scope.model.node) {
								tmp = $scope.model.node;
								str = JSON.stringify($scope.model.node);
							}
							var x = JSON.parse(str);
							x.data.datasets[0].data = $scope.model.data;

							drawChart(x.type, x.data, x.options);

						}
						//otherwise use default settings
						else {
													
							var data = {
								labels: $scope.model.xLabels,
								datasets: []
							};

							var options = {
								responsive: false
							};
							
							var dataset = {
								label: $scope.model.dataLabel,
								backgroundColor: $scope.model.backgroundColors,
								borderColor: $scope.model.borderColors,
								borderWidth: $scope.model.borderWidth,
								data: $scope.model.data
							};

							var type = $scope.model.type;
							if (type == 'area') {
								type = 'line';
								dataset.fill = true;
							} else if (type == 'line') {
								dataset.fill = false;
							}

							data.datasets.push(dataset);

							drawChart(type, data, options);
						}
					}
				}

				/**
				 * Draws the chart, takes care or redraws if needed
				 * */
				function drawChart(type, data, options) {
					//destroy the chart each time you reinitialize it
					if ($scope.myChart) {
						$scope.myChart.destroy();
					}

					var ctx = $element.children(".chart_canvas").children()[0].getContext("2d");
					$scope.myChart = new Chart(ctx, {
							type: type,
							data: data,
							options: options
						});
				}

			},
			link: function($scope, $element, $attrs) {

				$scope.initChart();

				$scope.$watchCollection('model.data', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.myChart.data.datasets[0].data = newValue;
							$scope.myChart.update();
						}
					}
				);

				$scope.$watch('model.xLabels', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.myChart.data.labels = newValue;
							$scope.myChart.update();
						}
					});

				$scope.$watchCollection('model.node', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.initChart();
						}
					});

				//watch design properties so users can see the changes in form designer right away
				if ($scope.svyServoyapi.isInDesigner()) {

					$scope.$watch('model.borderWidth', function(newValue, oldValue) {
							if (newValue != oldValue) {
								$scope.myChart.data.datasets[0].borderWidth = newValue;
								$scope.myChart.update();
							}
						});

					$scope.$watch('model.type', function(newValue, oldValue) {
							if (newValue != oldValue) {
								$scope.initChart();
							}
						});

					$scope.$watch('model.dataLabel', function(newValue, oldValue) {
							if (newValue != oldValue) {
								$scope.myChart.data.datasets[0].label = newValue;
								$scope.myChart.update();
							}
						});

					$scope.$watchCollection('model.backgroundColors', function(newValue, oldValue) {
							if (newValue != oldValue) {
								$scope.myChart.data.datasets[0].backgroundColor = newValue;
								$scope.myChart.update();
							}
						});

					$scope.$watch('model.borderColors', function(newValue, oldValue) {
							if (newValue != oldValue) {
								$scope.myChart.data.datasets[0].borderColor = newValue;
								$scope.myChart.update();
							}
						});
				}
			},
			templateUrl: 'servoychartjs/staticChart/staticChart.html'
		};
	})