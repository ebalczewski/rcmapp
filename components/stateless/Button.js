const Button = (props) => {
    return(
        <button type = {props.type} onClick = {props.onClick}>{props.title}</button>
    );
}

export default Button;