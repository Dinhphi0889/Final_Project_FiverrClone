import { useAppSelector } from '../../../redux/hooks'
import { TypeNameJob } from '../../../types/typeNameJob'

export default function ListNameJob() {
    const { nameJob } = useAppSelector((state) => state.nameJob)
    const renderNameJobSearch = () => {
        if (nameJob) {
            return nameJob.map((item: TypeNameJob) => {
                const newData = item.congViec
                return Array(newData).map((item1: any) => {
                    return <li className='list-job'>
                        <a href=''>{item1.tenCongViec}</a>
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
