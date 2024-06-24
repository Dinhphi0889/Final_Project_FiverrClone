import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { TypeNameJob } from '../../../types/typeNameJob'
import { apiGetNameJob } from '../../../apis/apiGetNameJob'
import { detailOfListJobAction } from '../../../redux/slices/detailOfTypeJob.slice'

export default function ListNameJob() {
    const { nameJob } = useAppSelector((state) => state.nameJob)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const callApi = async (values: any,) => {
        const result = await apiGetNameJob(values)
        dispatch(detailOfListJobAction.setDetailOfTypeJob(result))
        navigate(`/list-job-and-type-job/result-for-${values}`, { state: { nameFind: values } })
    }

    const renderNameJobSearch = () => {
        if (nameJob) {
            return nameJob.map((item: TypeNameJob) => {
                const newData = item.congViec
                return Array(newData).map((item1: any) => {
                    return <li className='list-job'>
                        <a type='button' onClick={() => { callApi(item1.tenCongViec) }} >{item1.tenCongViec}</a>
                    </li>
                })
            })
        }
    }
    return (
        <ul>
            {renderNameJobSearch()}
        </ul>
    )
}
