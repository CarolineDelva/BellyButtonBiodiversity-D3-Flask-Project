

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then((metadata) => {
    var sample_metadata = d3.select('#sample-metadata')
    console.log("metadata", metadata)

    sample_metadata.html("")

    Object.entries(metadata).forEach(([key, value]) => {
      console.log("key, value", key, value)

      sample_metadata.append("h6").text(`${key}: ${value}`);
      if (`${key}` == "WFREQ") {
          window.WFREQVAR = `${value}`;
      }
    });


  });
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    // console.log("data", data)

    const otu_ids = data.otu_ids;
    // console.log("otu_ids", otu_ids)
    const sample_values = data.sample_values;
    console.log("sample_values", sample_values)
    const otu_labels = data.otu_labels;
    console.log("otu_labels", otu_labels)        
     

    // // @TODO: Build a Bubble Chart using the sample data
    var layoutbubble = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: 'OTU ID' }
    };

    var databubble = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.newPlot("bubble", databubble, layoutbubble)


  // Build a pie chart 

  var datapie = [
     {
      values: sample_values.slice(0, 10),
      labels: otu_ids.slice(0, 10),
      hovertext: otu_labels.slice(0, 10),
      hoverinfor: "hovertext",
      type: "pie"
    }
  ];
  var layoutpie = {
    margin: { t: 0, l: 0 }
  };

  Plotly.plot("pie", datapie, layoutpie);   

  // gauge plot

  var level = window.WFREQVAR;

  // Trig to calc meter point
  var degrees = 9 - level,
      radius = .55;
  var radians = degrees * Math.PI / 9;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var datagauge = [{ type: 'scatter',
    x: [0], y:[0],
      marker: { size: 8, color: 'rgb(214, 39, 40)' },
      showlegend: false, 
      name: "Freq",
      hoverinfo: "text+name"},
    { values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
              '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {
          colors: [
              "rgba(0, 105, 11, .5)",
              "rgba(10, 120, 22, .5)",
              "rgba(14, 127, 0, .5)",
              "rgba(110, 154, 22, .5)",
              "rgba(170, 202, 42, .5)",
              "rgba(202, 209, 95, .5)",
              "rgba(210, 206, 145, .5)",
              "rgba(232, 226, 202, .5)",
              "rgba(240, 230, 215, .5)",
              "rgba(255, 255, 255, 0)"
          ]        
      },
    labels: ['8-9', '7-8', '6-7', '5-6',
              '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layoutgauge = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: {text: "<b>Belly Button Washing Frequency</b><br> Scrubs per Week"},
    width: 500, 
    height: 500,
    xaxis:{
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
      },
      yaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
      }
  };

  Plotly.newPlot(gauge, datagauge, layoutgauge);
  });
}



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log("sampleNames", sampleNames)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);

    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log("firstSample", firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
};

// Initialize the dashboard
init();
