import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export class InfoWindow extends React.Component {

  componentDidMount() {
    this.renderInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;

    if (!google || !map) {
      return;
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.position !== prevProps.position) {
      this.updatePosition();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible ||
        this.props.marker !== prevProps.marker ||
        this.props.position !== prevProps.position)) {
        this.props.visible ?
          this.openWindow() :
          this.closeWindow();
    }
  }

    renderInfoWindow() {
        const {
        map,
        google,
        mapCenter,
        ...props
        } = this.props;

        if (!google || !google.maps) {
            return;
        }

        const iw = this.infowindow = new google.maps.InfoWindow({
            content: ""
        });

        google.maps.event
        .addListener(iw, 'closeclick', this.onClose.bind(this))
        google.maps.event
        .addListener(iw, 'domready', this.onOpen.bind(this));
    }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker);
  }

  updatePosition() {
    let pos = this.props.position;
    if (!(pos instanceof google.maps.LatLng)) {
      pos = pos && new google.maps.LatLng(pos.lat, pos.lng);
    }
    this.infowindow.setPosition(pos);
  }

  updateContent() {
    const user = this.props.marker.user;
    this.infowindow.setContent(
        '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + 
            user.firstName + " " + user.lastName +
            '</h1>'+
            '<div id="bodyContent">'+
            '<h2>' +
            '<ul>' +
                '<li>Coffee: ' + user.coffee + '</li>' +
                '<li>Stay: ' + user.stay + '</li>' +
                '<li>Roomate: ' + user.roomate + '</li>' +
            '</ul>'+
            '</h2>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>'
    );
  }

  closeWindow() {
    this.infowindow.close();
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  render() {
    return null;
  }
}

InfoWindow.propTypes = {
  children: PropTypes.element.isRequired,
  map: PropTypes.object,
  marker: PropTypes.object,
  position: PropTypes.object,
  visible: PropTypes.bool,

  // callbacks
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow