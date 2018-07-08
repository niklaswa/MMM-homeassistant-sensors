# MMM-homeassistant-sensors
This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror/tree/develop). 
It can display information from [Home Assistant](https://home-assistant.io/) using the home assistant REST API.

## Installation
Navigate into your MagicMirror's `modules` folder and clone this repository. 
`cd ~\MagicMirror\modules && git clone https://github.com/leinich/MMM-homeassistant-sensors.git`

In cases you want to use icons for the sensor please perform following:
Download the MaterialDesignIcons Webfont from https://github.com/Templarian/MaterialDesign-Webfont/archive/master.zip and unzip the folder
`cd ~\MagicMirror\modules\MMM-homeassistant-sensors && wget https://github.com/Templarian/MaterialDesign-Webfont/archive/master.zip && unzip master.zip`

## Configuration
It is very simple to set up this module, a sample configuration looks like this:

## Configuration Options

| Option               | Description |
| -------------------- | ----------- |
| `prettyName`         | Pretty print the name of each JSON key (remove camelCase and underscores). <br><br> **Default value:** `true` |
| `stripName`          | Removes all keys before the printed key. <br><br>**Example:** `a.b.c` will print `c`.<br> **Default value:** `true` |
| `title`              | Title to display at the top of the module. <br><br> **Default value: ** `Home Assistant` |
| `url`                | The url of the homeassitant api . <br><br> **Default value:** `REQUIRED` |
| `updateInterval`     | The time between updates (In milliseconds). / <br><br> **Default value:** `300000 (5 minutes)` |
| `values`             | Specify specific values from the json feed to only show what you need (entity_id). |

## values option
| Option               | Description |
| -------------------- | ----------- |
| `sensor`             | entity_id as of home-assistant. Please have a look at teh states pages for the unique entity_id of your sensor |
| `name`               | custom display name |
| `icons`              | an icons object for the on/off status of sensor. please see: [MaterialDesignIcons](https://materialdesignicons.com/) |

## icons option
| Option               | Description |
| -------------------- | ----------- |
| `default`            | default icon of the sensor. In case there is no on/off status, like processor use. |
| `state_on`           | on status icon of the sensor |
| `state_off`          | off status icon of the sensor |

Here is an example of an entry in `config.js`
```
modules: [{
		module: 'MMM-homeassistant-sensors',
		position: 'top_left',
		config: {
			url: 'https://yourhomeassistant:8123/api/states?api_password=secret',
			prettyName: false,
			stripName: false,
			values: [{
					sensor: "sensor.processor_use",
					icons: [{
							"default": "chip"
						}
					]
				}, {
					sensor: "binary_sensor.sensor",
					name: "Motion"
					icons: [{
							"state_off": "run",
							"state_on": "run-fast"
						}
					]
				}, {
					sensor: "switch.reception_spot",
					icons: [{
							"state_off": "lightbulb-outline",
							"state_on": "lightbulb-on-outline"
						}
					]
				}
			]

		}
	}
]
```
**Result** example:

![Alt text](https://image.ibb.co/b8edjx/dynamic_icons.png "dynamic icons example")

## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
- [tkoeberl](https://github.com/tkoeberl) for creating the initial module that I used as guidance in creating this module.
