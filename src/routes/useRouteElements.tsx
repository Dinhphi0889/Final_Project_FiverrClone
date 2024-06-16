import { useRoutes } from "react-router-dom"
import UserLayout from "../layouts/UserLayout"
import HomePage from "../modules/UserLayout/HomePage/HomePage"
import DetailJobPage from "../modules/UserLayout/DetailJobPage/DetailJobPage"
import ListJobAndTypeJobPage from "../modules/UserLayout/ListJobAndTypeJobPage/ListJobAndTypeJobPage"
import ListJobPage from "../modules/UserLayout/ListJobPage/ListJobPage"

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
                    path: 'list-job/:id',
                    element: <ListJobPage />
                },
                {
                    path: 'list-job-and-type-job',
                    element: <ListJobAndTypeJobPage />
                },
                {
                    path: 'detail-job',
                    element: <DetailJobPage />,
                }
            ]
        }
    ])
    return element
}
export default useRouteElement