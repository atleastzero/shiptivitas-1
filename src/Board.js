import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      },
    };
    this.drake = Dragula({
      isContainer: function (el) {
        return el.classList.contains('Swimlane-dragColumn');
      },
      moves: function (el, source, handle, sibling) {
        return true;
      },
    });
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
    this.setupOnDrop();
  }
  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  setupOnDrop() {
    this.drake.on('drop', (el, target, source, sibling) => {
      let newBacklog = this.state.clients.backlog;
      let newInProgress = this.state.clients.inProgress;
      let newComplete = this.state.clients.complete;

      let elementInfo;

      if (source.getAttribute('status') === 'backlog') {
        if (target.getAttribute('status') === 'backlog') {
          return true;
        }
        elementInfo = this.state.clients.backlog.filter(item =>
          item.id === el.getAttribute("data-id")
        )[0];
        newBacklog = this.state.clients.backlog.filter(item =>
          item.id !== el.getAttribute("data-id")
        );
      } else if (source.getAttribute('status') === 'in-progress') {
        if (target.getAttribute('status') === 'in-progress') {
          return true;
        }
        elementInfo = this.state.clients.inProgress.filter(item =>
          item.id === el.getAttribute("data-id")
        )[0];
        newInProgress = this.state.clients.inProgress.filter(item =>
          item.id !== el.getAttribute("data-id")
        );
      } else if (source.getAttribute('status') === 'complete') {
        if (target.getAttribute('status') === 'complete') {
          return true;
        }
        elementInfo = this.state.clients.complete.filter(item =>
          item.id === el.getAttribute("data-id")
        )[0];
        newComplete = this.state.clients.complete.filter(item =>
          item.id !== el.getAttribute("data-id")
        );
      }

      elementInfo.status = target.getAttribute('status');

      if (target.getAttribute('status') === 'backlog') {
        el.className = "Card Card-grey";
        newBacklog = [...this.state.clients.backlog.slice(0, sibling.getAttribute('index')), elementInfo, ...this.state.clients.backlog.slice(sibling.getAttribute('index'))];
      } else if (target.getAttribute('status') === 'in-progress') {
        el.className = "Card Card-blue";
        newInProgress = [...this.state.clients.inProgress.slice(0, sibling.getAttribute('index')), elementInfo, ...this.state.clients.inProgress.slice(sibling.getAttribute('index'))];
      } else if (target.getAttribute('status') === 'complete') {
        el.className = "Card Card-green";
        newComplete = [...this.state.clients.complete.slice(0, sibling.getAttribute('index')), elementInfo, ...this.state.clients.complete.slice(sibling.getAttribute('index'))];
      }

      this.drake.cancel(true);

      this.setState({
        clients: {
          backlog: newBacklog,
          inProgress: newInProgress,
          complete: newComplete,
        },
      });
    });
  }
  renderSwimlane(name, status, clients, ref) {
    return (
      <Swimlane name={name} status={status} clients={clients} dragulaRef={ref}/>
    );
  }
  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', 'backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', 'in-progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', 'complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
