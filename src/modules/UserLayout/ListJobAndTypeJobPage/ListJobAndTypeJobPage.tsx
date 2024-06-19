
// import hooks
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// import api
import { apiGetDetailOfTypeJob } from "../../../apis/apiGetTypeOfListJob";

// import action
import { detailOfListJobAction } from "../../../redux/slices/detailOfTypeJob.slice";

// import css
import './cssListJobAndTypeJob.css'

// import components custom
import BreadcrumbCustom from "./BreadcrumbCustom";

export default function ListJobAndTypeJobPage() {

  // Create hooks
  const { state } = useLocation()
  const dispatch = useAppDispatch()
  const { detailOfTypeJob } = useAppSelector((state) => state.detailOfListJob)

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

  const handleShowListJob = () => {
    if(detailOfTypeJob){
      detailOfTypeJob.map((detail)=>{
        console.log(detail)
      })
    }
  }
  handleShowListJob()
  return (
    <div className="container mx-auto">
      <BreadcrumbCustom />
      <h1 className="tittle-type-job">Desktop Applications</h1>

    </div>
  )
}
