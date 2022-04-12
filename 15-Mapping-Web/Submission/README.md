
# Visualizing Data with Leaflet: Earthquakes


The goal for this project was to build a dashboard that updates to the current day  earthquake information from the earthquake.usgs.gov feed.
I used GeoJSON formated data from the site, and maps from openstreetmap.org
 to create the visualization. I used Ajax to read in the data, and leaflet to visually display the points where earthquakes occured. I also added tectonic plate information to see the relationship between
the earthquakes and tectonic plates. 

In the webpage you can filter to your perfered map view (toggle between satellite, light, dark, or street view). You can also toggle between showing 
markers or circles for the earthquakes, and turn tectonic plate lines on/off. 

Circle size is determined by the magnitude of the earthquake. Circle color 
is determined based on the depth of the earthquake, as shown in the map's legend. 
### Websites used

 - [USGS Earthquakes](earthquake.usgs.gov)
 - [GeoJSON for today's earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)
 - [Tectonic Plates](https://github.com/fraxen/tectonicplates/tree/master/GeoJSON)


### Screenshot of webpage

![App Screenshot](https://raw.githubusercontent.com/YarelyVargas/SMU-Data-12-2021-Homework/main/15-Mapping-Web/Submission/Image/EARTHQUAKE%20VIZ.png)

