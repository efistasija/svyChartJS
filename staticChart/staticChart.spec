{
	"name": "servoychartjs-static-Chart",
	"displayName": "staticChart",
	"version": 1,
	"definition": "servoychartjs/staticChart/staticChart.js",
	"serverscript": "servoychartjs/staticChart/staticChart_server.js",
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
			"type": "int[]",
			"default": 
			[
				65,
				59,
				80,
				81,
				56,
				55,
				40
			]
		},

		"xLabels": 
		{
			"type": "string[]",
			"default": 
			[
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July"
			]
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

	"handlers": 
	{
		"onClick": 
		{
			"parameters": 
			[
				{
					"name": "index",
					"type": "int"
				},

				{
					"name": "label",
					"type": "string"
				},

				{
					"name": "value",
					"type": "int"
				}
			]
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
		}
	}
}