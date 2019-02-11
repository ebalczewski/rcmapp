const BootstrapLink = (props) => {
    return(
        <div>
        <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous"
        />
        
        <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />

        <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.js"
        crossorigin
        />

        <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin
        />

        <script>var Alert = ReactBootstrap.Alert;</script>
        </div>

    );
}

export default BootstrapLink;