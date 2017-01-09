angular.module('servoychartjsDSChartJS', ['servoy']).directive('servoychartjsDSChartJS', function() {
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
				 * Initialize the bar chart with default properties or advanced properties if the node object is set.
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
							x.data.labels = $scope.parseData($scope.model.data, 0);
							x.data.datasets[0].data = $scope.parseData($scope.model.data, 1);
							x.options.onClick = handleClick;
							x.options.responsive = false;

							drawChart(x.type, x.data, x.options);

						}
						//otherwise use default settings
						else {
							//some default values in case the user did not fill in these values
							var borderWidthDefault = 1;
							var colorDefault = "rgba(54, 162, 235, 1)";
							var dataLabelDefault = "My Chart Data";
							var CHART_TYPES = { AREA: 'area', LINE: 'line' };

							var data = {
								labels: $scope.parseData($scope.model.data, 0),
								datasets: []
							};

							var options = {
								responsive: false,
								onClick: handleClick
							};

							var dataset = {
								label: $scope.model.dataLabel ? $scope.model.dataLabel : dataLabelDefault,
								backgroundColor: $scope.model.backgroundColors ? $scope.model.backgroundColors : colorDefault,
								borderColor: $scope.model.borderColors ? $scope.model.borderColors : colorDefault,
								borderWidth: $scope.model.borderWidth ? $scope.model.borderWidth : borderWidthDefault,
								data: $scope.parseData($scope.model.data, 1)
							};

							var type = $scope.model.type;
							if (type == CHART_TYPES.AREA) {
								type = CHART_TYPES.LINE;
								dataset.fill = true;
							} else if (type == CHART_TYPES.LINE) {
								dataset.fill = false;
							}

							data.datasets.push(dataset);

							drawChart(type, data, options);
						}
					}
				}
				/**
				 * Parse a dataSet column into an array ([]) of values
				 */
				$scope.parseData = function(jsDataSet, idx) {
					var chartData = [];
					for (var i = 0; i < jsDataSet.length; i++) {
						chartData.push(jsDataSet[i][idx]);
					}
					return chartData;
				}

				/**
				 * Draws the chart, takes care or redraws if needed
				 * */
				function drawChart(type, data, options) {
					//destroy the chart each time you reinitialize it
					if ($scope.myChart) {
						$scope.myChart.destroy();
					}

					//the top most element is a servoy-generated div. Its first level child is the chart_canvas div
					var ctx = $element.children(".chart_canvas").children()[0].getContext("2d");
					$scope.myChart = new Chart(ctx, {
							type: type,
							data: data,
							options: options
						});
				}

				/**On chart click function*/
				function handleClick(e) {
					var activePoints = $scope.myChart.getElementsAtEvent(e);
					var firstPoint = activePoints[0];
					var label = $scope.myChart.data.labels[firstPoint._index];
					var value = $scope.myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
					if ($scope.handlers.onClick) $scope.handlers.onClick(firstPoint._index, label, value);
				}

			},
			link: function($scope, $element, $attrs) {

				$scope.initChart();

				$scope.$watchCollection('model.data', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.myChart.data.datasets[0].data = $scope.parseData(newValue, 1);
							$scope.myChart.data.labels = $scope.parseData(newValue, 0);
							$scope.myChart.update();
						}
					}
				);

				$scope.$watchCollection('model.node', function(newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.initChart();
						}
					});
			},
			templateUrl: 'servoychartjs/DSChartJS/DSChartJS.html'
		};
	})