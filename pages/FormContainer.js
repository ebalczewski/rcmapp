import React, {Component} from 'react';

import TextBox from "../components/TextBox"
import Button from "../components/Button"
import SelectBox from '../components/SelectBox';

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                email: "",
                firstName: "",
                lastName: "",
                batch: "",
            },

            batchOptions : ["W1 18", "W2 19"]
        }
    }

    handleFormSubmit = (event) => {
        (event).preventDefault();
        let userData = this.state.newUser;

        fetch("http://localhost:4000/createUser",{
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Accept': "application",
                'Content-Type' : "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            })
        })

        console.log("submit");
    }

    handleInput = (event) => {

        let name = event.target.name
        let value = event.target.value

        this.setState( prevState => {
            return {
                newUser : {
                    ...prevState.newUser, [name]: value
                }
            }
        }, () => console.log(this.state.newUser)
        )
    }

    render() {
        
        return(
            <form onSubmit={this.handleFormSubmit}>
                <TextBox 
                    type = {'text'}
                    name = {'firstName'}
                    value = {this.state.newUser.name}
                    placeholder = {"First"}
                    handleChange = {this.handleInput}/>

                    <TextBox 
                    type = {'text'}
                    name = {'lastName'}
                    value = {this.state.newUser.name}
                    placeholder = {"Last"}
                    handleChange = {this.handleInput}/>

                    <TextBox 
                    type = {'text'}
                    name = {'email'}
                    value = {this.state.newUser.name}
                    placeholder = {"Email"}
                    handleChange = {this.handleInput}/>

                    <SelectBox 
                    name = {'batch'}
                    options = {this.state.batchOptions}
                    value = {this.state.newUser.batch}
                    placeholder = {"Batch"}
                    handleChange = {this.handleInput}/>

                    <Button 
                    title = "Submit"
                    type = "submit"
                    onClick = {this.handleFormSubmit} />
            </form>
        );
    }
}

export default FormContainer;