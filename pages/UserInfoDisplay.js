import React, { Component } from 'react'

class UserInfoDisplay extends Component {
    constructor(props) {
        super(props);
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

export default UserInfoDisplay;




// const UserInfoDisplay = (props) => {
//     console.log(props)
//     if (props.show === true) {
//         return(
//             <p>
//                 {props.value}
//             </p>
//         );
//     }
//     return(<p></p>);
// }

// export default UserInfoDisplay;