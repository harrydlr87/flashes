import React, { Component } from 'react';
import getJson from "../../common/http/methods/get";

function parseCoords(data) {
  const coordsList = data.split(/\r?\n/g);
  return coordsList.reduce((acc, coords) => {
    const [x, y] = coords.split(' ');
    acc.x.push(parseFloat(x));
    acc.y.push(parseFloat(y));
    acc.colors.push('navy');
    acc.radius.push(Math.random() * 0.4 + 5.7);

    return acc;
  }, {x: [], y: [], colors: [], radius: []});
}

class Plot extends Component {
  state = {
    source: null,
    data: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const source = await getJson(`/sources/${id}`);

    const data = {
      lightCurves: parseCoords(source.data.lightCurves),
      bayesianBlocks: null,
      HIDDiagram: null,
    };

    this.setState({ source });

    this.renderPlot(data.lightCurves);
  }

  renderPlot(data) {
    const { source } = this.state;
    const Bokeh = window.Bokeh;
    const plt = Bokeh.Plotting;

    // create a data source
    const sourceData = new Bokeh.ColumnDataSource({ data });

    // make the plot and add some tools
    const tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save";
    const p = plt.figure({ title: source.source, tools: tools });

    // call the circle glyph method to add some circle glyphs
    p.circle({ field: "x" }, { field: "y" }, {
      source: sourceData,
      radius: data.radius,
      fill_color: data.colors,
      fill_alpha: 0.6,
      line_color: null
    });

    // show the plot
    plt.show(p, document.querySelector('#plot'));
  }

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

    return (
      <section className="container">
        <div id="plot" />
      </section>

    );
  }
}

export default Plot;
