angular.module('servoychartjsStaticChart', ['servoy']).directive('servoychartjsStaticChart', function($sabloConstants) {
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
							x.data.labels = $scope.model.xLabels;
							x.options.onClick = handleClick;
							x.options.responsive = false;

							drawChart(x.type, x.data, x.options);

						}
						//otherwise use default settings
						else {
							//chart types that require single color otherwise they show gray in designer
							var CHART_TYPES = { AREA: 'area', LINE: 'line', RADAR: 'radar' };
							var type = $scope.model.type;
							var isSingleColor = CHART_TYPES.hasOwnProperty(type.toUpperCase());

							var data = {
								labels: $scope.model.xLabels,
								datasets: []
							};

							var options = {
								responsive: false,
								onClick: handleClick
							};

							var dataset = {
								label: $scope.model.dataLabel,
								backgroundColor: isSingleColor ? $scope.model.backgroundColors[0] : $scope.model.backgroundColors,
								borderColor: isSingleColor ? $scope.model.borderColors[0] : $scope.model.borderColors,
								borderWidth: $scope.model.borderWidth,
								data: $scope.model.data
							};

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

				/**On chart click function*/
				function handleClick(e) {
					var activePoints = $scope.myChart.getElementsAtEvent(e);
					var firstPoint = activePoints[0];
					var label = $scope.myChart.data.labels[firstPoint._index];
					var value = $scope.myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
					if ($scope.handlers.onClick) $scope.handlers.onClick(firstPoint._index, label, value);
				}

				/**
				 * Define model change notifiers for design properties so users can see the changes in form designer right away
				 */
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "borderWidth":
								$scope.myChart.data.datasets[0].borderWidth = value;
								$scope.myChart.update();
								break;
							case "type":
								$scope.initChart();
								break;
							case "dataLabel":
								$scope.myChart.data.datasets[0].label = value;
								$scope.myChart.update();
								break;
							case "backgroundColors":
								$scope.myChart.data.datasets[0].backgroundColor = value;
								$scope.myChart.update();
								break;
							case "borderColors":
								$scope.myChart.data.datasets[0].borderColor = value;
								$scope.myChart.update();
								break;
							default:
								break;
							}
						}
					});

				/**
				 * Destroy model change listeners for designer properties
				 */
				var destroyListenerUnreg = $scope.$on("$destroy", function() {
						destroyListenerUnreg();
						delete $scope.model[$sabloConstants.modelChangeNotifier];
					});

				/**
				 * Attach the model change Servoy watchers/notifiers for every model variable in the spec that is exposed in designer
				 */
				function attachDesignerModelWatchers() {
					// data can already be here, if so call the modelChange function so
					// that it is initialized correctly.
					var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
					for (var key in $scope.model) {
						modelChangeFunction(key, $scope.model[key]);
					}

				}

				$scope.initChart();
				attachDesignerModelWatchers();

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

			},
			templateUrl: 'servoychartjs/staticChart/staticChart.html'
		};
	})