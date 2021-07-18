import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  options?: number[]
  currentSpeed?: number
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuSpeed: FC<IProps> = ({
  options = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  currentSpeed = 1,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const renderMenuItem = () => {
    return options.map((item: number, index: number) => {
      return (
        <MenuItem
          key={index}
          checked={currentSpeed === item}
          displayValue={`${item === 1 ? 'Normal' : item}`}
        />
      )
    })
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-speed menu-hidden' : 'settings-speed'
      } `}
    >
      <div>
        <ButtonBack displayValue="Speed" setShowMenu={setShowMenu} />
        {renderMenuItem()}
      </div>
    </div>
  )
}

export default MenuSpeed
