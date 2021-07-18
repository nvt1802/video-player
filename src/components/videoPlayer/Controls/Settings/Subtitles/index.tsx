import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  options?: [{ value: number; label: string }]
  currentSubtitles?: number
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuSubtitles: FC<IProps> = ({
  options = [],
  currentSubtitles = 0,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const renderDefaultMenu = () => {
    return (
      <MenuItem
        key={'default'}
        checked={currentSubtitles === 0}
        displayValue={'Disable'}
      />
    )
  }
  const renderMenuItem = () => {
    return options.map(
      (item: { value: number; label: string }, index: number) => {
        return (
          <MenuItem
            key={index}
            checked={currentSubtitles === item.value}
            displayValue={item.label}
          />
        )
      }
    )
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-subtiltes menu-hidden' : 'settings-subtiltes'
      } `}
    >
      <div>
        <ButtonBack displayValue="Subtitles" setShowMenu={setShowMenu} />
        {renderDefaultMenu()}
        {renderMenuItem()}
      </div>
    </div>
  )
}

export default MenuSubtitles
