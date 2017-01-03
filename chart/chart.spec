{
	"name": "servoychartjs-chart",
	"displayName": "chart",
	"version": 1,
	"definition": "servoychartjs/chart/chart.js",
	"serverscript": "servoychartjs/chart/chart_server.js",
	"libraries": [],
	"model": 
	{
		"type": 
		{
			"type": "string",
			"tags": 
			{
				"scope": "design"
			},

			"default": "line",
			"values": 
			[
				{
					"BAR": "bar"
				},

				{
					"HORIZONTAL_BAR": "horizontalBar"
				},

				{
					"LINE": "line"
				},

				{
					"AREA": "area"
				},

				{
					"RADAR": "radar"
				},

				{
					"POLAR": "polarArea"
				},

				{
					"PIE": "pie"
				},

				{
					"DOUGHNUT": "doughnut"
				}
			]
		},

		"data": 
		{
			"type": "dataset",
			"includeColumnNames": true
		},

		"dataLabel": 
		{
			"type": "string",
			"tags": 
			{
				"scope": "design"
			},

			"default": "My Chart Data"
		},

		"backgroundColors": 
		{
			"type": "string[]",
			"tags": 
			{
				"scope": "design"
			},

			"default": 
			[
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)"
			]
		},

		"borderColors": 
		{
			"type": "string[]",
			"tags": 
			{
				"scope": "design"
			},

			"default": 
			[
				"rgba(255,0,0,1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)"
			]
		},

		"borderWidth": 
		{
			"type": "int",
			"tags": 
			{
				"scope": "design"
			},

			"default": 1
		},

		"node": 
		{
			"type": "object",
			"tags": 
			{
				"scope": "private"
			}
		}
	},

	"api": 
	{
		"configAdvancedChart": 
		{
			"parameters": 
			[
				{
					"name": "node",
					"type": "object"
				}
			]
		},

		"setDataSet": 
		{
			"parameters": 
			[
				{
					"name": "jsDataSet",
					"type": 
					{
						"type": "dataset",
						"includeColumnNames": true
					}
				}
			]
		}
	}
}