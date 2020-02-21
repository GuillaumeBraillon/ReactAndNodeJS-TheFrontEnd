import React, { Component } from 'react';
import Input from '../../../components/Input/Input';
import Select from "../../../components/Select/Select";

class ListUsersForm extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            weekavailableOptions: ["Oui", "Non", "Unknow"]
        };
    }

    componentDidMount() {
        fetch('/users')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(users => {
                console.log(users);
                this.setState({ users })
            });
    }

    handleDelete = userId => {
        const requestOptions = {
            method: 'DELETE'
        };
        const currentUser = this.state.users;
        this.setState({
            users: currentUser.filter(user => user.id !== userId),
        });
        console.log({ currentUser: currentUser });
        fetch("/users/delete/" + userId, requestOptions)
            .then((res) => {
                console.log({ res: res });
                return res.json()
            }).then((result) => {
                console.log({ result: result });
                this.setState({ user: currentUser })
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <tbody>
                            {this.state.users.map(user =>
                                <tr key={user.id}>
                                    <td>
                                        <Input
                                            inputType={"text"}
                                            title={"First Name"}
                                            name={"firstname"}
                                            value={user.firstName}
                                            placeholder={"Enter your firstname"}
                                            handleChange={this.handleInputChange}
                                        />{" "}
                                        {/* FirstName of the user */}
                                    </td>
                                    <td>
                                        <Input
                                            inputType={"text"}
                                            title={"Last Name"}
                                            name={"lastname"}
                                            value={user.lastName}
                                            placeholder={"Enter your lastname"}
                                            handleChange={this.handleInputChange}
                                        />{" "}
                                        {/* LastName of the user */}
                                    </td>
                                    <td>
                                        <Input
                                            inputType={"text"}
                                            title={"Email"}
                                            name={"email"}
                                            value={user.email}
                                            placeholder={"Enter your email"}
                                            handleChange={this.handleInputChange}
                                        />{" "}
                                        {/* Email of the user */}
                                    </td>
                                    <td>
                                        <Input
                                            inputType={"text"}
                                            title={"Phone Number"}
                                            name={"phone"}
                                            value={user.phoneNumber}
                                            placeholder={"Enter your Phone Number"}
                                            handleChange={this.handleInputChange}
                                        />{" "}
                                        {/* Phone Number of the user */}
                                    </td>
                                    <td>
                                        <Select
                                            title={"Week Available"}
                                            name={"weekavailable"}
                                            options={this.state.weekavailableOptions}
                                            value={user.weekAvailable}
                                            placeholder={"Are you available ?"}
                                            handleChange={this.handleInputChange}
                                        />{" "}
                                        {/* Available Selection */}
                                    </td>
                                    <td>Edit| <input value="Delete" type="button" onClick={e => this.handleDelete(user.id)} className="delete-btn"></input></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}
export default ListUsersForm;