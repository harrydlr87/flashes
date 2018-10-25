import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, Line } from 'recharts';
import getJson from "../../common/http/methods/get";

const domain = ['auto', 'auto'];

const getAxisYDomain = (data, from, to, ref, offset) => {
  const refData = data.slice(from-1, to);
  let [ bottom, top ] = [ refData[0][ref], refData[0][ref] ];
  refData.forEach( d => {
    if ( d[ref] > top ) top = d[ref];
    if ( d[ref] < bottom ) bottom = d[ref];
  });

  return [ (bottom|0) - offset, (top|0) + offset ]
};

const CustomizedShape = (props) => {
  const { cx, cy } = props;
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
  }).slice(0, 10);
}

class Plot extends React.Component {
  state = {
    source: {},
    left : 'dataMin',
    right : 'dataMax',
    refAreaLeft : '',
    refAreaRight : '',
    top : 'dataMax+1',
    bottom : 'dataMin-1',
    top2 : 'dataMax+20',
    bottom2 : 'dataMin-20',
    animation : true
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

  zoom(){
    let { refAreaLeft, refAreaRight, data } = this.state;

    if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
      this.setState( () => ({
        refAreaLeft : '',
        refAreaRight : ''
      }) );
      return;
    }

    // xAxis domain
    if ( refAreaLeft > refAreaRight )
      [ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];

    // yAxis domain
    const [ bottom, top ] = getAxisYDomain(data, refAreaLeft, refAreaRight, 'x', 1);
    const [ bottom2, top2 ] = getAxisYDomain(data, refAreaLeft, refAreaRight, 'y', 50);

    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
      data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, top, bottom2, top2
    } ) );
  };

  render() {
    const { source } = this.state.source;

    if(source) {
      const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;
      const { lightCurves } = this.state.data;

      return (
        <section className="plot">
          { lightCurves && lightCurves.length > 0 &&
          <div>
            <h2>{source}</h2>
            <h4>Light Curves</h4>
            <ScatterChart
              width={800}
              height={400}
              margin={{top: 20, right: 20, bottom: 20, left: 20}}
              onMouseDown={(e) => this.setState({ refAreaLeft:e.activeLabel })}
              onMouseMove = { (e) => this.state.refAreaLeft && this.setState({ refAreaRight:e.activeLabel }) }
              onMouseUp = { this.zoom.bind( this )}
            >
              <CartesianGrid />
              <XAxis
                allowDataOverflow={true}
                dataKey={'x'}
                type="number"
                name='days'
                unit='days'
                domain={[left, right]}
                yAxisId="2"
              />
              <YAxis
                allowDataOverflow={true}
                dataKey={'y'}
                type="number"
                name='Flux (keV)'
                unit='keV'
                domain={[bottom2, top2]}
                yAxisId="1"
              />
              <Scatter name='A school' data={lightCurves} fill='#8884d8' shape={<CustomizedShape />} />
              <Tooltip cursor={{strokeDasharray: '1 1'}}/>

              <Line yAxisId="1" type='natural' dataKey='x' stroke='#8884d8' animationDuration={300}/>
              <Line yAxisId="2" type='natural' dataKey='y' stroke='#82ca9d' animationDuration={300}/>

              {
                (refAreaLeft && refAreaRight) ? (
                  <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null
              }
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
