angular.module('servoychartjsFSChartJS', ['servoy']).directive('servoychartjsFSChartJS', function() {
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
					var drawSize = calculateDrawSize();
					var chartValues = $scope.parseData($scope.model.foundset.viewPort.rows, drawSize);
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
						x.data.labels = chartValues.labels;
						x.data.datasets[0].data = chartValues.data;
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
							labels: chartValues.labels,
							//labels: $scope.parseData($scope.model.foundset.viewPort.rows, $scope.model.foundset.viewPort.startIndex, drawSize, 'label'),
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
							data: chartValues.data

							//data: $scope.parseData($scope.model.foundset.viewPort.rows, $scope.model.foundset.viewPort.startIndex, drawSize, 'value')
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

				/**
				 * Needs to calculate the page size in case there are less records left in the viewPort then the set pageSize.
				 * Ex: pageSize is 5 records, viewPort size is 16. The last page will have size of 1.
				 * */
				function calculateDrawSize() {
					if ($scope.model.pageSize > $scope.model.foundset.viewPort.size) {
						return $scope.model.foundset.viewPort.size;
					} else {
						return $scope.model.pageSize;
					}
				}
				/**
				 * Parse a dataSet column into an array ([]) of values
				 */
				$scope.parseData = function(fsRows, size) {

					var chartData = [];
					var chartLabels = [];
					for (var i = 0; i < size; i++) {
						chartLabels.push(fsRows[i]['label'] ? fsRows[i]['label'] : fsRows[i]['value']);
						chartData.push(fsRows[i]['value']);
					}

					var chartObj = { labels: chartLabels, data: chartData };
					return chartObj;
				}

				var ctxOrigHeight = 0;
				var ctxOrigWidth = 0;
				var flag = true;
				/**
				 * Draws the chart, takes care or redraws if needed
				 * */
				function drawChart(type, data, options) {
					//destroy the chart each time you reinitialize it
					if ($scope.myChart) {
						$scope.myChart.destroy();
					}

					var ctx = $element.children(".chart_canvas").children()[0].getContext("2d");
					if (!flag) {
						ctx.canvas.width = ctxOrigWidth;
						ctx.canvas.height = ctxOrigHeight;
					}
					//the top most element is a servoy-generated div. Its first level child is the chart_canvas div
					$scope.myChart = new Chart(ctx, {
							type: type,
							data: data,
							options: options
						});

					if (flag) {
						ctxOrigWidth = $scope.myChart.chart.width;
						ctxOrigHeight = $scope.myChart.chart.height;
						flag = false;
					}

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

				/**
				 * Wait till the foundset is available on client side
				 * */
				$scope.$watch('model.foundset', function() {
						$scope.model.foundset.setPreferredViewportSize($scope.model.pageSize);
					});

				/** Redraw the chart when the size of the foundset changes */
				$scope.$watch('model.foundset.viewPort.size', function(newValue, oldValue) {
						if ( (newValue > oldValue) && ($scope.model.foundset.viewPort.size < $scope.model.foundset.serverSize)) {
							$scope.model.foundset.loadExtraRecordsAsync(200);
							$scope.initChart();
						}
					});

				/* draw the chart when the values in the foundset rows changes */
				$scope.$watchCollection('model.foundset.viewPort.rows', function(newValue, oldValue) {
						$scope.initChart();
					});

				/**
				 * Increase or decrease page count
				 * @param {Number} count The number of pages to increase/decrease. It is either 1 for next page or -1 for previous page
				 * */
				$scope.modifyPage = function(count) {
					if (count < 0 || $scope.hasNext()) {
						if ( ($scope.model.currentPage + count) > 0) {
							var newPage = $scope.model.currentPage + count;
							setCurrentPage(newPage);
						}
					}
				}

				/**
				 * Check if there are more pages to show/hide next/previous page navigation
				 * */
				$scope.hasNext = function() {
					return $scope.model.foundset.hasMoreRows || ($scope.model.foundset && $scope.model.currentPage < Math.ceil($scope.model.foundset.serverSize / $scope.model.pageSize) && $scope.model.currentPage > 0);
				}

				/**
				 * Check if paging is needed and show/hide the page navigation
				 * */
				$scope.showPagination = function() {
					return $scope.model.pageSize && $scope.model.foundset && $scope.model.foundset.serverSize > $scope.model.pageSize;
				}

				/**
				 * Sets the current page of the chart
				 * @param {Number} newCurrentPage the new page to set the chart data to
				 * */
				function setCurrentPage(newCurrentPage) {
					var loadNext;
					if ($scope.model.currentPage != newCurrentPage) {
						loadNext = $scope.model.currentPage < newCurrentPage;
						loadCurrentPageRecords(loadNext);
						$scope.model.currentPage = newCurrentPage;
					}
				}

				/**
				 * Loads the records in the current page
				 * @param {Boolean} loadNext true is we go to the next page, false if we go to the previous page
				 * */
				function loadCurrentPageRecords(loadNext) {
					var startIndex = ($scope.model.currentPage - 1) * $scope.model.pageSize;// currentPage -1 because page count starts from 1 and viewPort indexes from 0
					startIndex = (loadNext == true) ? startIndex + $scope.model.pageSize : startIndex - $scope.model.pageSize;
					$scope.model.foundset.loadRecordsAsync(startIndex, $scope.model.pageSize).then(function() { });
				}
			},
			templateUrl: 'servoychartjs/FSChartJS/FSChartJS.html'
		};
	})