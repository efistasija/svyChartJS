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
			"default": "bar",
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
			"includeColumnNames": false,
			"tags": 
			{
				"scope": "private"
			}
		},

		"dataLabel": 
		{
			"type": "string",
			"tags": 
			{
				"scope": "design"
			}
		},

		"backgroundColors": 
		{
			"type": "string[]",
			"tags": 
			{
				"scope": "design"
			}
		},

		"borderColors": 
		{
			"type": "string[]",
			"tags": 
			{
				"scope": "design"
			}
		},

		"borderWidth": 
		{
			"type": "int",
			"tags": 
			{
				"scope": "design"
			}
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