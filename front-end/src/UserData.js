import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
export default class UserData extends Component {
    constructor() {
        super();
        this.getUsers();
    }
    state = {
        users: [],
        showNewModal: false,
        showModal: false,
        showAlert: false,
        alertMessage: "",
        formData: {
            id: 0,
            email: "",
            first: "",
            last: "",
            company: "",
            created_at: "",
            country: ""
        },
        newFormData: {
            id: 0,
            email: "",
            first: "",
            last: "",
            company: "",
            created_at: "",
            country: ""
        }
    }
    
    getUsers = () => {
        let newUsers = [];
        axios.get('http://localhost:3001/data').then((res) => {
            res.data.map((user) => {
                newUsers.push(user)
            });
            this.setState({
                users: newUsers
            });
        })
    }

    updateUser = (user, index) => {
        axios.post('http://localhost:3001/updateuser', {newUser: user, updatedUserIndex: index });
    }

    deleteUser = (id) => {
        axios.post('http://localhost:3001/deleteuser', {userID: id});
    }

    addUser = (user) => {
        axios.post('http://localhost:3001/adduser', {newUser: user});
    }

    handleClose = () => {
        this.setState({
            showModal: false,
            showNewModal: false
        });
    }

    handleFormChange = (e) => {
        this.setState({ 
            formData: { ...this.state.formData, [e.target.name]: e.target.value} 
        });
    }

    handleNewFormChange = (e) => {
        this.setState({ 
            newFormData: { ...this.state.newFormData, [e.target.name]: e.target.value} 
        });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        //axios.post this.state.formData
    }

    handleUserClick = (event) => {
        let clickedUser;
        this.state.users.map((user) => {
            if(user.id == event.currentTarget.dataset.id){
                clickedUser = user;
            }
        });
        this.setState({
            showModal: true,
            formData: {
                id: clickedUser.id,
                email: clickedUser.email,
                first: clickedUser.first,
                last: clickedUser.last,
                company: clickedUser.company,
                created_at: clickedUser.created_at,
                country: clickedUser.country
            }
        }); 
    }

    handleUserDelete = (event) => {
        let filteredUsers = this.state.users.filter(user => user.id != event.currentTarget.dataset.id)
        this.setState({
            users: filteredUsers
        })
        this.deleteUser(event.currentTarget.dataset.id);
    }

    handleSaveButton = () => {
        let newUser = this.state.formData;
        let updatedUsers = this.state.users
        let savedUserIndex;
    
        updatedUsers.map((user, index) => {
            if(user.id == newUser.id){
                savedUserIndex = index;
            }
        });
        updatedUsers[savedUserIndex]=newUser;
        this.setState({
            users: updatedUsers
        });
        this.updateUser(newUser, savedUserIndex);
        this.handleClose();
    }

    handleDeleteButton = (deletedUserID) => {
        let filteredUsers = this.state.users.filter(user => user.id != deletedUserID)
        this.deleteUser(deletedUserID);
        this.setState({
            users: filteredUsers
        })
        this.handleClose();
    }

    handleNewUserButton = () => {
        this.setState({
            showNewModal: true,
            showAlert: false
        });
        
    }

    validateFields = () => {
        let fieldsCorrect = true;
        this.state.users.map((user) => {
            if(user.id==this.state.newFormData.id){
                this.setState({
                    showAlert: true,
                    alertMessage: "This ID already exists in the user database."
                });
                fieldsCorrect = false;
            }
        })
        if(isNaN(this.state.newFormData.id)){
            this.setState({
                showAlert: true,
                alertMessage: "User ID can only contain numbers"
            });
            fieldsCorrect = false;
        }
        return fieldsCorrect;
    }

    handleNewUserSubmit = () => {
        let validated = this.validateFields();
        if(validated){
            let newUser = this.state.newFormData;
            let updatedUsers = this.state.users
            updatedUsers.push(newUser);
            this.setState({
                users: updatedUsers,
                showNewModal: false
            })
            this.addUser(newUser);
        }
        else{
            this.setState({
                showAlert: true
            })
        }
    }
    
    displayAlert = (alertMessage) => {
        if(this.state.showAlert){
            return (<div className="alert alert-danger">
                        <strong>Error!</strong> {alertMessage}
                    </div>)
        }
    }

    render() {
        const listElements = this.state.users.map((user, index) => 
            <div key={index} className="every-two highlight-element flex-container change-cursor">
                <div data-id={user.id} onClick={this.handleUserClick} className="fill-remaining-width " data-toggle="modal" data-target="#exampleModal">
                    <p className="inline-display pl-0">{user.id}. </p>
                    <p className="inline-display ">{user.first} </p>
                    <p className="inline-display ">{user.last}</p>
                </div>
                <div data-id={user.id} onClick={this.handleUserDelete} className="px-1 delete-button">
                    <p className="inline-display ">X</p>
                </div>
            </div>
            
        );
        return (
            <div className="row">
                <div className="col-md-6 margin-auto">          
                    <div className="card box-shadow">
                        <div className="card-header text-center">
                            <div>
                                <h3 className="my-0 font-weight-normal pb-2">List of Users</h3>
                            </div>
                            <div>
                                <button type="button" onClick={this.handleNewUserButton} className="btn btn-success p-1">New User</button>
                            </div>
                        </div>
                        <div className="card-body p-0 increase-size">
                            {listElements}
                        </div>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>User ID</label>
                            <input name="id" type="text" className="form-control" disabled
                             defaultValue={this.state.formData.id} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input name="email" type="email" className="form-control" 
                             defaultValue={this.state.formData.email} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="first" type="text" className="form-control" 
                             defaultValue={this.state.formData.first} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="last" type="text" className="form-control" 
                             defaultValue={this.state.formData.last} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input name="company" type="text" className="form-control" 
                             defaultValue={this.state.formData.company} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Timestamp</label>
                            <input name="created_at" type="text" className="form-control" 
                             defaultValue={this.state.formData.created_at} onChange={this.handleFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input name="country" type="text" className="form-control" 
                             defaultValue={this.state.formData.country} onChange={this.handleFormChange}></input>
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.handleClose} className="btn btn-lg btn-secondary btn-primary">Close</button>
                        <button type="button" onClick={this.handleSaveButton} className="btn btn-lg btn-block btn-success">Save Changes</button>
                        <button type="button" onClick={() => this.handleDeleteButton(this.state.formData.id)} className="btn btn-lg btn-block btn-danger m-0">Delete</button>
                    </Modal.Footer>
                </Modal>
                
                <Modal show={this.state.showNewModal} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {this.displayAlert(this.state.alertMessage)}
                    
                    <form>
                        <div className="form-group">
                            <label>User ID</label>
                            <input name="id" type="text" className="form-control"
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input name="email" type="email" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="first" type="text" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="last" type="text" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input name="company" type="text" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Timestamp</label>
                            <input name="created_at" type="text" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input name="country" type="text" className="form-control" 
                             onChange={this.handleNewFormChange}></input>
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.handleClose} className="btn btn-lg btn-secondary btn-primary">Close</button>
                        <button type="button" onClick={this.handleNewUserSubmit} className="btn btn-lg btn-block btn-success">Create User</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
