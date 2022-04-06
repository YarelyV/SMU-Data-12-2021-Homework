$(document).ready(function() {
    doWork();
    console.log("Page Loaded");
    $("#selDataset").on("change", function() {
        doWork();
    })

});
//use ajax to call on data
function doWork(){
    var url = 'static/data/samples.json';
    requestAjax(url);
}
function requestAjax(url){
    $.ajax({
        type: "get",
        url:url,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            createDropdown(data);
            createMetadata(data);
            createBarChart(data);
            createBubbleChart(data);
            createGaugeChart(data);
        },
        error: function(textStatus, errorMess) {
            console.log("no data")
            console.log(textStatus);
            console.log(errorMess)
        }
    })
}
//creating drop down with loop
function createDropdown(data) {
    var names = data.names;
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html = `<option> ${name}</option>`;
        $("#selDataset").append(html);
    }
}

//getting data from metadata
function createMetadata(data) {
    let id = $("#selDataset").val();
    let info = data.metadata.filter(x => x.id == id)[0];
    console.log(info);
    $("#sample-metadata").empty();
    Object.entries(info).map(function(x) {
        let mhtml = `<h5>${x[0]}: ${x[1]}</h5>`;
        $("#sample-metadata").append(mhtml);
    });       
}

//making bar graph
function createBarChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        type: 'bar',
        x: sample.sample_values.slice(0, 10).reverse(),
        y: sample.otu_ids.map(x => `OTU ${x}`).slice(0, 10).reverse(),
        text: sample.otu_labels.slice(0, 10).reverse(),
        orientation: 'h',
        marker: {
            color: 'firebrick'
        }
    }

    var data1 = [trace1];
    var layout = {
        "title": "Top 10 OTU ",
        xaxis: {
            title: {
              text: 'Sample Value',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            },
          },
          yaxis: {
            title: {
              text: 'OTU ID',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            }
          }
     
    }

    Plotly.newPlot('bar', data1, layout);
}

//making bubble graph
function createBubbleChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels.slice(0, 10).reverse(),
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'YlOrRd'
        }
    }

    var data1 = [trace1];
    var layout = {
        "title": "Belly Button Samples",
        xaxis: {
            title: {
              text: 'OTU ID',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Sample Value',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            }
          }
    }

    Plotly.newPlot('bubble', data1, layout);
} 
//Making gaugeChart

function createGaugeChart(data) {
    let id = $("#selDataset").val();
    let info = data.metadata.filter(x => x.id == id)[0];
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: info.wfreq,
          title: { text: "Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            bar: { color: 'white'},
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 3], color: "orange" },
              { range: [3, 6], color: "lightcoral" },
              { range: [6, 9], color: "firebrick" },

            ],
            threshold: {
              line: { color: "red", width: 4 },
              value: 9
            }
          }
        }
      ];
      var layout = { width: 450, height: 400, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}