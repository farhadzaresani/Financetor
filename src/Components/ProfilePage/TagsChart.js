import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    console.log(props.tag);
    const labels = props.tag.map((tg) => {
      return tg.name;
    });

    const series = props.tag.map((tag, i) => {
      return i + 50;
    });

    this.state = {
      series: series,
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },

        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "TAGS",
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return;
                },
              },
            },
          },
        },
        labels: labels,
      },
    };
  }

  render() {
    return (
      <div id="chart" className="bg-white rounded-lg w-[77vw] mb-5">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={350}
        />
      </div>
    );
  }
}
