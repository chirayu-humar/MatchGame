/* eslint-disable react/button-has-type */
import './index.css'

const ImageItem = props => {
  const {details, imagesList, imageClickedFunction} = props
  const {imageUrl, thumbnailUrl, id} = details

  const imageChenged = () => {
    imageClickedFunction(id, imagesList)
  }
  return (
    <li className="outerDiv">
      <button type="button" onClick={imageChenged}>
        <img alt="thumbnailUrl" className="innerImage" src={thumbnailUrl} />
      </button>
    </li>
  )
}

export default ImageItem
