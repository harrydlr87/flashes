import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import getJson from "../../common/http/methods/get";

const domain = ['dataMin', 'dataMax'];

class Plot extends React.Component {
  state = {
    source: {},
  };

  async componentWillMount() {
    const { id } = this.props.match.params;
    const source = await getJson(`/sources/${id}`);
    this.setState({ source });
  }

  render() {
    const { data, source } = this.state.source;

    return (
      <section className="plot">
        { data && data.lightCurves && data.lightCurves.length > 0 &&
          <div>
            <h2>{source}</h2>
            <h4>Light Curves</h4>
            <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid />
              <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
              <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
              <Scatter name='A school' data={data.lightCurves} fill='#8884d8'/>
              <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
          </div>
        }
        { data && data.bayesianBlocks && data.bayesianBlocks.length > 0 &&
        <div>
          <h2>{source}</h2>
          <h4>Bayesian Blocks</h4>
          <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid />
            <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
            <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
            <Scatter name='A school' data={data.bayesianBlocks} fill='#8884d8'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          </ScatterChart>
        </div>
        }
        { data && data.HIDDiagram && data.HIDDiagram.length > 0 &&
        <div>
          <h2>{source}</h2>
          <h4>HID Diagram</h4>
          <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid />
            <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
            <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
            <Scatter name='A school' data={data.HIDDiagram} fill='#8884d8'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          </ScatterChart>
        </div>
        }
      </section>
    );
  }
}

export default Plot;
