import { Outlet } from 'react-router-dom'
import HeaderPage from './_header/Header'
import FooterPage from './_footer/Footer'

export default function UserLayout() {
    return (<>
        <HeaderPage />
        <div style={{marginTop:'150px'}}>

        <Outlet />
        <FooterPage />
        </div>
    </>
    )
}
