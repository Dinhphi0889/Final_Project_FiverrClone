// import hooks
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import css
import './styleHeader.css'

// import antd
import { Button, Drawer, Input, Modal } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import { getMenuJob } from '../../apis/apiMenuJob';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import FormLogin from './FormLogin';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e) => {
  console.log(_e, value)
}


export default function HeaderPage() {

  // Create + use hooks
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const changeHeader = document.querySelector('#changeHeader')
    const searchHeader = document.querySelector('.search')
    if (window.location.pathname === '/') {
      handleScroll()
    } else {
      changeHeader?.classList.add("fixed-header-page");
      searchHeader?.classList.add('set-search-header')
    }
  }, [window.location.pathname])


  // Handler show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Call api get list menu job
  const { data = [] } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenuJob
  })


  // Function handler show sidebar
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  // Render menu job
  const handleRenderMenuJob = () => {
    const dataSlice = data.slice(0, 11)
    return dataSlice.map((itemData, index) => {
      // itemData.tenLoaiCongViec
      const items: MenuProps['items'] = [
        {
          key: itemData.tenLoaiCongViec,
          label: (
            <div className='nameGroup'>
              {(itemData.dsNhomChiTietLoai.map((itemDetail) => {
                return <div>
                  <ul>
                    <p>{itemDetail.tenNhom}</p>
                    {itemDetail.dsChiTietLoai.map((itemDetailType) => {
                      return (
                        <li>
                          <a
                            className='txtDetail'
                            href='#'>
                            {itemDetailType.tenChiTiet}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              }))}
            </div>
          ),
        },
      ];
      return <>
        <SwiperSlide>
          <Dropdown key={index} menu={{ items }}>
            <p onClick={(e) => e.preventDefault()}>
              <Space>
                <Button onClick={() => handleNavigate(itemData.tenLoaiCongViec, itemData.id)}>
                  {itemData.tenLoaiCongViec}
                </Button>
              </Space>
            </p>
          </Dropdown >
        </SwiperSlide>
      </>
    })
  }

  // Event scroll change header
  const handleScroll = () => {
    const search = document.getElementById('searchHeader')
    const header = document.querySelector('header')

    const listJob = document.getElementsByClassName('menu-list-job')[0]
    if (window.scrollY > 0) {
      header?.classList.add('changeColor');
      if (window.scrollY > 180) {
        search?.classList.remove('hidden-search-navbar')
        listJob?.classList.remove('hidden')

      } else {
        search?.classList.add('hidden-search-navbar')
        listJob?.classList.add('hidden')
      }
    } else {
      header?.classList.remove('changeColor');
    }

  }
  window.addEventListener('scroll', handleScroll);


  // Custom Sidebar
  const customDrawer = () => {
    return <Drawer
      placement='left'
      closable={false}
      onClose={onClose}
      open={open}
      key='left'
      width={300}
    >
      <div className='show-sidebar'>
        <button className='bg-black text-white text-center text-lg font-bold px-6 py-2 my-3 flex rounded-md'>Join Fiverr</button>
        <div className='sidebar-menu'>
          <a href="">Sign In</a>
          <a href="">Browse categories</a>
          <a href="">Explore</a>
          <a href="">Fiverr Pro</a>
          <a href="">General</a>
          <a href="">Home</a>
          <a>English<i className="fa-solid fa-globe"></i></a>
          <a href="">US$ USD</a>

        </div>
      </div>
    </Drawer>
  }

  // Custom swiper
  const refSwiper = useRef(null);
  const [showItem, setShowItem] = useState(6)
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      let getEndPoint = entries[0].contentRect.width
      if (getEndPoint < 1024 && getEndPoint >= 768) {
        setShowItem(5)
      } else if (getEndPoint <= 768 && getEndPoint >= 640) {
        setShowItem(4)
      }
      else if (getEndPoint <= 640 && getEndPoint >= 500) {

        setShowItem(3)
      }
      else if (getEndPoint < 500) {
        setShowItem(2)
      } else {
        setShowItem(6)
      }
    });
    if (refSwiper.current) {
      observer.observe(refSwiper.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // handler change url
  const handleNavigate = (nameSplit: String, id: Number) => {
    let customNameURL = nameSplit.split(' ').join('-')
    let lowerNameCustom = customNameURL.toLowerCase()
    navigate(`/list-job/${lowerNameCustom}`, { state: { jobId: id } })
  }

  const modalLogin = () => {
    return <Modal title='Login' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {/* <h1 className='text-2xl font-semibold'>Login</h1> */}
      <FormLogin />
    </Modal>
  }

  return (
    <div id='changeHeader'>
      <div >
        <header>
          <Button className='pt-0' id='btn-sidebar' onClick={showDrawer} >
            <i className="fa-solid fa-bars"
            ></i>
          </Button>
          {customDrawer()}
          <p
            style={{
              fontWeight: 'bold'
            }}><a href='/'>fiverr</a><span style={{ color: 'green', fontSize: '45px' }}>.</span></p>
          <div id='searchHeader' className='hidden-search-navbar'>
            <Search
              className='search'
              placeholder="What service are you looking for today?"
              onSearch={onSearch}
            />
          </div>
          <nav className='menu-bar'>
            <a>Fiverr Pro<i className="fa-solid fa-chevron-down"></i></a>
            <a>Explore<i className="fa-solid fa-chevron-down"></i></a>
            <a><i className="fa-solid fa-globe"
              style={{ paddingRight: '8px' }}></i>English</a>
            <a>Become a Seller</a>
            <a>Sign Up</a>
            <Button onClick={showModal}
              className='btn-custom btn-join'>Join
            </Button>

          </nav>
        </header>
        {/* show menu job */}
        <div className='menu-list-job hidden animate__animated animate__flipInX' >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={showItem}
            navigation
            ref={refSwiper}
            style={{ maxWidth: '1400px' }}
          >
            {handleRenderMenuJob()}
          </Swiper>
        </div>
      </div>
      {modalLogin()}
    </div>
  );
}
