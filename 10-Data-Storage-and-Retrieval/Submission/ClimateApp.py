import numpy as np
import pandas as pd
from flask import Flask, jsonify
#class for easier connection to database
from sqlhelper import SQLHelper

app = Flask(__name__)

sql = SQLHelper()


# Flask Routes

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f""" 
        <ul>
            <li><a href='/api/v1.0/precipitation'>/api/v1.0/precipitation - Show dictionary of dates & prcp </a></li>
       
            <li><a href='/api/v1.0/stations'>/api/v1.0/stations - show list of available stations</a></li>
       
            <li><a href='/api/v1.0/tobs'>/api/v1.0/tobs - show dates and temperature observations for most active station last year</a></li>

            <li><a href='/api/v1.0/2016-08-23'>/api/v1.0/2016-08-23 - pulls temp stats for all dates greater than and equal to start Date</a></li>

            <li><a href='/api/v1.0/2016-08-23/2017-11-09'>/api/v1.0/2016-08-23/2017-11-09 - pulls temp stats for dates between the start and end date</a></li>
        
        </ul
        """
    )
#Convert the query results to a dictionary using date as the key and prcp as the value
@app.route("/api/v1.0/precipitation")
def getPrep():
    query = """
        SELECT
            date,
            station,
            prcp
        FROM
            measurement
        ORDER BY
            date asc,
            station asc;
        """
    p_data = sql.executeQuery(query)
    return(jsonify(p_data))

#Return a JSON list of stations from the dataset.
@app.route("/api/v1.0/stations")
def station():

    query = """
        SELECT
            id,
            station
        FROM
            station;
        """
    s_data = sql.executeQuery(query)
    return(jsonify(s_data)) 
    
#Query the dates and temperature observations of the most active station for the last year of data.
@app.route("/api/v1.0/tobs")
def temps():

    query = """
        SELECT
        station,
          date,
          tobs
        FROM
            measurement
        where
            date >= '2016-08-23'
        and station = 'USC00519281'
        order by
            date asc
        """
    t_data = sql.executeQuery(query)
    return(jsonify(t_data)) 

#When given the start only, calculate TMIN, TAVG, and TMAX for all dates 
# greater than and equal to the start date.
@app.route("/api/v1.0/<start>")
def startDate(start):

    query = f"""
        SELECT
            min(tobs) as LowestTemp,
            max(tobs) as HighestTemp,
            avg(tobs) as AvgTemp
        FROM
            measurement
        WHERE
           date >= '{start}' ;
        """
    sd_data = sql.executeQuery(query)
    return(jsonify(sd_data)) 

#When given the start and the end date, calculate the TMIN, TAVG,
# and TMAX for dates between the start and end date inclusive.
@app.route("/api/v1.0/<start>/<end>")
def startEndDate(start,end):

    query = f"""
        SELECT
            min(tobs) as tmin,
            max(tobs) as tmax,
            avg(tobs) as tavg
        FROM
            measurement
        WHERE
           date >= '{start}' and 
           date <= '{end}' ;
        """
    sed_data = sql.executeQuery(query)
    return(jsonify(sed_data)) 

if __name__ == '__main__':
    app.run(debug=True)

     