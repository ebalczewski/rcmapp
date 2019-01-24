import React, { Component } from 'react'

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: "",
                email:"",
            },
        }
    }

    componentDidMount() {
        console.log(this.props.email)
        let userEmail = "Y@gmail.com"

        fetch("http://localhost:4000/users/" + userEmail)
		.then((resp) => resp.json())
		.then(user => {console.log(user.firstName)} , () => {console.log("fetched!")})   
    }

    render() {
        return(
            <p>UserInfoDisplay</p>
        )
    }

}

export default Banner;