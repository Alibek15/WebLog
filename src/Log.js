import React, { Component } from 'react';


export class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            modalTitle: "",
            MachineName: "",
            Logged: "",
            Level: "",
            Message: "",
            Logger: "",
            Properties: "",
            Callsite: "",
            Exception: "",

            IdFilter: "",
            MachineNameFilter: "",
            logsWithoutFilter: []
        };
    }

    FilterFn() {
        const { IdFilter, MachineNameFilter, logsWithoutFilter } = this.state;

        const filteredData = logsWithoutFilter.filter(
            (el) =>
                el.Id.toString().toLowerCase().includes(IdFilter.toString().trim().toLowerCase()) &&
                el.MachineName.toString().toLowerCase().includes(MachineNameFilter.toString().trim().toLowerCase())
        );

        this.setState({ logs: filteredData });
    }

    sortResult(prop, asc) {
        const sortedData = [...this.state.logs].sort((a, b) => {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ logs: sortedData });
    }

    changeIdFilter = (e) => {
        this.setState({ IdFilter: e.target.value }, this.FilterFn);
    }

    changeMachineNameFilter = (e) => {
        this.setState({ MachineNameFilter: e.target.value }, this.FilterFn);
    }

    refreshList() {
        fetch('http://localhost:47756/api/Value')
            .then(response => response.json())
            .then(data => {
                this.setState({ logs: data, logsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeMachineName = (e) => {
        this.setState({ MachineName: e.target.value });
    }

    changeLogged = (e) => {
        this.setState({ Logged: e.target.value });
    }

    changeLevel = (e) => {
        this.setState({ Level: e.target.value });
    }

    changeMessage = (e) => {
        this.setState({ Message: e.target.value });
    }

    changeLogger = (e) => {
        this.setState({ Logger: e.target.value });
    }

    changeProperties = (e) => {
        this.setState({ Properties: e.target.value });
    }

    changeCallsite = (e) => {
        this.setState({ Callsite: e.target.value });
    }

    changeException = (e) => {
        this.setState({ Exception: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Log",
            Id: 0,
            MachineName: "",
            Logged: "",
            Level: "",
            Message: "",
            Logger: "",
            Properties: "",
            Callsite: "",
            Exception: ""
        });
    }

    createClick() {
        fetch('http://localhost:47756/api/Value', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MachineName: this.state.MachineName,
                Logged: this.state.Logged,
                Level: this.state.Level,
                Message: this.state.Message,
                Logger: this.state.Logger,
                Properties: this.state.Properties,
                Callsite: this.state.Callsite,
                Exception: this.state.Exception
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
                this.setState({ MachineName: "", Logged: "", Level: "", Message: "", Logger: "", Properties: "", Callsite: "", Exception: "" });
            }, (error) => {
                alert('Failed');
            })
    }

    render() {
        const {
            logs,
            modalTitle,
            MachineName,
            Logged,
            Level,
            Message,
            Logger,
            Properties,
            Callsite,
            Exception
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Log
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('Id', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('Id', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeMachineNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('MachineName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('MachineName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                MachineName
                            </th>
                            <th>Logged</th>
                            <th>Level</th>
                            <th>Message</th>
                            <th>Logger</th>
                            <th>Properties</th>
                            <th>Callsite</th>
                            <th>Exception</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log =>
                            <tr key={log.Id}>
                                <td>{log.Id}</td>
                                <td>{log.MachineName}</td>
                                <td>{log.Logged}</td>
                                <td>{log.Level}</td>
                                <td>{log.Message}</td>
                                <td>{log.Logger}</td>
                                <td>{log.Properties}</td>
                                <td>{log.Callsite}</td>
                                <td>{log.Exception}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">MachineName</span>
                                    <input type="text" className="form-control"
                                        value={MachineName}
                                        onChange={this.changeMachineName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Logged</span>
                                    <input type="datetime-local" className="form-control"
                                        value={Logged}
                                        onChange={this.changeLogged} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Level</span>
                                    <input type="text" className="form-control"
                                        value={Level}
                                        onChange={this.changeLevel} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Message</span>
                                    <input type="text" className="form-control"
                                        value={Message}
                                        onChange={this.changeMessage} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Logger</span>
                                    <input type="text" className="form-control"
                                        value={Logger}
                                        onChange={this.changeLogger} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Properties</span>
                                    <input type="text" className="form-control"
                                        value={Properties}
                                        onChange={this.changeProperties} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Callsite</span>
                                    <input type="text" className="form-control"
                                        value={Callsite}
                                        onChange={this.changeCallsite} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Exception</span>
                                    <input type="text" className="form-control"
                                        value={Exception}
                                        onChange={this.changeException} />
                                </div>

                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.createClick()}
                                >Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
