import React, { FC } from "react"

interface IProps {
  onFullScreenClick: any
}

const FullScreenControl: FC<IProps> = ({ onFullScreenClick }) => {
  return (
    <button className="full-screen" onClick={onFullScreenClick}>
      FullScreen
    </button>
  )
}

export default FullScreenControl
