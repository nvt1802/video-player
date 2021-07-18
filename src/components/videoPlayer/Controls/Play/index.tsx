import React, { FC } from "react"

interface IProps {
  isPlaying: boolean
  onPlayClick: any
  onPauseClick: any
}

const PlayControl: FC<IProps> = ({ isPlaying, onPlayClick, onPauseClick }) => {
  return (
    <button
      className={isPlaying ? "pause" : "play"}
      onClick={isPlaying ? onPauseClick : onPlayClick}
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  )
}

export default PlayControl
