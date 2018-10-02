import React, { Component } from 'react';
import './filter.css';
import getJson from "../../http/methods/get";

class Filter extends Component {
  state = {
    type: null,
    name: null,
    mission: null,
    typeOptions: null,
    missionOptions: null,
  };

  async componentWillMount() {
    const typeOptions = await getJson('/sources/field/src_type');
    const missionOptions = await getJson('/sources/field/tool_name');

    this.setState({ typeOptions, missionOptions });
  }

  onFilter = (name) => ({ target }) => {
    const newFilters = { ...this.state, [name]: target.value };
    this.setState(newFilters);
    return this.props.onFilter(newFilters);
  };

  render() {
    const { typeOptions, missionOptions } = this.state;

    return (
      <div className="filter">
        <section className="input-container">
          <div>
            <input type="text" placeholder="Source name" onChange={this.onFilter('name')} />
          </div>
          {missionOptions && (
            <div>
              <select name="mission" onChange={this.onFilter('mission')}>
                <option value="" selected>All missions</option>
                { missionOptions.map((mission) => <option value={mission}>{mission}</option>)}
              </select>
            </div>
          )}

          {typeOptions && (
            <div>
              <select name="type" onChange={this.onFilter('type')}>
                <option value="" selected>All types</option>
                { typeOptions.map((type) => <option value={type}>{type}</option>)}
              </select>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Filter;
