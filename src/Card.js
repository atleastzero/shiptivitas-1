import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status,
    }
  }
  getClasses() {
    let className = ['Card'];
    if (this.state.status === 'backlog') {
      className.push('Card-grey');
    } else if (this.state.status === 'in-progress') {
      className.push('Card-blue');
    } else if (this.state.status === 'complete') {
      className.push('Card-green');
    }
    return className.join(' ')
  }
  render() {
    return (
      <div index={this.props.index} className={this.getClasses()} data-id={this.props.id} data-status={this.state.status}>
        <div className="Card-title">{this.props.name}</div>
      </div>
    );
  }
}