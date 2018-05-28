function optionChanged(value) {
    sampleMetaData(value);
    pieChart(value);
    bubbleChart(value);

}

function sampleMetadata(value) {
    url = "/metadata/";

    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        $mdText = Plotly.d3.select('.md-text');
    
        $mdText.html('');

        Object.keys(data).forEach((key) => {
            $mdText
            .append('text')
                .html(key + ":" + data[key])
            .append('br')
            .append('br')
            .append('br')
            .append('br');

        });

    });
}

function pieChart(value){
    // pie chart data
    url = "/samples/";
    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        Plotly.d3.json('/otu', (error2,data2) => {
          if (error2) return console.warn(error2);

          var labelIndex = data.otu_ids.slice(0,10);

          var trace1 = {
            values: data.sample_values.slice(0,10),
            labels: data.otu_ids.slice(0,10),
            marker: {colors: ['rgba(63, 127, 191, 1)', 'rgba(63, 176, 191, 1)', 'rgba(176, 191, 63, 1)', 'rgba(137, 140, 114, 1)', 'rgba(241, 85, 230, 1)', 'rgba(113, 52, 9, 1)', 'rgba(109, 55, 127, 1)', 'rgba(230, 9, 20, 1)', 'rgba(57, 177, 111, 1)', 'rgba(242, 106, 22, 1)']},
            type: 'pie',
            text: labelIndex.map( x => data2[x]),
            textinfo: 'percent',
            hoverinfo: 'label+text+value'
          };

          var plotData = [trace1];

          var layout = {
            title: value + "'s Top 10 OTU Microbiomes"
          };

          return Plotly.newPlot("pie", plotData, layout);
        });
    });
}


function bubbleChart(value){
    // bubble chart data
    url = "/samples/";
    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        Plotly.d3.json("/otu", (error2, data2) => {
          if (error2) return console.warn(error2);

          var trace1 = {
              x: data.otu_ids,
              y: data.sample_values,
              text: data2,
              hoverinfo: "x+y+text",
              mode: "markers",
              marker: {
                  size: data.sample_values,
                  color: data.otu_ids
              }
          };

          var plotData = [trace1]

          var layout = {
              title: value  + "'s Sample Value vs Operational Taxonimical Unit's (OTU) ID",
              showLegend: false
          }

          return Plotly.newPlot("bubble", plotData, layout)
        });
    });
}