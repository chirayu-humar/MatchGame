import {Component} from 'react'
import TabItem from '../tabItem'
import ImageItem from '../imageItem'
import './index.css'

class MatchGameFormat extends Component {
  state = {
    currentTabId: 'FRUIT',
    score: 0,
    timer: 60,
    imageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    isItFirstTime: true,
    isGameActive: true,
  }

  componentDidMount = () => {
    this.timerId = setInterval(() => {
      this.tick()
    }, 1000)
  }

  tick = () => {
    const {timer} = this.state
    if (timer !== 0) {
      this.setState(prevState => ({
        currentTabId: prevState.currentTabId,
        score: prevState.score,
        timer: prevState.timer - 1,
        imageId: prevState.imageId,
        isItFirstTime: false,
        isGameActive: true,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        currentTabId: prevState.currentTabId,
        score: prevState.score,
        timer: prevState.timer,
        imageId: prevState.imageId,
        isItFirstTime: prevState.isItFirstTime,
        isGameActive: false,
      }))
    }
  }

  imageClickedFunction = (id, imagesList) => {
    console.log('imageClicked Called')
    console.log(imagesList)
    const {imageId} = this.state
    if (imageId === id) {
      console.log('write image')
      const num = Math.floor(Math.random() * 30)
      console.log(num)
      const imageElement = imagesList[num]
      console.log(imageElement.id)
      this.setState(prevState => ({
        currentTabId: prevState.currentTabId,
        score: prevState.score + 1,
        timer: prevState.timer,
        imageId: imageElement.id,
        isItFirstTime: prevState.isItFirstTime,
        isGameActive: prevState.isGameActive,
      }))
    } else {
      console.log('wrong image')
      clearInterval(this.timerId)
      this.setState(prevState => ({
        currentTabId: prevState.currentTabId,
        score: prevState.score,
        timer: prevState.timer,
        imageId: prevState.imageId,
        isItFirstTime: prevState.isItFirstTime,
        isGameActive: false,
      }))
    }
  }

  changeTheTab = tabId => {
    console.log(tabId)
    this.setState(prevState => ({
      currentTabId: tabId,
      score: prevState.score,
      timer: prevState.timer,
      imageId: prevState.imageId,
      isItFirstTime: prevState.isItFirstTime,
      isGameActive: prevState.isGameActive,
    }))
  }

  playAgainClicked = () => {
    this.setState(prevState => ({
      currentTabId: prevState.currentTabId,
      score: 0,
      timer: 60,
      imageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      isItFirstTime: true,
      isGameActive: true,
    }))
    this.componentDidMount()
  }

  render() {
    const {
      currentTabId,
      score,
      timer,
      isItFirstTime,
      imageId,
      isGameActive,
    } = this.state
    const {tabsList, imagesList} = this.props
    // if (isItFirstTime) {
    //   this.startTheTimer()
    // }
    const newList = imagesList.filter(
      eachItem => eachItem.category === currentTabId,
    )
    const imageElement = imagesList.filter(eachItem => eachItem.id === imageId)
    console.log(imageElement)
    return (
      <div className="bg-container">
        <ul className="navBar">
          <li className="navBarChild1">
            <img
              alt="website logo"
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            />
          </li>
          <li className="navBarChild2">
            <div className="navBarChild2inner1">
              <p className="temp">Score: </p>
              <p>{score}</p>
            </div>
            <div className="navBarChild2inner2">
              <div className="timerIconContainer">
                <img
                  alt="timer"
                  className="timerIcon"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                />
              </div>
              <p>{timer} sec</p>
            </div>
          </li>
        </ul>
        <div className="bottomDiv">
          {isGameActive && (
            <div className="firstDiv">
              <img
                alt="match"
                className="upperImg"
                src={imageElement[0].imageUrl}
              />
            </div>
          )}
          {isGameActive && (
            <ul className="secondDiv">
              {tabsList.map(eachItem => (
                <TabItem
                  key={eachItem.tabId}
                  changeTheTab={this.changeTheTab}
                  details={eachItem}
                />
              ))}
            </ul>
          )}
          {isGameActive && (
            <ul className="thirdDiv">
              {newList.map(eachItem => (
                <ImageItem
                  key={eachItem.id}
                  imageClickedFunction={this.imageClickedFunction}
                  details={eachItem}
                  imagesList={imagesList}
                />
              ))}
            </ul>
          )}
          {!isGameActive && (
            <div className="fourthDiv">
              <div className="trophyContainer">
                <img
                  alt="trophy"
                  className="trophy"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                />
              </div>
              <p>Your Score</p>
              <h1>{score}</h1>
              <button
                type="button"
                onClick={this.playAgainClicked}
                className="playAgainBtn"
              >
                <div className="reLoadContainer">
                  <img
                    alt="reset"
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    className="reload"
                  />
                </div>
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGameFormat
