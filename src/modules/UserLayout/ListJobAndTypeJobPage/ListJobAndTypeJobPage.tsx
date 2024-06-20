
// import hooks
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";

// import api
import { apiGetDetailOfTypeJob } from "../../../apis/apiGetTypeOfListJob";

// import action
import { detailOfListJobAction } from "../../../redux/slices/detailOfTypeJob.slice";

// import css
import './cssListJobAndTypeJob.css'

// import components custom
import BreadcrumbCustom from "./BreadcrumbCustom";
import ItemListJob from "./ItemListJob";

export default function ListJobAndTypeJobPage() {

  // Create hooks
  const { state } = useLocation()
  const dispatch = useAppDispatch()


  // Function handler call api
  const callApiDetailOfTypeJob = async () => {
    if (state.detailJobId) {
      const result = await apiGetDetailOfTypeJob(state.detailJobId)
      dispatch(detailOfListJobAction.setDetailOfTypeJob(result))
    }
  }
  useEffect(() => {
    callApiDetailOfTypeJob()
  }, [state.detailJobId])

  return (
    <div className="container mx-auto">
      <BreadcrumbCustom/>
      <h1 className="tittle-type-job">Desktop Applications</h1>
      <div className='item-detail-card grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2'>
        <ItemListJob />
      </div>
    </div>
  )
}
