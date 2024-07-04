import React, { Component } from 'react';

export class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
        };
    }

    refreshList() {
        fetch('http://localhost:47756/api/Value')  
            .then(response => response.json())
            .then(data => {
                // Сортируем данные по ID в порядке убывания и берем последние 10 записей
                const sortedLogs = data.sort((a, b) => b.id - a.id).slice(0, 10);
                this.setState({ logs: sortedLogs });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    getIcon(level) {
        switch (level) {
            case 'Trace':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM8 4.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>;
            case 'Info':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM8 4.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>;
            case 'Error':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 1.016A1 1 0 0 1 8 2h0a1 1 0 0 1 .062-.984l6.5 12.5a1 1 0 0 1-.876 1.484H1.438a1 1 0 0 1-.876-1.484l6.5-12.5zM8 4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0v-4A.5.5 0 0 0 8 4zm0 6a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 1 0v-.5A.5.5 0 0 0 8 10z"/>
                </svg>;
            default:
                return null;
        }
    }

    render() {
        const { logs } = this.state;

        return (
            <div>
                <h2>Recent Logs</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Machine Name</th>
                            <th>Logged</th>
                            <th>Level</th>
                            <th>Message</th>
                            <th>Icon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.machineName}</td>
                                <td>{new Date(log.logged).toLocaleString()}</td>
                                <td>{log.level}</td>
                                <td>{log.message}</td>
                                <td>{this.getIcon(log.level)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
