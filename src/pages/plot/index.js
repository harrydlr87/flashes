import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Dot } from 'recharts';
import getJson from "../../common/http/methods/get";

const domain = ['auto', 'auto'];

const CustomizedShape = (props) => {
  const {cx, cy, fill, riderName} = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r="2" fill="grey" />
    </g>
  );
};

function parseCoords(data) {
  const coordsList = data.split(/\r?\n/g);
  return coordsList.map((coords) => {
    const [x, y] = coords.split(' ');
    return { x: parseFloat(x), y: parseFloat(y), z: 200 };
  });
}

class Plot extends React.Component {
  state = {
    source: {},
  };

  async componentWillMount() {
    const { id } = this.props.match.params;
    const source = await getJson(`/sources/${id}`);

    const data = {
      lightCurves: parseCoords(source.data.lightCurves),
      bayesianBlocks: null,
      HIDDiagram: null,
    };

    this.setState({ source, data });
  }

  render() {
    const { source } = this.state.source;

    if(source) {
      const { lightCurves, bayesianBlocks, HIDDiagram } = this.state.data;

      return (
        <section className="plot">
          { lightCurves && lightCurves.length > 0 &&
          <div>
            <h2>{source}</h2>
            <h4>Light Curves</h4>
            <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid />
              <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
              <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
              <Scatter name='A school' data={lightCurves} fill='#8884d8' shape={<CustomizedShape />} />
              <Tooltip cursor={{strokeDasharray: '1 1'}}/>
            </ScatterChart>
          </div>
          }
          { bayesianBlocks && bayesianBlocks.length > 0 &&
          <div>
            <h2>{source}</h2>
            <h4>Bayesian Blocks</h4>
            <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid />
              <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
              <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
              <Scatter name='A school' data={bayesianBlocks} fill='#8884d8'/>
              <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
          </div>
          }
          { HIDDiagram && HIDDiagram.length > 0 &&
          <div>
            <h2>{source}</h2>
            <h4>HID Diagram</h4>
            <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid />
              <XAxis dataKey={'x'} type="number" name='days' unit='days' domain={domain} />
              <YAxis dataKey={'y'} type="number" name='Flux (keV)' unit='keV' domain={domain} />
              <Scatter name='A school' data={HIDDiagram} fill='#8884d8'/>
              <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
          </div>
          }
        </section>
      );
    }

    return null;
  }
}

export default Plot;
