
// import antd
import { Button, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'

import { Link, useNavigate } from 'react-router-dom';

// import css
import '../cssAdminPage.css'
export default function HeaderAdmin() {

    const navigate = useNavigate()
    const backHome =()=>{
        navigate('/')
    }
    return (
        <>
            <Layout
            >
                <Sider
                    className='side-bar-admin h-full'
                    breakpoint="lg"
                    collapsedWidth="0"
                    // style={{ height: 'auto' }}

                >
                    <div className="demo-logo-vertical" />
                    <div className='btn-logo-admin flex justify-center'>
                        <Button className=''
                        onClick={backHome}
                        ><i className="fa-solid fa-user-tie"></i>
                        </Button>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: 1,
                                label: <Link to=''>Users Management</Link>,
                            },
                            {
                                key: 2,
                                label: <Link to='manage-works'>Manage Works</Link>
                            },
                            {
                                key: 3,
                                label: <Link to='manage-job-types'>Manage Job Types</Link>
                            },
                            {
                                key: 4,
                                label: <Link to='manage-services'>Manage Services</Link>

                            },

                        ]} />
                </Sider>
            </Layout>
        </>
    )

}
