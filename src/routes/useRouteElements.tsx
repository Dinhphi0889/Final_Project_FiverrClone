import { Navigate, Outlet, useNavigate, useRoutes } from "react-router-dom"
import UserLayout from "../layouts/UserLayout"
import HomePage from "../modules/UserLayout/HomePage/HomePage"
import DetailJobPage from "../modules/UserLayout/DetailJobPage/DetailJobPage"
import ListJobAndTypeJobPage from "../modules/UserLayout/ListJobAndTypeJobPage/ListJobAndTypeJobPage"
import ListJobPage from "../modules/UserLayout/ListJobPage/ListJobPage"
import ProfilePage from "../modules/UserLayout/ProfilePage/ProfilePage"
import AdminPage from "../layouts/AdminLayout/AdminPage"
import ManageWorks from "../modules/AdminLayout/manageWorks/ManageWorks"
import ManageJobTypes from "../modules/AdminLayout/manageJobType/ManageJobTypes"
import ManageServices from "../modules/AdminLayout/manageService/ManageServices"
import UserManagement from "../modules/AdminLayout/usersManagement.tsx/UserManagement"
import { useAppSelector } from "../redux/hooks"
import CommingSoon from "../CommingSoon"


const ProtectedAdminRoute = () => {
    const { currentUser } = useAppSelector((state) => state.user)
    return currentUser?.user.role === 'ADMIN' ? (<Outlet />) : (<Navigate to={'/'} />)
}

const useRouteElement = () => {
    const element = useRoutes([
        {
            path: '',
            element: <UserLayout />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                },
                {
                    path: 'list-job/:name',
                    element: <ListJobPage />
                },
                {
                    path: 'list-job-and-type-job/:name',
                    element: <ListJobAndTypeJobPage />
                },
                {
                    path: 'detail-job/',
                    element: <DetailJobPage />,
                },
                {
                    path: 'profile',
                    element: <ProfilePage />,
                }
            ]
        },
        {
            path: '/admin',
            element: <ProtectedAdminRoute />,
            children: [
                {
                    path: '',
                    element: <AdminPage />,
                    children: [
                        {
                            path: '',
                            element: <UserManagement />
                        },

                        {
                            path: 'manage-works',
                            element: <ManageWorks />
                        },
                        {
                            path: 'manage-job-types',
                            element: <ManageJobTypes />
                        },
                        {
                            path: 'manage-services',
                            element: <ManageServices />
                        },
                    ]
                },
            ]
        },
        {
            path:'/comming-soon',
            element:<CommingSoon/>
        }
    ])
    return element
}
export default useRouteElement