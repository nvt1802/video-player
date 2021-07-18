import React, { FC } from 'react'

interface IProps {
  speedDisplay?: string
  qualityDisplay?: string
  subtitlesDisplay?: string
  setShowMenu: any
  hiddenMenu: boolean
}

const MenuHome: FC<IProps> = ({
  speedDisplay = 'Normal',
  qualityDisplay = '1080p',
  subtitlesDisplay = 'VN',
  setShowMenu,
  hiddenMenu = false,
}) => {
  const handleClickMenuSpeed = () => {
    setShowMenu(2)
  }

  const handleClickMenuQuality = () => {
    setShowMenu(3)
  }

  const handleClickMenuSubtitles = () => {
    setShowMenu(4)
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-home menu-hidden' : 'settings-home'
      } `}
    >
      <div>
        <button className="menu-control" onClick={handleClickMenuSpeed}>
          <span>
            Speed
            <span className="menu-value">{speedDisplay}</span>
          </span>
        </button>
        <button className="menu-control" onClick={handleClickMenuQuality}>
          <span>
            Quality
            <span className="menu-value">{qualityDisplay}</span>
          </span>
        </button>
        <button className="menu-control" onClick={handleClickMenuSubtitles}>
          <span>
            Subtitles
            <span className="menu-value">{subtitlesDisplay}</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default MenuHome
