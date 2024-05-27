import { Outlet } from 'react-router-dom'
import HeaderPage from '../../components/_header/Header'
import FooterPage from '../../components/_footer/Footer'

export default function UserLayout() {
    return (<>
        <HeaderPage />
        <Outlet />
        <FooterPage />
    </>
    )
}
