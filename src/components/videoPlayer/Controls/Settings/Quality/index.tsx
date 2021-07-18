import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  options?: [{ value: number; label: string }]
  currentQuality?: number
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuQuality: FC<IProps> = ({
  options = [
    {
      value: 2160,
      label: '2160p(4k)',
    },
    {
      value: 1080,
      label: '1080p(FHD)',
    },
    {
      value: 720,
      label: '720p(HD)',
    },
    {
      value: 480,
      label: '480p(SD)',
    },
    {
      value: 360,
      label: '360p(normal)',
    },
  ],
  currentQuality = 1080,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const renderMenuItem = () => {
    return options.map(
      (item: { value: number; label: string }, index: number) => {
        return (
          <MenuItem
            key={index}
            checked={currentQuality === item.value}
            displayValue={item.label}
          />
        )
      }
    )
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-quality menu-hidden' : 'settings-quality'
      } `}
    >
      <div>
        <ButtonBack displayValue="Quality" setShowMenu={setShowMenu} />
        {renderMenuItem()}
      </div>
    </div>
  )
}

export default MenuQuality
