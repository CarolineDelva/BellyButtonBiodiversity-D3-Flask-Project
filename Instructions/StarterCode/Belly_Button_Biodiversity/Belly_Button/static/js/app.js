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
    // console.log("sample_values", sample_values)
    const otu_labels = data.otu_labels;
    // console.log("otu_labels", otu_labels)


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
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
