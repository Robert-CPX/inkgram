import { bottombarLinks } from '@/constants'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const { pathname } = useLocation()
  return (
    <section className='flex-between sticky bottom-0 z-50 w-full rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route
        return (
          <Link to={link.route} key={link.label} className={`flex-center flex-col gap-1 p-2 transition ${isActive && 'rounded-[10px] bg-primary-500'}`}>
            <img src={link.imgURL} alt={link.label} width={16} height={16} className={`${isActive && 'invert-white'}`} />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar
