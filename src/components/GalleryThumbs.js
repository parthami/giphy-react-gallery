import React, { Component } from "react";
import { render } from "react-dom";

export default class GalleryThumb extends Component {
  handleClick = e => {
    e.stopPropagation();
    this.props.onClick();
  };
  constructor() {
    super();
  }
  clickToChangeImage(e) {
    e.persist();
    const url = e.target.src;
    const imageNumber = parseInt(e.target.dataset.imageId, 10);

    console.log(`Changing to ${url} and ${imageNumber}`);
    this.props.setActiveImage(url, imageNumber);
  }

  hideImage(e) {
    e.persist();
    var elem = e.target.parentElement.parentElement;
    console.log(elem);
    var deletedImageNumber =
      e.target.parentElement.parentElement.childNodes[0].dataset.imageId;
    var currentImageNumber = document.getElementById("activeImage").dataset
      .activeImageId;
    console.log(currentImageNumber);
    console.log(deletedImageNumber);
    var check = deletedImageNumber == currentImageNumber;
    console.log(check);
    if (check) {
      this.props.changeActiveImage();
      console.log("changed");
    }
    elem.parentElement.removeChild(elem);
    console.log("deleted");
  }
  /* Thumbnails */
  render() {
    return (
      <div>
        <div id="images" className="wrapper">
          {this.props.data.map((data, index) => (
            <div className="thumbnailWrapper" key={index}>
              <img
                className="thumbnails"
                data-image-id={index}
                src={data.images.fixed_height.url}
                onClick={this.clickToChangeImage.bind(this)}
                alt=""
              />
              <div>
                <i
                  className="fas fa-times"
                  onClick={this.hideImage.bind(this)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
