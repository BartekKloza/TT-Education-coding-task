import React, { Component } from 'react';
import axios from 'axios';

export default class UserData extends Component {
    constructor() {
        super();
        axios.get('http://localhost:3001/data').then((res) => {
            this.setState({
                data: res.data
            })
        })
    }
    state = {
        data: [],
        usersPerPage: 10,
    }

    getData = () => {
        axios.get('http://localhost:3001/data').then((res) => {
            this.setState({
                data: res.data
            })
        })
    }
    handleLiClick = (event) => {
        event.preventDefault();
        console.log(event.target.dataset.id)
    }
    handleLiDelete = (event) => {
        event.preventDefault();
        let filteredData = this.state.data.filter(user => user.id != event.target.dataset.id)
        console.log(filteredData.length)
        this.setState({
            data: filteredData
        })
        
    }
    render() {
        console.log("asd")
        const listElements = this.state.data.map((user) => 
            <li key={user.id} data-id={user.id} onClick={this.handleLiClick } data-toggle="modal" data-target="#exampleModal">
                <p className="inlineDisplay">{"ID=" + user.id}</p>
                <button data-id={user.id} onClick={this.handleLiDelete} className="inlineDisplay padding-button btn-sm btn-danger">X</button>
                
            </li>
        );

            /*<Popup trigger={<li className="asd" onClick={console.log("asd")} key={user.id}>
                {user.id}
            </li>} 
            position="right center">
            <div id="test">asd</div>
            </Popup>*/
        return (
            <div className="row">
                <div className="col-12">          
                    <div className="card box-shadow">
                        <div className="card-header text-center">
                            <h4 className="my-0 font-weight-normal">List of Users</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                {listElements}
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-primary">Contact us</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
