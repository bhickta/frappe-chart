const express = require('express');
const { json } = require('express');
const path = require('path');
const frappe = require('frappe-charts');

const PORT = 8080;
const HOST = '0.0.0.0';

const data = {
  labels: [
    "12am-3am", "3am-6am", "6am-9am", "9am-12pm",
    "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"
  ],
  datasets: [
    {
      name: "Some Data",
      type: "bar",
      values: [25, 40, 30, 35, 8, 52, 17, -4]
    },
    {
      name: "Another Set",
      type: "line",
      values: [25, 50, -10, 15, 18, 32, 27, 14]
    }
  ]
};

const app = express();
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chart-data', function(req, res) {
  res.json(data);
});

app.use('/f', express.static(path.join(__dirname, 'node_modules/frappe-charts/dist')));

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
});
