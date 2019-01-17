const TextBox = (props) => {
    return(
        <div>
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default TextBox;