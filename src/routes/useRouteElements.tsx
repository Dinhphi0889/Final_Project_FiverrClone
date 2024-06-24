import { useRoutes } from "react-router-dom"
import UserLayout from "../layouts/UserLayout"
import HomePage from "../modules/UserLayout/HomePage/HomePage"
import DetailJobPage from "../modules/UserLayout/DetailJobPage/DetailJobPage"
import ListJobAndTypeJobPage from "../modules/UserLayout/ListJobAndTypeJobPage/ListJobAndTypeJobPage"
import ListJobPage from "../modules/UserLayout/ListJobPage/ListJobPage"
import ProfilePage from "../modules/UserLayout/ProfilePage/ProfilePage"

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
        }
    ])
    return element
}
export default useRouteElement