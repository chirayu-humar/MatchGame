import './index.css'

const TabItem = props => {
  const {details, changeTheTab} = props
  const {displayText, tabId} = details

  const tabChanged = () => {
    changeTheTab(tabId)
  }
  return (
    <li className="outer">
      <button type="button" onClick={tabChanged}>
        <h1>{displayText}</h1>
      </button>
    </li>
  )
}

export default TabItem
