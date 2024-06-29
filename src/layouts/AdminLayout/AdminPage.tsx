import { Outlet } from 'react-router-dom'
import HeaderAdmin from './_headerAdmin/HeaderAdmin'
import FooterAdmin from './_footerAdmin/FooterAdmin'

export default function AdminPage() {
    return (
        <div className=''>
            <div className='flex admin-page'>
                <HeaderAdmin />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
            {/* <FooterAdmin /> */}
        </div>
    )
}
