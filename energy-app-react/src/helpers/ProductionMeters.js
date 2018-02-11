solarProduction = {
    'links': {
        'next': 'https://api.buildingos.com/meters/cfe90dceb5b311e6a768525400ac67dc/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/cfe90dceb5b311e6a768525400ac67dc/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'data': [
        {'value': -0.00097, 'localtime': '2018-01-01T00:00:00-06:00'},
        {'value': -0.00097, 'localtime': '2018-01-01T01:00:00-06:00'},
        {'value': -0.00096, 'localtime': '2018-01-01T02:00:00-06:00'},
        {'value': -0.00096, 'localtime': '2018-01-01T03:00:00-06:00'},
        {'value': -0.00095, 'localtime': '2018-01-01T04:00:00-06:00'},
        {'value': -0.00097, 'localtime': '2018-01-01T05:00:00-06:00'},
        {'value': -0.00097, 'localtime': '2018-01-01T06:00:00-06:00'},
        {'value': -0.00108, 'localtime': '2018-01-01T07:00:00-06:00'},
        {'value': 0.88979, 'localtime': '2018-01-01T08:00:00-06:00'},
        {'value': 2.85116, 'localtime': '2018-01-01T09:00:00-06:00'},
        {'value': 6.49309, 'localtime': '2018-01-01T10:00:00-06:00'},
        {'value': 7.55441, 'localtime': '2018-01-01T11:00:00-06:00'},
        {'value': 7.8694, 'localtime': '2018-01-01T12:00:00-06:00'},
        {'value': 7.30922, 'localtime': '2018-01-01T13:00:00-06:00'},
        {'value': 5.73553, 'localtime': '2018-01-01T14:00:00-06:00'},
        {'value': 2.44902, 'localtime': '2018-01-01T15:00:00-06:00'},
        {'value': 0.32124, 'localtime': '2018-01-01T16:00:00-06:00'},
        {'value': -0.00105, 'localtime': '2018-01-01T17:00:00-06:00'},
        {'value': -0.00102, 'localtime': '2018-01-01T18:00:00-06:00'},
        {'value': -0.00102, 'localtime': '2018-01-01T19:00:00-06:00'},
        {'value': -0.00099, 'localtime': '2018-01-01T20:00:00-06:00'},
        {'value': -0.001, 'localtime': '2018-01-01T21:00:00-06:00'},
        {'value': -0.00101, 'localtime': '2018-01-01T22:00:00-06:00'},
        {'value': -0.00101, 'localtime': '2018-01-01T23:00:00-06:00'},
        {'value': -0.001, 'localtime': '2018-01-02T00:00:00-06:00'}
    ],
    'meta': {
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit',
            'unitsCost': 'https://api.buildingos.com/definitions/currency'
        },
        'units': {
            'value': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'}
        },
        'resolution': {'id': 1, 'slug': 'hour', 'displayName': 'Hour'}
    }
}

solarMeter = {
    'displayUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'uuid': 'cfe90dceb5b311e6a768525400ac67dc',
    'resourceType': {'id': 2, 'slug': 'pv', 'displayName': 'Photovoltaic'},
    'building': 'https://api.buildingos.com/buildings/5179',
    'integration': {'id': 41, 'displayName': 'eGauge'},
    'currentRate': {'value': 0.07},
    'defaultTimescale': {'id': 1, 'slug': 'today', 'displayName': 'Today'},
    'scope': {'id': 0, 'slug': 'wholeBuilding', 'displayName': 'Whole building'},
    'flatlineThreshold': {'id': 0, 'displayName': 'Disabled'},
    'data': 'https://api.buildingos.com/meters/cfe90dceb5b311e6a768525400ac67dc/data',
    'displayName': 'James Hall Solar PV',
    'latestReadingAt': '2018-02-10T16:36:00-06:00',
    'firstReadingAt': '2016-11-28T15:16:00-06:00',
    'id': 87899,
    'vendorMeterId': 'James Hall Solar PV',
    'url': 'https://api.buildingos.com/meters/cfe90dceb5b311e6a768525400ac67dc',
    'readingType': {'id': 2, 'slug': 'bi_directional_totalizer', 'displayName': 'Bi-Directional totalizer'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 97, 'shortName': 'Wh', 'displayName': 'Watt-hours'},
    'storageUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/8297', 'uri': 'bos://egauge/eGauge30476'},
    'name': 'carleton_james_pv_submeter_jameshallsolarpv'
}

turbine1Production = {
    'links': {
        'next': 'https://api.buildingos.com/meters/597b6132904f11e38a055254006c70aa/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/597b6132904f11e38a055254006c70aa/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'data': [
        {'value': null, 'localtime': '2018-01-01T00:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T01:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T02:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T03:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T04:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T05:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T06:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T07:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T08:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T09:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T10:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T11:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T12:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T13:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T14:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T15:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T16:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T17:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T18:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T19:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T20:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T21:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T22:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T23:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-02T00:00:00-06:00'}
    ],
    'meta': {
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit',
            'unitsCost': 'https://api.buildingos.com/definitions/currency'
        },
        'units': {
            'value': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'}
        },
        'resolution': {'id': 1, 'slug': 'hour', 'displayName': 'Hour'}
    }
}

turbine1Meter = {
    'displayUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'uuid': '597b6132904f11e38a055254006c70aa',
    'resourceType': {'id': 11, 'slug': 'wind', 'displayName': 'Wind power'},
    'building': 'https://api.buildingos.com/buildings/4959',
    'integration': {'id': 30, 'displayName': 'BuildingOS CSV'},
    'currentRate': {'value': 0.07},
    'defaultTimescale': {'id': 3, 'slug': 'month', 'displayName': 'This month'},
    'scope': {'id': 32, 'slug': 'submeter', 'displayName': 'Sub-meter'},
    'flatlineThreshold': {'id': 43200, 'displayName': 'Twelve Hours'},
    'data': 'https://api.buildingos.com/meters/597b6132904f11e38a055254006c70aa/data',
    'displayName': 'Main Campus - Turbine 1: Public grid, Production',
    'latestReadingAt': '2018-02-10T16:20:00-06:00',
    'firstReadingAt': '2014-02-07T14:00:00-06:00',
    'id': 23822,
    'vendorMeterId': null,
    'url': 'https://api.buildingos.com/meters/597b6132904f11e38a055254006c70aa',
    'readingType': {'id': 1, 'slug': 'totalizer', 'displayName': 'Totalizer'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 43, 'shortName': 'kWh', 'displayName': 'Kilowatt-hours'},
    'storageUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/1639',
    'uri': 'bos://buildingos-csv/carleton_wind_turbine'},
    'name': 'carleton_turbine1_produced_power'
}

turbine1Wind = {
    'links': {
        'next': 'https://api.buildingos.com/meters/601bcd20951711e3ae62525400e0c181/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/601bcd20951711e3ae62525400e0c181/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'data': [
        {'value': null, 'localtime': '2018-01-01T00:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T01:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T02:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T03:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T04:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T05:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T06:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T07:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T08:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T09:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T10:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T11:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T12:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T13:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T14:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T15:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T16:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T17:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T18:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T19:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T20:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T21:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T22:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-01T23:00:00-06:00'},
        {'value': null, 'localtime': '2018-01-02T00:00:00-06:00'}
    ],
    'meta': {
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit',
            'unitsCost': 'https://api.buildingos.com/definitions/currency'
        },
        'units': {
            'value': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'}
        },
        'resolution': {'id': 1, 'slug': 'hour', 'displayName': 'Hour'}
    }
}

turbine1WindMeter = {
    'displayUnit': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'},
    'uuid': '601bcd20951711e3ae62525400e0c181',
    'resourceType': {'id': 36, 'slug': 'wind_speed', 'displayName': 'Wind speed'},
    'building': 'https://api.buildingos.com/buildings/4959',
    'integration': {'id': 30, 'displayName': 'BuildingOS CSV'},
    'currentRate': {'value': 0},
    'defaultTimescale': {'id': 3, 'slug': 'month', 'displayName': 'This month'},
    'scope': {'id': 28, 'slug': 'other', 'displayName': 'Hidden'},
    'flatlineThreshold': {'id': 0, 'displayName': 'Disabled'},
    'data': 'https://api.buildingos.com/meters/601bcd20951711e3ae62525400e0c181/data',
    'displayName': 'Main Campus - Turbine 1: Public Grid, Wind Speed',
    'latestReadingAt': '2018-02-10T16:20:00-06:00',
    'firstReadingAt': '2014-02-13T16:00:00-06:00',
    'id': 24096,
    'vendorMeterId': null,
    'url': 'https://api.buildingos.com/meters/601bcd20951711e3ae62525400e0c181',
    'readingType': {'id': 0, 'slug': 'interval_demand', 'displayName': 'Interval demand'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'},
    'storageUnit': {'id': 15, 'shortName': 'mph', 'displayName': 'Miles / hour'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/1639', 'uri': 'bos://buildingos-csv/carleton_wind_turbine'},
    'name': 'carleton_turbinew_wind_speed'
}

turbine2Consumption = {
    'data': [
        {'localtime': '2018-01-01T00:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T01:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T02:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T03:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T04:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T05:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T06:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T07:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T08:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T09:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T10:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T11:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T12:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T13:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T14:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T15:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T16:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T17:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T18:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T19:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T20:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T21:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T22:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-01T23:00:00-06:00', 'value': 0.0},
        {'localtime': '2018-01-02T00:00:00-06:00', 'value': 0.0}
    ],
    'links': {
        'next': 'https://api.buildingos.com/meters/carleton_wind_consumption/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/carleton_wind_consumption/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'meta': {
        'units': {
            'value': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'}
        },
        'resolution': {'id': 1, 'displayName': 'Hour', 'slug': 'hour'},
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsCost': 'https://api.buildingos.com/definitions/currency',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit'
        }
    }
}

turbine2ConsumptionMeter = {
    'displayUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'uuid': 'carleton_wind_consumption',
    'resourceType': {'id': 11, 'slug': 'wind', 'displayName': 'Wind power'},
    'building': 'https://api.buildingos.com/buildings/4959',
    'integration': {'id': 30, 'displayName': 'BuildingOS CSV'},
    'currentRate': {'value': 0.07},
    'defaultTimescale': {'id': 3, 'slug': 'month', 'displayName': 'This month'},
    'scope': {'id': 28, 'slug': 'other', 'displayName': 'Hidden'},
    'flatlineThreshold': {'id': 0, 'displayName': 'Disabled'},
    'data': 'https://api.buildingos.com/meters/carleton_wind_consumption/data',
    'displayName': 'Main Campus - Turbine 2 (Kracum): Carleton Grid, Consumption',
    'latestReadingAt': '2018-02-10T16:10:00-06:00',
    'firstReadingAt': '2013-01-25T08:50:00-06:00',
    'id': 15523,
    'vendorMeterId': null,
    'url': 'https://api.buildingos.com/meters/carleton_wind_consumption',
    'readingType': {'id': 1, 'slug': 'totalizer', 'displayName': 'Totalizer'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 43, 'shortName': 'kWh', 'displayName': 'Kilowatt-hours'},
    'storageUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/1639', 'uri': 'bos://buildingos-csv/carleton_wind_turbine'},
    'name': 'carleton_wind_consumption'
}

turbine2Production = {
    'links': {
        'next': 'https://api.buildingos.com/meters/carleton_wind_production/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/carleton_wind_production/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'data': [
        {'value': 653.99997, 'localtime': '2018-01-01T00:00:00-06:00'},
        {'value': 561.99996, 'localtime': '2018-01-01T01:00:00-06:00'},
        {'value': 453.99966, 'localtime': '2018-01-01T02:00:00-06:00'},
        {'value': 553.99992, 'localtime': '2018-01-01T03:00:00-06:00'},
        {'value': 432.00018, 'localtime': '2018-01-01T04:00:00-06:00'},
        {'value': 327.99984, 'localtime': '2018-01-01T05:00:00-06:00'},
        {'value': 228.00024, 'localtime': '2018-01-01T06:00:00-06:00'},
        {'value': 255.9999, 'localtime': '2018-01-01T07:00:00-06:00'},
        {'value': 187.99998, 'localtime': '2018-01-01T08:00:00-06:00'},
        {'value': 89.99988, 'localtime': '2018-01-01T09:00:00-06:00'},
        {'value': 96.00024, 'localtime': '2018-01-01T10:00:00-06:00'},
        {'value': 85.99998, 'localtime': '2018-01-01T11:00:00-06:00'},
        {'value': 100.00014, 'localtime': '2018-01-01T12:00:00-06:00'},
        {'value': 125.99988, 'localtime': '2018-01-01T13:00:00-06:00'},
        {'value': 106.0002, 'localtime': '2018-01-01T14:00:00-06:00'},
        {'value': 112.00008, 'localtime': '2018-01-01T15:00:00-06:00'},
        {'value': 144.00012, 'localtime': '2018-01-01T16:00:00-06:00'},
        {'value': 302.00028, 'localtime': '2018-01-01T17:00:00-06:00'},
        {'value': 502.0008, 'localtime': '2018-01-01T18:00:00-06:00'},
        {'value': 645.99984, 'localtime': '2018-01-01T19:00:00-06:00'},
        {'value': 493.99956, 'localtime': '2018-01-01T20:00:00-06:00'},
        {'value': 660.00027, 'localtime': '2018-01-01T21:00:00-06:00'},
        {'value': 695.99994, 'localtime': '2018-01-01T22:00:00-06:00'},
        {'value': 750.00018, 'localtime': '2018-01-01T23:00:00-06:00'},
        {'value': 853.99992, 'localtime': '2018-01-02T00:00:00-06:00'}
    ],
    'meta': {
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit',
            'unitsCost': 'https://api.buildingos.com/definitions/currency'
        },
        'units': {
            'value': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'}
        },
        'resolution': {'id': 1, 'slug': 'hour', 'displayName': 'Hour'}
    }
}

turbine2Meter = {
    'displayUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'uuid': 'carleton_wind_production',
    'resourceType': {'id': 11, 'slug': 'wind', 'displayName': 'Wind power'},
    'building': 'https://api.buildingos.com/buildings/4959',
    'integration': {'id': 30, 'displayName': 'BuildingOS CSV'},
    'currentRate': {'value': 0.07},
    'defaultTimescale': {'id': 3, 'slug': 'month', 'displayName': 'This month'},
    'scope': {'id': 32, 'slug': 'submeter', 'displayName': 'Sub-meter'},
    'flatlineThreshold': {'id': 43200, 'displayName': 'Twelve Hours'},
    'data': 'https://api.buildingos.com/meters/carleton_wind_production/data',
    'displayName': 'Main Campus - Turbine 2 (Kracum): Carleton Grid, Production',
    'latestReadingAt': '2018-02-10T16:10:00-06:00',
    'firstReadingAt': '2013-01-25T08:50:00-06:00',
    'id': 16839,
    'vendorMeterId': null,
    'url': 'https://api.buildingos.com/meters/carleton_wind_production',
    'readingType': {'id': 1, 'slug': 'totalizer', 'displayName': 'Totalizer'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 43, 'shortName': 'kWh', 'displayName': 'Kilowatt-hours'},
    'storageUnit': {'id': 1, 'shortName': 'kW', 'displayName': 'Kilowatts'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/1639', 'uri': 'bos://buildingos-csv/carleton_wind_turbine'},
    'name': 'carleton_wind_production'
}

turbine2Wind = {
    'links': {
        'next': 'https://api.buildingos.com/meters/carleton_wind_speed/data?start=2018-01-02T01%3A00%3A00-06%3A00&end=2018-01-03T01%3A00%3A00-06%3A00&resolution=hour&order=asc',
        'previous': 'https://api.buildingos.com/meters/carleton_wind_speed/data?start=2017-12-30T23%3A00%3A00-06%3A00&end=2017-12-31T23%3A00%3A00-06%3A00&resolution=hour&order=asc'
    },
    'data': [
        {'value': 7.17468, 'localtime': '2018-01-01T00:00:00-06:00'},
        {'value': 6.79823, 'localtime': '2018-01-01T01:00:00-06:00'},
        {'value': 6.42817, 'localtime': '2018-01-01T02:00:00-06:00'},
        {'value': 6.72074, 'localtime': '2018-01-01T03:00:00-06:00'},
        {'value': 6.23655, 'localtime': '2018-01-01T04:00:00-06:00'},
        {'value': 5.83926, 'localtime': '2018-01-01T05:00:00-06:00'},
        {'value': 5.19971, 'localtime': '2018-01-01T06:00:00-06:00'},
        {'value': 5.32445, 'localtime': '2018-01-01T07:00:00-06:00'},
        {'value': 4.92841, 'localtime': '2018-01-01T08:00:00-06:00'},
        {'value': 4.00017, 'localtime': '2018-01-01T09:00:00-06:00'},
        {'value': 4.2279, 'localtime': '2018-01-01T10:00:00-06:00'},
        {'value': 4.25448, 'localtime': '2018-01-01T11:00:00-06:00'},
        {'value': 4.40926, 'localtime': '2018-01-01T12:00:00-06:00'},
        {'value': 4.62463, 'localtime': '2018-01-01T13:00:00-06:00'},
        {'value': 4.51245, 'localtime': '2018-01-01T14:00:00-06:00'},
        {'value': 4.59956, 'localtime': '2018-01-01T15:00:00-06:00'},
        {'value': 4.86856, 'localtime': '2018-01-01T16:00:00-06:00'},
        {'value': 6.00621, 'localtime': '2018-01-01T17:00:00-06:00'},
        {'value': 6.69724, 'localtime': '2018-01-01T18:00:00-06:00'},
        {'value': 7.19628, 'localtime': '2018-01-01T19:00:00-06:00'},
        {'value': 6.68234, 'localtime': '2018-01-01T20:00:00-06:00'},
        {'value': 7.2182, 'localtime': '2018-01-01T21:00:00-06:00'},
        {'value': 7.37526, 'localtime': '2018-01-01T22:00:00-06:00'},
        {'value': 7.21554, 'localtime': '2018-01-01T23:00:00-06:00'},
        {'value': 7.40113, 'localtime': '2018-01-02T00:00:00-06:00'}
    ],
    'meta': {
        'definitions': {
            'resolution': 'https://api.buildingos.com/definitions/resolution',
            'unitsValue': 'https://api.buildingos.com/definitions/displayUnit',
            'unitsCost': 'https://api.buildingos.com/definitions/currency'
        },
        'units': {
            'value': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'}
        },
        'resolution': {'id': 1, 'slug': 'hour', 'displayName': 'Hour'}
    }
}

turbine2WindMeter = {
    'displayUnit': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'},
    'uuid': 'carleton_wind_speed',
    'resourceType': {'id': 36, 'slug': 'wind_speed', 'displayName': 'Wind speed'},
    'building': 'https://api.buildingos.com/buildings/4959',
    'integration': {'id': 30, 'displayName': 'BuildingOS CSV'},
    'currentRate': {'value': 0},
    'defaultTimescale': {'id': 3, 'slug': 'month', 'displayName': 'This month'},
    'scope': {'id': 0, 'slug': 'wholeBuilding', 'displayName': 'Whole building'},
    'flatlineThreshold': {'id': 0, 'displayName': 'Disabled'},
    'data': 'https://api.buildingos.com/meters/carleton_wind_speed/data',
    'displayName': 'Main Campus - Turbine 2 (Kracum): Carleton Grid, Wind Speed',
    'latestReadingAt': '2018-02-10T16:10:00-06:00',
    'firstReadingAt': '2013-01-25T09:50:00-06:00',
    'id': 16842,
    'vendorMeterId': null,
    'url': 'https://api.buildingos.com/meters/carleton_wind_speed',
    'readingType': {'id': 0, 'slug': 'interval_demand', 'displayName': 'Interval demand'},
    'status': {'id': 'online', 'displayName': 'Online'},
    'sourceUnit': {'id': 33, 'shortName': 'm/s', 'displayName': 'Meters / second'},
    'storageUnit': {'id': 15, 'shortName': 'mph', 'displayName': 'Miles / hour'},
    'gateway': {'url': 'https://api.buildingos.com/gateways/1639', 'uri': 'bos://buildingos-csv/carleton_wind_turbine'},
    'name': 'carleton_wind_speed'
}

export default {
    solarProduction,
    solarMeter,
    turbine1Production,
    turbine1Meter,
    turbine1Wind,
    turbine1WindMeter,
    turbine2Consumption,
    turbine2ConsumptionMeter,
    turbine2Production,
    turbine2Meter,
    turbine2Wind,
    turbine2WindMeter
}