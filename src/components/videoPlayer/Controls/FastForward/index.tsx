import React, { FC, useEffect } from 'react'
import { useState } from 'react'

interface IProps {
  playerRef: any
}

const FastForwardControl: FC<IProps> = ({ playerRef }) => {
  const handleFastForwardClick = () => {
    playerRef.current.currentTime = playerRef.current.currentTime + 5
  }

  return (
    <button className="fast-forward" onClick={handleFastForwardClick}>
      Fast Forward
    </button>
  )
}

export default FastForwardControl
