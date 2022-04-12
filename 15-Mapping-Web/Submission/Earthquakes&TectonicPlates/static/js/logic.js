var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;
var url2 = "static/data/PB2002_boundaries.json";
$(document).ready(function() {

//READING IN JSON
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $.ajax({
                type: "GET",
                url: url2,
                contentType: "application/json; charset=utf-8",
                success: function(plates) {
                    console.log(plates);
                    console.log(data);
                    createMap(data, plates);
        
                },
                error: function(textStatus, errorThrown) {
                    console.log("FAILED to get data");
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});

function onEachFeature(feature, layer) {
    // TOOL TIPS FOR MARKERS
    if (feature.properties) {
        layer.bindPopup(`<h3>${ feature.properties.title }</h3><h4> Magnitude:${feature.properties.mag} </h4><h4> Depth: ${feature.geometry.coordinates[2]}</h4><hr><p>${new Date(feature.properties.time)} </p >`);
    }
}


// GETS NEEDED DATA TO APPLY TO VIZ
function createMap(data, plates) {

    // apply the filter
    var earthquakes = data.features;
    var tectonicplates = plates.features;

    // Base Layers
    var satellite_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/satellite-v9',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });
    var street_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    

    // Create an overlays object.
    var earthquakeLayer = L.geoJSON(earthquakes, {
        onEachFeature: onEachFeature
    });
    
    //ADDRESS MAGNITUDE SIZE 0
    function magsize(mag) {
        if(mag ==0) {
            return 1;

        }
        return (mag * 2)
    }
    // CIRCLE OBJECT
    var circles = [];
    for (let i = 0; i < earthquakes.length; i++) {
        let earthquake = earthquakes[i];
        let circle_color = chooseColor(earthquake.geometry.coordinates[2]);
        let circle_size = magsize(earthquake.properties.mag);
        let location = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]
        let circle = L.circle(location, {
            color: 'black',
            weight:1,
            fillColor: circle_color,
            fillOpacity: 0.5,
            radius: Math.round(circle_size)*30000
        }).bindPopup(`<h3>${ earthquake.properties.title }</h3><h4> Magnitude:${earthquake.properties.mag} </h4><h4> Depth: ${earthquake.geometry.coordinates[2]}</h4><hr><p>${new Date(earthquake.properties.time)} </p >`);
        circles.push(circle);
    }
  
    //ADD PLATE OBJECT
    
    var lines=[]
    for(let i = 0; i < tectonicplates.length; i++) {
        let tectonic = tectonicplates[i];
        let coord = tectonic.geometry.coordinates;
            invcoord=[]
            //inverting plate coordinates
            for (let i = 0; i < coord.length; i++){
                let inv = coord[i]
                let p = [inv[1], inv[0]]
                invcoord.push(p)
            }
        let plates = invcoord
        //adding inverted coordinates to form a line
        let line= L.polyline(plates, {
                color: "#FFA500",
                weight: 3
            });
            lines.push(line);
        }

 
    //COLOR CONDITIONAL FOR CIRCLES
    function chooseColor(depth) {
        switch (true) {
        case depth > 90:
            return "red";
        case depth > 70:
            return "darkorange";
        case depth > 50:
            return "gold";
        case depth > 30:
            return "yellow";
        case depth > 10:
            return "darkgreen";
        default:
            return "lightgreen";
        }
    }


    //MAKE LAYERS
    var circleLayer = L.layerGroup(circles);
    var tectonicLayer = L.layerGroup(lines)

    // BASEMAP OBJECTS.
    var baseMaps = {
        "Satellite": satellite_layer,
        "Street": street_layer,
        "Light": light_layer,
        "Dark": dark_layer
        
        
    };

    // OVERLAY TO BE TOGGLED ON OR OFF
    var overlayMaps = {
        Markers: earthquakeLayer,
        Earthquakes: circleLayer,
        TectonicPlates: tectonicLayer
    };


    // ADD DEFAULT LAYERS INTO THE MAP.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [satellite_layer, circleLayer, tectonicLayer]
    });

    //PUSHING OVERLAY AND BASEMAPS TO MAP
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    //ADDING LEGEND
    var legend = L.control({ position: "bottomright" });

        legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        depth_Levels = [-10, 10, 30, 50, 70, 90];

        div.innerHTML += "<h3>Depth Levels</h3>"

        for (var i = 0; i < depth_Levels .length; i++) {
            div.innerHTML +=
                '<i style="background: ' + chooseColor(depth_Levels [i] + 1) + '"></i> ' +
                depth_Levels [i] + (depth_Levels [i + 1] ? '&ndash;' + depth_Levels[i + 1] + '<br>' : '+');
            
        }
        return div;
        
        };

    // ADD LEGEND TO MAP
    legend.addTo(myMap);


}