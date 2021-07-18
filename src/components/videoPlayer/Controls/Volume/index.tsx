import React, { FC, useEffect, useRef } from 'react'

interface IProps {
  playerRef: any
  volume: number
  setVolume: any
  muted: boolean
  setMuted: any
}

const DEFAULT_VOLUME: number = 0.7

const VolumeControl: FC<IProps> = ({
  playerRef,
  volume,
  setVolume,
  muted,
  setMuted,
}) => {
  const volumeRef = useRef<HTMLProgressElement>(
    document.createElement('progress')
  )

  useEffect(() => {
    volumeRef.current.addEventListener('click', handleVolumeClick)
  })

  const handleVolumeClick = (e: Event) => {
    const { clientY }: any = e
    const y =
      volumeRef.current.offsetWidth -
      (clientY - volumeRef.current.getBoundingClientRect().top)
    const percentage =
      (y * volumeRef.current.max) / volumeRef.current.offsetWidth
    playerRef.current.muted = false
    setVolume(percentage / 100)
  }

  const handleMuteClick = () => {
    if (muted) {
      playerRef.current.muted = false
      setVolume(DEFAULT_VOLUME)
      setMuted(false)
    } else {
      playerRef.current.muted = true
      setVolume(0)
      setMuted(true)
    }
  }

  return (
    <div className="volume-wrap">
      <progress ref={volumeRef} max="100" value={volume * 100}>
        {volume * 100}% volume
      </progress>
      <button
        className={muted ? 'no-volume' : 'volume'}
        onClick={handleMuteClick}
      >
        Volume
      </button>
    </div>
  )
}

export default VolumeControl
