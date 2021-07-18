import React, { FC, useEffect } from 'react'
import { useState } from 'react'

interface IProps {
  playerRef: any
}

const Captions: FC<IProps> = ({ playerRef }) => {
  const [currentCue, setCurrentCue] = useState<string>('')
  useEffect(() => {
    const track = playerRef.current.textTracks[0]
    track.mode = 'hidden'
    track.oncuechange = function (e: Event) {
      const { currentTarget }: any = e
      setCurrentCue(currentTarget?.activeCues[0]?.text)
    }
  })

  return (
    <div className="react-video-captions">
      <p>
        <span style={{ fontSize: '1em' }}>{currentCue}</span>
      </p>
    </div>
  )
}

export default Captions
