import React, { FC } from 'react'
import { useState } from 'react'
import MenuHome from './MenuHome'
import Speed from './Speed'
import Quality from './Quality'
import Subtitles from './Subtitles'
import { useEffect } from 'react'

interface IProps {
  hiddenMenuSetting?: boolean
}

const SettingsControl: FC<IProps> = ({ hiddenMenuSetting }) => {
  const [isShowSettings, setShowSettings] = useState<boolean>(false)
  const [isShowMenu, setShowMenu] = useState<number>(1)

  useEffect(() => {
    if (hiddenMenuSetting) {
      setShowSettings(false)
    }
  })

  const handleClickShowMenuSettings = () => {
    setShowSettings(!isShowSettings)
  }

  return (
    <div className="settings-control">
      <button className="settings-button" onClick={handleClickShowMenuSettings}>
        Settings
      </button>
      {isShowSettings && (
        <div className="menu-container">
          {/* <Speed options={{ speed: [0.5, 1, 1.5, 2], currentSpeed: 1.5 }} />
        <MenuHome setShowMenu={setShowMenu} /> */}
          <MenuHome hiddenMenu={isShowMenu !== 1} setShowMenu={setShowMenu} />
          <Speed
            setShowMenu={setShowMenu}
            options={[0.5, 1, 1.5, 2]}
            currentSpeed={1}
            hiddenMenu={isShowMenu !== 2}
          />
          <Quality setShowMenu={setShowMenu} hiddenMenu={isShowMenu !== 3} />
          <Subtitles
            options={[{ value: 1, label: 'VN' }]}
            setShowMenu={setShowMenu}
            hiddenMenu={isShowMenu !== 4}
          />
        </div>
      )}
    </div>
  )
}

export default SettingsControl
