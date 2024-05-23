import { useRoutes } from "react-router-dom"

const useRouteElement = () => {
    const element = useRoutes([
        {
            path: '',
            // import components chính chứa Outlet của layout
            element:'',
            children:[
                {
                    path:'',
                    // import components trong modules
                    element:''
                },
                {
                    path:'',
                    // import  import components trong modules
                    element:'',
                }
            ]
        }
    ])
    return element
}
export default useRouteElement