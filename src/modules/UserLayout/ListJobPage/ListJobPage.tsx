import { apiGetListJob } from '../../../apis/apiGetListJob'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { listJobAction } from '../../../redux/slices/listJob.slice'
import { useEffect, useState } from 'react'
import { TypeListJob } from '../../../types/typeListJob'
import { Card } from 'antd';
// import css
import './cssListJobPage.css'
import ImgBanner from '../../../assets/img/banner_listjob.jpg'


const { Meta } = Card;

export default function ListJobPage() {
  // create + use hooks
  const dispatch = useAppDispatch()
  const { listJob } = useAppSelector((state) => state.listJob)
  const { id } = useParams()
  const [tittleBanner, setTittleBanner] = useState(String)
  useEffect(() => {
    callApiListJob()
  }, [id])

  useEffect(() => {
    if (listJob) {
      listJob.map((tittleName: TypeListJob) => {
        setTittleBanner(tittleName.tenLoaiCongViec)
      })
    }
  }, [listJob])

  const callApiListJob = async () => {
    if (id) {
      const result = await apiGetListJob(id)
      dispatch(listJobAction.setListJob(result))
    }
  }

  const renderShowListJob = () => {
    if (listJob) {
      // setTittleBanner(listJob)
      return listJob.map((item: TypeListJob) => {
        return item.dsNhomChiTietLoai.map((detailItem) => {

          return (
            <div className='item-list-job'>
              <Card
                hoverable
                style={{ width: 340 }}
                cover={<img src={detailItem.hinhAnh} />}
                className='item-list-job container mb-5 px-5'
              >
                <p className='text-2xl font-bold mb-3'>{detailItem.tenNhom}</p>
                {detailItem.dsChiTietLoai.map((detailName) => {
                  return <a href='/detail-job' className='block text-base my-1'>
                    {detailName.tenChiTiet}
                  </a>
                })}
              </Card>
            </div>
          )
        })

      })
    }
  }
  return (
    <section className='container mx-auto'>
      <div className='banner my-10 '>
        <img className='rounded-lg' src={ImgBanner}></img>
        <div className='banner-content'>
          <h1 className='tittle-banner'>{tittleBanner}</h1>
          <p>Build your brand. Grow your business.</p>
        </div>
      </div>
      <div className='show-list-job container mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:mx-auto '>
        {renderShowListJob()}
      </div>
    </section>
  )
}
