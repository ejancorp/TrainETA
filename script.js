var MetroDB = {
    "red": [{
        "name": "Rashidiya",
        "number": "11"
    }, {
        "name": "Emirates",
        "number": "12"
    }, {
        "name": "Airport Terminal 3",
        "number": "13"
    }, {
        "name": "Airport Terminal 1",
        "number": "14"
    }, {
        "name": "GGICO",
        "number": "15"
    }, {
        "name": "Deira City Centre",
        "number": "16"
    }, {
        "name": "Al Rigga",
        "number": "17"
    }, {
        "name": "Union",
        "number": "18"
    }, {
        "name": "BurJuman",
        "number": "19"
    }, {
        "name": "DAMAC (formerly Al Karama)",
        "number": "20"
    }, {
        "name": "Al Jafiliya",
        "number": "21"
    }, {
        "name": "World Trade Centre",
        "number": "22"
    }, {
        "name": "Emirates Towers",
        "number": "23"
    }, {
        "name": "Financial Centre",
        "number": "24"
    }, {
        "name": "Burj Khalifa/Dubai Mall",
        "number": "25"
    }, {
        "name": "Business Bay",
        "number": "26"
    }, {
        "name": "Noor Islamic Bank",
        "number": "29"
    }, {
        "name": "First Gulf Bank",
        "number": "31"
    }, {
        "name": "Mall of the Emirates",
        "number": "32"
    }, {
        "name": "Sharaf DG",
        "number": "33"
    }, {
        "name": "Dubai Internet City",
        "number": "34"
    }, {
        "name": "Nakheel",
        "number": "35"
    }, {
        "name": "DAMAC (formerly Dubai Marina)",
        "number": "36"
    }, {
        "name": "Jumeirah Lakes Towers",
        "number": "37"
    }, {
        "name": "Nakheel Harbour and Tower",
        "number": "38"
    }, {
        "name": "Ibn Battuta",
        "number": "39"
    }, {
        "name": "Energy",
        "number": "40"
    }, {
        "name": "Danube",
        "number": "41"
    }, {
        "name": "UAE Exchange (formerly Jebel Ali)",
        "number": "42"
    }],
    "green": [{
        "name": "Etisalat",
        "number": "11"
    }, {
        "name": "Al Qusais",
        "number": "12"
    }, {
        "name": "Dubai Airport Free Zone",
        "number": "13"
    }, {
        "name": "Al Nahda",
        "number": "14"
    }, {
        "name": "Stadium",
        "number": "15"
    }, {
        "name": "Al Qiyadah",
        "number": "16"
    }, {
        "name": "Abu Hail",
        "number": "17"
    }, {
        "name": "Abu Baker Al Siddique",
        "number": "18"
    }, {
        "name": "Salah Al Din",
        "number": "19"
    }, {
        "name": "Union",
        "number": "20"
    }, {
        "name": "Baniyas Square",
        "number": "21"
    }, {
        "name": "Palm Deira",
        "number": "22"
    }, {
        "name": "Al Ras",
        "number": "23"
    }, {
        "name": "Al Ghubaiba",
        "number": "24"
    }, {
        "name": "Al Fahidi",
        "number": "25"
    }, {
        "name": "BurJuman",
        "number": "26"
    }, {
        "name": "Oud Metha",
        "number": "27"
    }, {
        "name": "Dubai Healthcare City",
        "number": "28"
    }, {
        "name": "Al Jadaf",
        "number": "29"
    }, {
        "name": "Creek",
        "number": "30"
    }]
};

//https://codepen.io/jonmilner/pen/EPGJXJ

(function(MetroDB) {

    var Teta = function() {

        this.from = null;
        this.to = null;
        this.line = null;
        //minutes per station.
        this.mps = 2;
        this.stations = {
            green: MetroDB['green'],
            red: MetroDB['red']
        };
    };

    Teta.prototype.init = function() {
        this.stations.green = this.stations.green.sort(this.sortStation);
        this.stations.red = this.stations.red.sort(this.sortStation);
        return this;
    };

    Teta.prototype.sortStation = function(a, b) {
        return a.number - b.number;
    };

    Teta.prototype.setFrom = function(number) {
        this.from = parseInt(number);
        return this;
    };

    Teta.prototype.setTo = function(number) {
        this.to = parseInt(number);
        return this;
    };

    Teta.prototype.setLine = function(line) {
        this.line = typeof this.stations[line] === 'undefined' ? null : line;
        return this;
    };

    Teta.prototype.calculateTravelTime = function(stations) {
        return this.prettyTime(this.mps * (parseInt(stations.slice(-1)[0].number) - parseInt(stations[0].number)));
    };

    Teta.prototype.prettyTime = function(minutes) {
        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ' hours ' + m + ' mins';
    };

    Teta.prototype.getStationsRange = function(line, from, to) {
        return this.stations[line].filter(this.isStationBetweenIndex.bind({
            from: from,
            to: to
        }));
    };

    Teta.prototype.isStationBetweenIndex = function(station, index) {
        return this.from >= index && this.to <= index || this.from <= index && this.to >= index;
    };

    Teta.prototype.getStationIndex = function(line, number) {
        return this.stations[line].findIndex(this.isStationIndexSame.bind({
            number: number
        }));
    };

    Teta.prototype.isStationIndexSame = function(station) {
        return parseInt(station.number) === parseInt(this.number);
    };

    Teta.prototype.prettyGuide = function(stations) {
        var guide = [];
        for (var i = 0; i < stations.length; i++)
            guide.push(stations[i].name + '(' + stations[i].number + ')');

        return guide.join(' ==> ');
    };

    Teta.prototype.testRun = function() {
        console.log(MetroDB);
    };

    var app = new Teta();
    var from = app.getStationIndex('red', 12);
    var to = app.getStationIndex('red', 11);
    var dist = app.getStationsRange('red', from, to);
    var time = app.calculateTravelTime(dist);
    console.log(time);

    app.init();

})(MetroDB);
