google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "PumpID");
  data.addColumn("number", "RPMs");
  data.addColumn("number", "Temp");

  var rows = [];
  var obj ={};
  obj.resource = "pumps";

  var options = {
    alternatingRowStyle:true,
    page:"enable",
    pageSize: 15,
    pagingButtons:"auto",
    height: "50%",
    width: "100%",
    sortColumn: 0
  }


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
      $(val).each(function(index, item) {
      var newrow = [item.pumpId, item.rpms, item.temp];
      rows.push(newrow);
    });
      data.addRows(rows);
      console.log("Rows: " + JSON.stringify(rows));
      var table = new google.visualization.Table(
        document.getElementById("table_div")
      );
      table.draw(data, options);
      google.visualization.events.addListener(table, 'select', function() {
        var index = table.getSelection();
        var sid = data.getValue(index[0].row, 0);
        var stemp = data.getValue(index[0].row, 1);
        var srpms = data.getValue(index[0].row, 2);
        alert("Click detected on row: " + sid + " " + stemp + " " + srpms);

      });


    },
    error : function(xhr, status, error) {
      console.log(JSON.stringify(error));
    }
  });
}
