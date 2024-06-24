// import api
import { apiGetListJob } from '../../../apis/apiGetListJob'

// import hooks
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useEffect, useRef, useState } from 'react'

// import action
import { listJobAction } from '../../../redux/slices/listJob.slice'

// import typeListJob
import { TypeListJob } from '../../../types/typeListJob'

// import antd
import { Button, Card, Empty, Modal, Tag } from 'antd';

// import css
import './cssListJobPage.css'

// import video
import videoBanner from '../../../assets/video/videoBanner.mp4'

// import img
import { ImgAdroid, ImgHtml, ImgIos, ImgJavascript, ImgPython, ImgShopify, ImgUnity, ImgWix, ImgWordPress } from './imgListJob'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ListJobPage() {
  // create + use hooks
  const dispatch = useAppDispatch()
  const { listJob } = useAppSelector((state) => state.listJob)
  const { state } = useLocation()
  const [tittleBanner, setTittleBanner] = useState(String)
  const navigate = useNavigate()

  // use hooks call api
  useEffect(() => {
    callApiListJob()
  }, [state.jobId])

  // use hooks render tittle banner
  useEffect(() => {
    if (listJob) {
      listJob.map((tittleName: TypeListJob) => {
        setTittleBanner(tittleName.tenLoaiCongViec)
      })
    }
  }, [listJob])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null)
  // custom hooks to set slidesPerView
  const ref = useRef(null);
  const [showItem, setShowItem] = useState(4)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      let getEndPoint = entries[0].contentRect.width
      if (getEndPoint < 1024 && getEndPoint >= 768) {
        setShowItem(2)
      }
      else if (getEndPoint <= 768 && getEndPoint > 500) {
        setShowItem(2)
      }
      else if (getEndPoint <= 500) {
        setShowItem(1)
      } else {
        setShowItem(4)
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // set State modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // use hooks to set play & pause video
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play()
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  })

  // Call api
  const callApiListJob = async () => {
    if (state.jobId) {
      const result = await apiGetListJob(state.jobId)
      dispatch(listJobAction.setListJob(result))
    }
  }

  // Custom url
  const handleNavigate = (nameSplit: String, list: any) => {
    let customNameURL = nameSplit.split(' ').join('-')
    let lowerNameCustom = customNameURL.toLowerCase()
    let id = 0
    list.map((getId: any) => {
      id = getId.id
    })
    navigate(`/list-job-and-type-job/${lowerNameCustom}`, { state: { detailJobId: id } })
  }


  // custom Swiper
  const swiperCustom = () => {
    return <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={3}
      slidesPerView={showItem}
      navigation
      className='mb-12'
      ref={ref}
    >
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgPython}></img>
            <span className='text-item-programming-tech'>Python Developers</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgHtml}></img>
            <span className='text-item-programming-tech'>HTML & CSS Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgJavascript}></img>
            <span className='text-item-programming-tech'>JavaScript Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgWordPress}></img>
            <span className='text-item-programming-tech'>WordPress Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgShopify}></img>
            <span className='text-item-programming-tech'>Shopify Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgWix}></img>
            <span className='text-item-programming-tech'>Wix Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgIos}></img>
            <span className='text-item-programming-tech'>IOS App Development
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgAdroid}></img>
            <span className='text-item-programming-tech'>Android App Development
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
      <SwiperSlide>
        <Tag className='item-programming-tech bg-white'>
          <button className='btn-programming-tech'>
            <img src={ImgUnity}></img>
            <span className='text-item-programming-tech'>Unity Developers
            </span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Tag>
      </SwiperSlide>
    </Swiper>
  }


  const renderShowListJob = () => {

    if (listJob) {
      return listJob.map((item: TypeListJob) => {
        if (item.dsNhomChiTietLoai.length < 1){
          return <div className='empty my-24'>
          <Empty />
        </div>
        }
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
                    return (
                      <button onClick={() => (handleNavigate(detailName.tenChiTiet, detailItem.dsChiTietLoai))} className='btn-name-detail block text-base my-1'>
                        {detailName.tenChiTiet}
                      </button>
                    )
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
        <div className='banner-content'>
          <h1 className='tittle-banner'>{tittleBanner}</h1>
          <p>Build your brand. Grow your business.</p>
          <Button className='btn-play-banner' onClick={showModal}><i className="fa-solid fa-circle-play"></i><span className='text-button-play'>How Fiverr Works</span>
          </Button>
          {/* Modal show video */}
          <Modal className='modal-show-video' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <video controls src={videoBanner} ref={videoRef}>
              <source src={videoBanner} type='mp4' />
            </video>
          </Modal>
        </div>
      </div>
      <div className='programming-tech container mx-auto'>
        <h1 className='tittle-programming-tech text-2xl my-8 font-bold ml-2'>Most Popular in Programming & Tech</h1>
        {swiperCustom()}
      </div>
      <h1 className='tittle text-2xl my-8 font-bold ml-2'>Explore Programming & Tech</h1>
      <div className='show-list-job container mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {renderShowListJob()}
      </div>
    </section>
  )
}
