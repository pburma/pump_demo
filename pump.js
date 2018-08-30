google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var dataTemp = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temp', 0],
  ]);

  var dataRpms = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['RPMs', 0],
  ]);

  var optionsTemp = {
    width: 400, height: 120,
    max:350, min:0,
    redFrom: 250, redTo: 350,
    yellowFrom:200, yellowTo: 249,
    greenFrom:0, greenTo:100,
    minorTicks: 5
  };

  var optionsRpms = {
    width: 400, height: 120,
    max:5000, min:0,
    redFrom: 4000, redTo: 5000,
    yellowFrom:3000, yellowTo: 4999,
    greenFrom:0, greenTo:2000,
    minorTicks: 5
  };

  var chartTemp = new google.visualization.Gauge(document.getElementById('chart_temp'));
  var chartRpms = new google.visualization.Gauge(document.getElementById('chart_rpms'));

  chartTemp.draw(dataTemp, optionsTemp);
  chartRpms.draw(dataRpms, optionsRpms);

  setInterval(function() {
    var name = "pumps";
    var temp = 0;
    var rpms = 0;
    var obj ={};
    obj.resource = name;
    obj.where = {"pumpId":"pump1"};
      console.log("Running Select Query");
        $.ajax({
        type : 'POST',
        //url is the location where your node server is running, default is shown
        url: 'http://127.0.0.1:8080/select',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success : function(val)
        {
          console.log(JSON.stringify(val));
          var json = val;
          //$(json).each(function(index, item) {
          //  temp = item.temp;
        //});
        temp = val[0].temp;
        rpms = val[0].rpms;
        dataTemp.setValue(0, 1, temp);
        dataRpms.setValue(0, 1, rpms);
        chartTemp.draw(dataTemp, optionsTemp);
        chartRpms.draw(dataRpms, optionsRpms);

        console.log("Temp: " + temp);
        },
        error : function(xhr, status, error) {
          console.log(JSON.stringify(error));
        }
      });

    //data.setValue(temp);
    //chart.draw(data, options);
  }, 5000);
}
