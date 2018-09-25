import React, { Component } from "react";
import { render } from "react-dom";
import GalleryThumb from "./GalleryThumbs";

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      activeImageSrc: "",
      imageNumber: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.changeActiveImage(), 3000);
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=PEyIrGaWdf08Lw4nezyXejpD9Y0pO6Rt"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            data: result.data,
            activeImageSrc: result.data[0].images.fixed_height.url
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setActiveImage(activeImageSrc, imageNumber) {
    this.setState({ activeImageSrc });
    this.setState({ imageNumber });
  }

  changeActiveImage() {
    var currentImageNumber = document.getElementById("activeImage").dataset
      .activeImageId;
    var totalImages = document.getElementById("images").childElementCount;
    var firstImageNumber = document.getElementById("images").childNodes[0]
      .childNodes[0].dataset.imageId;
    var lastImageNumber = document.getElementById("images").childNodes[
      totalImages - 1
    ].childNodes[0].dataset.imageId;

    var newImageNumber = 0;
    var newImageURL = "";
    var check = currentImageNumber === lastImageNumber;
  
    if (check) {
      newImageURL = document.getElementById("images").childNodes[0]
        .childNodes[0].src;
      newImageNumber = document.getElementById("images").childNodes[0]
        .childNodes[0].dataset.imageId;
    } else {
      var nextImageElement = document.querySelectorAll(
        `[data-image-id='${currentImageNumber}']`
      )[0].parentElement.nextElementSibling.childNodes[0];
      newImageNumber = nextImageElement.dataset.imageId;
      newImageURL = nextImageElement.src;
    }
    this.setActiveImage(newImageURL, newImageNumber);
  }

  hideAlertBar(e) {
    var elem = e.target.parentElement;
    elem.style.display = "none";
  }

  render() {
    const { error, isLoaded, data, activeImageSrc, imageNumber } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossOrigin="anonymous"
          />
          <div id="topBar">
            <div id="topBarText">
              <i className="fas fa-images" />
              GIPHY Gallery - Top 25 Trending
            </div>
          </div>
          <div className="alert">
            <span className="closebtn" onClick={this.hideAlertBar.bind(this)}>
              &times;
            </span>
            Click an image to change postion in the Gallery!
          </div>
          <div id="imageWrapper">
            <img
              id="activeImage"
              className="center card__face card__face--front"
              data-active-image-id={imageNumber}
              src={activeImageSrc}
            />
          </div>
          <GalleryThumb
            data={data}
            setActiveImage={this.setActiveImage.bind(this)}
            changeActiveImage={this.changeActiveImage.bind(this)}
          />
        </div>
      );
    }
  }
}
