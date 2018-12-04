import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJson } from '../../http';
import Table from '../table';
import Filter from '../filter';
import { subscribeToSource, unSubscribeFromSource } from '../../../application/store/actions';

const PlotLink = ({ id }) => <NavLink className="plot-icon" exact to={`/plot/${id}`}><FontAwesomeIcon icon="chart-bar" /></NavLink>;
const Subscribe = ({ onClick }) => <span onClick={onClick}><FontAwesomeIcon icon="rss" /></span>;
const UnSubscribe = ({ onClick }) => <span onClick={onClick}><FontAwesomeIcon icon="times" /></span>;

const isSubscribedToSource = (subscribedSources, source) => subscribedSources.includes(source._id);

class Sources extends Component {
  state = {
    missions: [],
    sourcesData: {},
    activeFilters: {},
    sources: this.props.sources,
  };

  parseSources({ docs = [] }, sources) {
    const {
      subscribeToSource,
      unSubscribeFromSource,
      subscribedSources,
    } = this.props;

    return docs.filter(source => sources ? sources.includes(source._id) : true).map(source => ({
      ...source,
      plotIcon: <PlotLink id={source._id} />,
      actions: subscribedSources && isSubscribedToSource(subscribedSources, source)
        ? <UnSubscribe onClick={() => unSubscribeFromSource(source._id)} />
        : <Subscribe onClick={() => subscribeToSource(source._id)} />
    }));
  }

  async getTableData(additionalData = {}) {
    const { sources, activeFilters, pagination } = this.state;
    const shouldRenderSources = !sources || (sources && sources.length);
    const missions = await getJson('/missions');
    const sourcesData = shouldRenderSources ? await getJson('/sources', { ...activeFilters, sources, ...pagination, ...additionalData }) : [];

    return { missions, sourcesData };
  }

  async componentWillMount() {
    const { missions, sourcesData } = await this.getTableData();
    this.setState({ missions, sourcesData });
  }

  async componentWillReceiveProps({ sources }) {
    const { missions, sourcesData } = await this.getTableData({ sources });
    this.setState({ missions, sourcesData });
  }

  async onPageChange({ page, pageSize }) {
    const params = { page: page + 1, limit: pageSize };
    const { sourcesData } = await this.getTableData(params);
    this.setState({ sourcesData, pagination: params });
  }

  async onFilter({ type, name, mission }) {
    const activeFilters = { type, name, mission, sources: this.state.sources };
    const { sourcesData } = await this.getTableData(activeFilters);

    this.setState({
      sourcesData,
      activeFilters,
    });
  }

  render() {
    const { pages } = this.state.sourcesData;
    const items = this.parseSources(this.state.sourcesData, this.props.sources);

    return (
      <section className="sources">
        <Filter onFilter={(filters) => this.onFilter(filters)} />
        <Table
          className="table"
          data={items}
          pages={pages}
          onPageChang={(state) => this.onPageChange(state)}
        />
      </section>
    );
  }
}

const enhance = connect(null, { subscribeToSource, unSubscribeFromSource });

export default enhance(Sources);
