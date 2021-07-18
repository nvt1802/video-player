import React from 'react'
import Marker from './Marker'
import Captions from './Captions'
import Play from './Play'
import Rewind from './Rewind'
import FastForward from './FastForward'
import Time from './Time'
import Progress from './Progress'
import Volume from './Volume'
import FullScreen from './FullScreen'
import Pip from './Pip'
import Settings from './Settings'

interface IProps {
  playerRef: any
  progressRef: any
  controls: string[]
  isPlaying: boolean
  volume: number
  muted: boolean
  currentTime: number
  duration: number
  markers: object[]
  setVolume: any
  setMuted: any
  onPlayClick: () => void
  onPauseClick: () => void
  onProgressClick: any
  onFullScreenClick: () => void
  onMarkerClick: any
}

function Controls(props: IProps) {
  const {
    playerRef,
    progressRef,
    controls,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    markers,
    setVolume,
    setMuted,
    onPlayClick,
    onPauseClick,
    onProgressClick,
    onFullScreenClick,
    onMarkerClick,
  } = props

  const getTimeCode = (secs: number): string => {
    let secondsNumber = secs ? parseInt(String(secs), 10) : 0
    let hours = Math.floor(secondsNumber / 3600)
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
    let seconds = secondsNumber - hours * 3600 - minutes * 60
    let hoursStr: string = String(hours)
    let minutesStr: string = String(minutes)
    let secondsStr: string = String(seconds)

    if (hours < 10) {
      hoursStr = '0' + hours
    }
    if (minutes < 10) {
      minutesStr = '0' + minutes
    }
    if (seconds < 10) {
      secondsStr = '0' + seconds
    }

    return `${
      hoursStr !== '00' ? hoursStr + ':' : ''
    }${minutesStr}:${secondsStr}`
  }

  const durationTimeCode = getTimeCode(Math.ceil(duration))
  const currentTimeCode =
    currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode

  return (
    <div className="react-video-controls">
      <Captions playerRef={playerRef} />

      {controls.includes('play') ? (
        <Play
          isPlaying={isPlaying}
          onPauseClick={onPauseClick}
          onPlayClick={onPlayClick}
        />
      ) : null}

      {controls.includes('rewind') ? <Rewind playerRef={playerRef} /> : null}

      {controls.includes('fast-forward') ? (
        <FastForward playerRef={playerRef} />
      ) : null}

      {controls.includes('time') ? (
        <Time
          currentTimeCode={currentTimeCode}
          durationTimeCode={durationTimeCode}
        />
      ) : null}

      {controls.includes('progress') ? (
        <Progress
          playerRef={playerRef}
          duration={duration}
          markers={markers}
          onMarkerClick={onMarkerClick}
          onProgressClick={onProgressClick}
          progressRef={progressRef}
        />
      ) : null}

      {controls.includes('volume') ? (
        <Volume
          muted={muted}
          setVolume={setVolume}
          setMuted={setMuted}
          playerRef={playerRef}
          volume={volume}
        />
      ) : null}

      {controls.includes('settings') ? <Settings /> : null}

      {controls.includes('pip') ? <Pip PlayerRef={playerRef} /> : null}

      {controls.includes('full-screen') ? (
        <FullScreen onFullScreenClick={onFullScreenClick} />
      ) : null}
    </div>
  )
}

export default Controls
