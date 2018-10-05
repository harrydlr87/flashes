import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJson } from '../../common/http';
import Table from '../../common/components/table';
import Filter from '../../common/components/filter';

const PlotLink = ({ id }) => <NavLink exact to={`/plot/${id}`}><FontAwesomeIcon icon="chart-bar" /></NavLink>;

class Dashboard extends Component {
  state = {
    missions: [],
    sources: {},
    activeFilters: {},
  };

  static parseSources(sources) {
    return sources.docs.map(source => ({ ...source, plotIcon: <PlotLink id={source._id} />}));
  }

  async componentWillMount() {
    const missions = await getJson('/missions');
    const sourcesData = await getJson('/sources');

    const sources = Dashboard.parseSources(sourcesData);
    this.setState({ missions, sources: { ...sourcesData, items: sources } });
  }

  async onPageChange({ page, pageSize }) {
    const activeFilters = this.state.activeFilters;
    const sourcesData = await getJson('/sources', { page: page + 1, limit: pageSize, ...activeFilters });

    const sources = Dashboard.parseSources(sourcesData);
    this.setState({ sources: { ...sourcesData, items: sources } });
  }

  async onFilter({ type, name, mission }) {
    const activeFilters = { type, name, mission };
    const sourcesData = await getJson('/sources', activeFilters);

    const sources = Dashboard.parseSources(sourcesData);
    this.setState({
      sources: { ...sourcesData, items: sources },
      activeFilters,
    });
  }

  render() {
    const { items, pages } = this.state.sources;

    return (
      <section className="dashboard">
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

export default Dashboard;
