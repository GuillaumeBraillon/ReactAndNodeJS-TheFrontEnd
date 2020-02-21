import React, { Component } from 'react';
import AddUsersForm from './AddUsersForm/AddUsersForm';
import ListUsersForm from './ListUsersForm/ListUsersForm';

class Users extends Component {
    render() {
        return (
            <div className="container">
                    <AddUsersForm />
                    <ListUsersForm />
            </div>
        );
    }
}
export default Users;