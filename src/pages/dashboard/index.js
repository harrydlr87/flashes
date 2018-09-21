import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJson } from '../../common/http';
import Table from '../../common/components/table';

const PlotLink = ({ id }) => <NavLink exact to={`/plot/${id}`}><FontAwesomeIcon icon="chart-bar" /></NavLink>;

class Dashboard extends Component {
  state = {
    missions: [],
    sources: {},
  };

  async componentWillMount() {
      const missions = await getJson('/missions');
      const sourcesData = await getJson('/sources');

      const sources = sourcesData.docs.map(source => ({ ...source, plotIcon: <PlotLink id={source._id} />}));
      this.setState({ missions, sources: { ...sourcesData, items: sources } });
  }

  async onPageChange({ page, pageSize }) {
    const sourcesData = await getJson(`/sources?page=${page + 1}&limit=${pageSize}`);

      const sources = sourcesData.docs.map(source => ({ ...source, plotIcon: <PlotLink id={source._id} />}));
      this.setState({ sources: { ...sourcesData, items: sources } });
  }

  render() {
    const missions = this.state.missions;
    const { items, pages } = this.state.sources;

    return (
      <section className="dashboard">
        <div>
          Filters
        </div>
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
