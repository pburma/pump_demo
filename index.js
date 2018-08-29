google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawPie);
google.charts.setOnLoadCallback(drawColumn);
google.charts.setOnLoadCallback(drawBar);

function drawPie() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Mushrooms", 3],
    ["Onions", 1],
    ["Olives", 1],
    ["Zucchini", 1],
    ["Pepperoni", 2]
  ]);

  // Set chart options
  var options = {
    title: "How Much Pizza I Ate Last Night",
    width: 400,
    height: 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

function drawColumn() {
  var data = google.visualization.arrayToDataTable([
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"],
    ["Silver", 10.49, "silver"],
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"]
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation"
    },
    2
  ]);

  var options = {
    title: "Density of Precious Metals, in g/cm^3",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" }
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values")
  );
  chart.draw(view, options);
}

function drawBar() {
  var data = google.visualization.arrayToDataTable([
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"],
    ["Silver", 10.49, "silver"],
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"]
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation"
    },
    2
  ]);

  var options = {
    title: "Density of Precious Metals, in g/cm^3",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" }
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("barchart_values")
  );
  chart.draw(view, options);
}
