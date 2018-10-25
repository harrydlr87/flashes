import React from 'react';
import { Scatter, ScatterChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

const data = [
  {x: 100, y: 200, z: 200},
  {x: 120, y: 100, z: 260},
  {x: 170, y: 300, z: 400},
  {x: 180, y: 250, z: 280},
  {x: 150, y: 400, z: 500},
  {x: 110, y: 280, z: 200},
];

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from-1, to);
  let [ bottom, top ] = [ refData[0][ref], refData[0][ref] ];
  refData.forEach( d => {
    if ( d[ref] > top ) top = d[ref];
    if ( d[ref] < bottom ) bottom = d[ref];
  });

  return [ (bottom|0) - offset, (top|0) + offset ]
};

const initialState = {
  data,
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

class StreamingDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
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
    const [ bottom, top ] = getAxisYDomain( refAreaLeft, refAreaRight, 'y', 1 );
    const [ bottom2, top2 ] = getAxisYDomain( refAreaLeft, refAreaRight, 'z', 50 );

    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
      data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, top, bottom2, top2
    } ) );
  };

  zoomOut() {
    const { data } = this.state;
    this.setState( () => ({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : '',
      left : 'dataMin',
      right : 'dataMax',
      top : 'dataMax+1',
      bottom : 'dataMin',
      top2 : 'dataMax+50',
      bottom: 'dataMin+50'
    }) );
  }

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

    return (
      <div className="highlight-bar-charts">
        <a
          href="javascript: void(0);"
          className="btn update"
          onClick={this.zoomOut.bind( this )}
        >
          Zoom Out
        </a>


        <p>Highlight / Zoom - able Line Chart</p>
        <ScatterChart
          width={800}
          height={400}
          data={data}

        >
          <Scatter name='A school' data={data} fill='#8884d8' />
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            name="days"
            allowDataOverflow={true}
            dataKey="x"
            domain={['auto', 'auto']}
            type="number"
          />
          <YAxis
            name={"kv"}
            dataKey="y"
            allowDataOverflow={true}
            domain={['auto', 'auto']}
            type="number"
            yAxisId="1"
          />
          <Tooltip/>
          <Line yAxisId="1" type='natural' dataKey='y' stroke='#8884d8' animationDuration={300}/>

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null

          }

        </ScatterChart>

      </div>
    );
  }
}

export default StreamingDemo;
