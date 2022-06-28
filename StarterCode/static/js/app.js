const url = "samples.json";
const sample_data = d3.json(url);
var data_Set;

// 1. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. dataSet

sample_data.then(function (data) {
    var dropdownSelect = document.getElementById("selDataset");
    var listOfNames = data.names;
    var firstItem = listOfNames[0];
    buildBarChart(firstItem, data);
    console.log(data_Set);
});

function buildBarChart(itemid, data) {
    if (data === undefined)
        data = data_Set;
    var samples = data.samples;
    var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
    var result = sampleFilter[0];
    var dataBar = [
        {
          x: result.sample_values.slice(0, 10).reverse(),
          y: result.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse(),
          type: 'bar',
          orientation: "h",
          text: result.otu_labels.slice(0, 10).reverse()
        }
      ]; 
    Plotly.newPlot("bar", dataBar);  
}

// 3. Create a bubble chart that displays each sample.

sample_data.then(function (data) {
  var dropdownSelect = document.getElementById("selDataset");
  var listOfNames = data.names;
  var firstItem = listOfNames[0];
  buildBubbleChart(firstItem, data);
  console.log(data_Set);
});

function buildBubbleChart(itemid, data) {
  if (data === undefined)
      data = data_Set;
  var samples = data.samples;
  var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
  var result = sampleFilter[0];
  var OTUids = result.otu_ids;
  var OTUlbls = result.otu_labels;
  var OTUsample = result.sample_values;
 
  var layoutBubble = { title: "Belly Button Biodiversity", xaxis: { title: "OTU ID" }, };
  var dataBubble = [{ x: OTUids, y: OTUsample, text: OTUlbls, mode: "markers", marker: { size: OTUsample, color: OTUids, colorscale: "Earth" } }];
  Plotly.newPlot("bubble", dataBubble, layoutBubble);
}

// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

sample_data.then(function (data) {
  var dropdownSelect = document.getElementById("selDataset");
  var listOfNames = data.names;
  for (var i = 0; i < listOfNames.length; i++) {
      var name = listOfNames[i];
      var optElem = document.createElement("option");
      optElem.textContent = name;
      optElem.value = name;
      dropdownSelect.appendChild(optElem); 
      // console.log(data_Set);  
  }
});

sample_data.then(function (data) {
  data_Set = data;
  var dropdownSelect = document.getElementById("selDataset");
  var listOfNames = data.names;
  var firstItem = listOfNames[0];
  buildMetaData(firstItem);
  console.log(data_Set);
});

function buildMetaData(itemid, data) {
  if (data === undefined)
      data = data_Set;

  var samples = data.metadata;
  var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
  var result = sampleFilter[0];
  var metadatapanel = d3.select("#sample-metadata");
  metadatapanel.html("");
  metadatapanel.append("h6").text("id: " +itemid);
  metadatapanel.append("h6").text("ethnicity: " +result.ethnicity);
  metadatapanel.append("h6").text("gender: " +result.gender);
  metadatapanel.append("h6").text("age: " +result.age);
  metadatapanel.append("h6").text("location: "  +result.location);
  metadatapanel.append("h6").text("bbtype: " +result.bbtype);
  metadatapanel.append("h6").text("wfreq: " +result.wfreq);
  console.log(result);
}

sample_data.then(function (data) {
  data_Set = data;
  var dropdownSelect = document.getElementById("selDataset");
  var listOfNames = data.names;
  var firstItem = listOfNames[0];
  buildMetaData(firstItem);
  console.log(data_Set);});

function optionChanged(item) {
  buildBarChart(item);
  buildBubbleChart(item);
  buildMetaData(item);
}
