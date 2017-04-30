import React, { Component } from 'react';
import './App.css';

import { Follow } from 'react-twitter-widgets';

import CamperList from './components/camper_list';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            camperData: [],
            selectedCamper: null,
            loading: true,
            sortBy: 'recent',
            sortDirection: 'descending'
        };
    } 
    
    componentDidMount() {
        this.loadData('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    }
    loadData(url) {
        fetch(url)
            .then(response=>response.json())
            .then(json=>{
                this.setState({camperData:json});
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center table-header">
                        <h3>freeCodeCamp - Leaderboard</h3>
                        <Follow username="koojam_pk" options={{count:"none"}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col-number">&#35;</th>
                                    <th className="col-username" id="username">UserName</th>
                                    <th className="col-30days" id="recent" onClick={this.sortData.bind(this)}>Points In Last 30 Days <span className={
                                        this.state.sortBy==='recent' ? 'caret' + (this.state.sortDirection==='ascending' ? ' caret-reverse' : ''): ''  
                                    }></span></th>
                                    <th className="col-alltime" id="alltime" onClick={this.sortData.bind(this)}>Points All Time <span className={this.state.sortBy==='alltime' ? 'caret' + (this.state.sortDirection==='ascending' ? ' caret-reverse' : ''): ''}></span></th>
                                </tr>
                            </thead>
                            <CamperList camperData={this.state.camperData} />
                        </table>
                    </div>
                </div>
        </div>
        );
    }
    sortData(event) {
        var key = event.target.id;
        var reverse = -1;
        
        if (key === this.state.sortBy) {
            reverse = event.target.lastChild.classList.contains("caret-reverse");
            if (reverse) {
                this.setState({sortDirection: "descending"});
            } else {
                this.setState({sortDirection: "ascending"});
            }
        } else {
            this.setState({sortDirection: "descending"});
        }
        
        reverse = reverse ? 1 : -1;
        this.setState({sortBy: key});
        this.state.camperData.sort(function(a, b){
           if (parseInt(a[key], 10) < parseInt(b[key], 10)) {
               return 1*reverse;
           } else if (parseInt(a[key], 10) > parseInt(b[key], 10)) {
               return -1*reverse;
           }
            return 0;
        });
    }    
}

export default App;