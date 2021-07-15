import React, { FC, useEffect } from "react"
import { useState } from "react"
import Marker from "./Marker"

interface IProps {
  playerEl: any
}

const Controls: FC<IProps> = ({ playerEl }) => {
  const [currentCue, setCurrentCue] = useState<string>("")
  useEffect(() => {
    const track = playerEl.current.textTracks[0]
    track.mode = "hidden"
    track.oncuechange = function (e: Event) {
      const { currentTarget }: any = e
      setCurrentCue(currentTarget?.activeCues[0]?.text)
    }
  })

  return (
    <div className="react-video-captions">
      <p>
        <span style={{ fontSize: "1em" }}>{currentCue}</span>
      </p>
    </div>
  )
}

export default Controls
