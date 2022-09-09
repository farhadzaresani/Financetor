import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class Chart extends Component {
  constructor(props) {
    super(props);

    const amount = props.expenses.map((item) => {
      return item.amount;
    });
    const date = props.expenses.map((item) => {
      return item.date;
    });
    console.log(date);

    this.state = {
      series: [
        {
          data: amount,
        },
      ],
      options: {
        chart: {
          height: 350,

          type: "bar",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        grid: {
          row: {
            colors: ["transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: date,
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="bg-white rounded-lg w-[77vw] mb-5">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
