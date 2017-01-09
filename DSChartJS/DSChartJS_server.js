/**
 * Pass-in an advanced configuration object to the chart, as defined in http://www.chartjs.org/docs/
 * Accepts all options except the actual data and the x labels for the data points.
 * @example
 * var node = {
 * 		type: 'bar',
 * 		data: {
 * 			datasets: [{
 * 				label: "My First dataset",
 * 				backgroundColor: "#46BFBD",
 * 				borderColor: "rgba(220,220,220,1)",
 * 				borderWidth: 1,
 * 				hoverBackgroundColor: "#46bf81",
 * 				hoverBorderColor: "rgba(220,220,220,1)",
 * 				pointBorderColor: "rgba(220,220,220,1)"
 * 				}]
 * 				},
 * 			options: {
 * 				title: {
 * 					text: 'Bar chart'
 * 				},
 * 				responsive: false,
 * 				tooltips: {
 * 					mode: 'label'
 * 				},
 *  			elements: {
 * 					line: {
 * 						fill: false
 * 					}
 * 				},
 * 				scales: {
 * 					xAxes: [{
 * 						display: true,
 * 						gridLines: {
 * 							display: false
 *  					},
 * 						labels: {
 * 							show: true
 * 						},
 * 						scaleLabel: {
 * 							display: true,
 * 							labelString: 'First 6 months',
 * 							fontSize: 16
 * 						}
 *  				}],
 *  				yAxes: [{
 * 						type: "linear",
 * 						display: true,
 * 						position: "left",
 * 						id: "y-axis-1",
 * 						gridLines: {
 * 							display: false
 * 						},
 * 						labels: {
 * 							show: true
 * 						},
 *  					scaleLabel: {
 * 							display: true,
 * 							labelString: 'Numbers per month',
 * 							fontSize: 16
 * 						}
 * 					}]
 * 				}
 * 			}
 * 		};
 *
 * %%prefix%%%%elementName%%.setDataSet(dataset);
 * %%prefix%%%%elementName%%.configAdvancedChart(node);
 **/
$scope.api.configAdvancedChart = function(node) {
	$scope.model.node = node;
}

/**
 * Set the data and x data labels based on a dataSet. The first column in the dataSet (idx 0) should be the labels and the 1st column should be the data points.
 * Make sure there is a label for each datapoint, otherwise that data point won't be shown.
 *
 * @example
 * 	var maxReturnedRows = 10;
 *  var query = 'select productname, unitprice from products';
 *  var dataset = databaseManager.getDataSetByQuery('example_data', query, [], maxReturnedRows);
 *
 *  %%prefix%%%%elementName%%.setDataSet(dataset);
 * */
$scope.api.setDataSet = function(jsDataSet) {
	$scope.model.data = jsDataSet;
}
