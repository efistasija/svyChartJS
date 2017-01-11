{
	"name": "servoychartjs-F-S-Chart-J-S",
	"displayName": "FSChartJS",
	"version": 1,
	"definition": "servoychartjs/FSChartJS/FSChartJS.js",
	"serverscript": "servoychartjs/FSChartJS/FSChartJS_server.js",
	"libraries": 
	[
		
	],

	"model": 
	{
		"foundset": 
		{
			"type": "foundset",
			"dataproviders": 
			[
				"value",
				"label"
			],
			"initialPreferredViewPortSize": 20, "sendSelectionViewportInitially": true
		},

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

		"dataLabel": 
		{
			"type": "tagstring",
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

		"maxLoadedRecords": 
		{
			"type": "int",
			"tags": 
			{
				"scope": "design"
			}
		},

		"pageSize": 
		{
			"type": "int",
			"default": 20,
			"tags": 
			{
				"scope": "design"
			}
		},

		"currentPage": 
		{
			"type": "int",
			"default": 1,
			"tags": 
			{
				"scope": "runtime"
			},

			"pushToServer": "shallow"
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