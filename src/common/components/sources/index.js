import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJson } from '../../http';
import Table from '../table';
import Filter from '../filter';
import { subscribeToSource, unSubscribeFromSource } from '../../../application/store/actions';

const PlotLink = ({ id }) => <NavLink exact to={`/plot/${id}`}><FontAwesomeIcon icon="chart-bar" /></NavLink>;
const Subscribe = ({ onClick }) => <span onClick={onClick}><FontAwesomeIcon icon="rss" /></span>;
const UnSubscribe = ({ onClick }) => <span onClick={onClick}><FontAwesomeIcon icon="times" /></span>;

const isSubscribedToSource = (user, source) => user.subscribedSources.includes(source._id);

class Sources extends Component {
  state = {
    missions: [],
    sourcesData: {},
    activeFilters: {
      subscribedSources: this.props.activeFilters && this.props.activeFilters.subscribedSources,
    },
  };

  parseSources({ docs = [] }) {
    const { user, subscribeToSource, unSubscribeFromSource } = this.props;

    return docs.map(source => ({
      ...source,
      plotIcon: <PlotLink id={source._id} />,
      actions: user && isSubscribedToSource(user, source)
        ? <UnSubscribe onClick={() => unSubscribeFromSource(source._id)} />
        : <Subscribe onClick={() => subscribeToSource(source._id)} />
    }));
  }

  async componentWillMount() {
    const activeFilters = this.state.activeFilters;
    const missions = await getJson('/missions');
    const sourcesData = await getJson('/sources', { ...activeFilters });

    this.setState({ missions, sourcesData });
  }

  async onPageChange({ page, pageSize }) {
    const activeFilters = this.state.activeFilters;
    const sourcesData = await getJson('/sources', { page: page + 1, limit: pageSize, ...activeFilters });

    this.setState({ sourcesData });
  }

  async onFilter({ type, name, mission }) {
    const activeFilters = { type, name, mission, subscribedSources: this.state.activeFilters.subscribedSources};
    const sourcesData = await getJson('/sources', activeFilters);

    this.setState({
      sourcesData,
      activeFilters,
    });
  }

  render() {
    const { pages } = this.state.sourcesData;
    const items = this.parseSources(this.state.sourcesData);

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

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps, { subscribeToSource, unSubscribeFromSource });

export default enhance(Sources);
