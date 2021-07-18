import React, { FC, useEffect, useRef } from 'react'
import Marker from '../Marker'

interface IProps {
  playerRef: any
  progressRef: any
  onProgressClick: any
  markers: any
  duration: any
  onMarkerClick: any
}

const PlayControl: FC<IProps> = ({
  playerRef,
  progressRef,
  onProgressClick: onProgressClick,
  markers,
  duration,
  onMarkerClick,
}) => {
  const progresBufferedRef = useRef<any>(null)

  useEffect(() => {
    playerRef.current.addEventListener('progress', function () {
      const duration = playerRef.current.duration
      const buffered = playerRef.current.buffered
      if (duration > 0) {
        for (let i = 0; i < buffered.length; i++) {
          if (
            buffered.start(buffered.length - 1 - i) <
            playerRef.current.currentTime
          ) {
            progresBufferedRef.current.value =
              (buffered.end(buffered.length - 1 - i) / duration) * 100
            break
          }
        }
      }
    })
  })

  return (
    <div className="progress-wrap">
      <input
        className="progress-loaded"
        type="range"
        min="0"
        step="0.01"
        max="100"
        defaultValue="0"
        style={{ width: '100%' }}
        ref={progressRef}
        onClick={onProgressClick}
      />
      <progress
        ref={progresBufferedRef}
        max="100"
        className="progress-buffered"
      >
        0% played
      </progress>
      {markers &&
        markers.map((marker: any, index: number) => {
          return (
            <Marker
              key={index}
              marker={marker}
              duration={duration}
              onMarkerClick={onMarkerClick}
            />
          )
        })}
    </div>
  )
}

export default PlayControl
