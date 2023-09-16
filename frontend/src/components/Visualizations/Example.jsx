import React, { Component } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  ScatterChart,
  Tooltip,
  Scatter,
  XAxis,
  YAxis
} from 'recharts';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const apiUrl = new URL(process.env.BACKEND_BASE_URL)
    apiUrl.pathname = '/api/v1/visualize'


    axios.get(apiUrl)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data[0]} />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default Example;
