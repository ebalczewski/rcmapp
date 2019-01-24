const Button = (props) => {
    return(
        <button type = {props.type} onClick = {props.action}>{props.title}</button>
    );
}

export default Button;