import { Link } from 'react-router-dom'
import MobileNav from './MobieNav'
import MainNav from './MainNav'

const Header = () => {
    return (
        <div className=' py-6 z-10'>

            <div className='container mx-auto flex justify-between items-center'>
                <Link to="/"
                    className='text-5xl font-bold tracking-tighter text-white'
                    style={{
                        fontFamily: 'Dancing Script',
                        marginLeft: '20px'
                    }}>
                    Dinner.com
                </Link>
                <div className='md:hidden'>
                    <MobileNav />
                </div>
                <div className='hidden md:block'>
                    <MainNav />
                </div>

            </div>

        </div>
    )
}
export default Header