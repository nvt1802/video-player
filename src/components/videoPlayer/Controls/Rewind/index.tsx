import React, { FC } from 'react'

interface IProps {
  playerRef: any
}

const RewindControl: FC<IProps> = ({ playerRef }) => {
  const handleRewindClick = () => {
    playerRef.current.currentTime = playerRef.current.currentTime - 5
  }

  return (
    <button className="rewind" onClick={handleRewindClick}>
      Fast Forward
    </button>
  )
}

export default RewindControl
