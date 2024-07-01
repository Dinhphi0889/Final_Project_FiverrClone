// import hooks
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'
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
import { Button, Drawer, Input, Modal, Dropdown, Space, Avatar, Badge } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import { getMenuJob } from '../../../apis/apiMenuJob';
import type { MenuProps } from 'antd';

// import form login & register
import FormLogin from '../../../modules/AuthenLayout/FormLogin';
import FormRegister from '../../../modules/AuthenLayout/FormRegister';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { apiGetNameJob } from '../../../apis/apiGetNameJob';

import { detailOfListJobAction } from '../../../redux/slices/detailOfTypeJob.slice';



const { Search } = Input;



export default function HeaderPage() {

  // Create + use hooks
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSwitchImgModal, setIsSwitchImgModal] = useState(false)
  const [getWidth, setGetWidth] = useState(0)

  const { width } = useWindowSize()
  const dispatch = useAppDispatch()

  // search detail job
  const onSearch: SearchProps['onSearch'] = async (value) => {
    if (value !== "" && value.trim()) {
      const result = await apiGetNameJob(value)
      dispatch(detailOfListJobAction.setDetailOfTypeJob(result))
      navigate(`/list-job-and-type-job/result-for-${value}`, { state: { nameFind: value } })
    }
  }

  //use hooks add class to set css
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

  // get user form redux
  const { currentUser } = useAppSelector((state) => state.user)

  // custom name Avatar
  const [getNameAvatar, setGetNameAvatar] = useState('')
  useEffect(() => {

    if (currentUser) {
      let getNameUser = currentUser.user?.name
      let getNameUserSplit = getNameUser?.charAt(0)
      setGetNameAvatar(getNameUserSplit?.toUpperCase())
    }
  }, [currentUser])


  // function props to switch form login register
  const switchModal = (boolean: any, none?: any, block?: any) => {
    let formRegister = document.querySelector('.form-register') as HTMLElement
    let formLogin = document.querySelector('.form-login') as HTMLElement

    if (getWidth > 900) {
      setIsSwitchImgModal(boolean)

    } else {
      formRegister.style.display = none
      formLogin.style.display = block
    }
  }
  useEffect(() => {
    let formRegister = document.querySelector('.form-register') as HTMLElement
    let formLogin = document.querySelector('.form-login') as HTMLElement
    if (width > 900) {
      setGetWidth(1000)
    } else {
      setGetWidth(0)
    }
    if (getWidth > 900 && formLogin && formRegister) {
      formRegister.style.display = 'block'
      formLogin.style.display = 'block'
    } else if (getWidth < 900 && formLogin && formRegister) {
      formRegister.style.display = 'none'
      formLogin.style.display = 'block'
    }
  }, [width])



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

  const handleCloseModalProps = (boolean: any) => {
    setIsModalOpen(boolean)
  }

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
                            className='txt-detail'
                            type='button'
                            onClick={() => handleNavigate('list-job-and-type-job', itemDetailType.tenChiTiet, itemDetailType.id, itemDetailType.tenChiTiet)}>

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
                <a type='button' onClick={() => handleNavigate('list-job', itemData.tenLoaiCongViec, itemData.id, null)}>
                  {itemData.tenLoaiCongViec}
                </a>
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
        <div className='sidebar-menu'>
          {currentUser ?
            (
              <div>Logined</div>
            ) : (
              <>
                <button className='bg-black text-white text-center text-lg font-bold px-6 py-2 my-3 flex rounded-md'>Join Fiverr</button>
                <a href="">Sign In</a>
                <a href="">Browse categories</a>
                <a href="">Explore</a>
                <a href="">Fiverr Pro</a>
                <a href="">General</a>
                <a href="">Home</a>
                <a>English<i className="fa-solid fa-globe"></i></a>
                <a href="">US$ USD</a>
              </>
            )}

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
  const handleNavigate = (url: String, nameSplit: String, id: Number, nameFind: any) => {
    let customNameURL = nameSplit.split(' ').join('-')
    let lowerNameCustom = customNameURL.toLowerCase()
    navigate(`/${url}/${lowerNameCustom}`, { state: { jobId: id, nameFind } })
  }

  // modal login & register
  const modalCustom = () => {
    return <Modal
      className='modal-login relative'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={870}
    >

      <div className='flex flex-row-reverse justify-around'>
        <div className='form-login'>
          <h1 className='tittle-form-login text-center text-3xl font-semibold my-3'>Login</h1>
          <FormLogin setSwitchLogin={switchModal} closeModal={handleCloseModalProps} />
        </div>


        <div className='form-register'>
          <h1 className='tittle-form-login text-center text-3xl font-semibold my-3'>Register</h1>
          <FormRegister setSwitchRegister={switchModal} />
        </div>
        <div className={isSwitchImgModal ? 'css-img-modal switch-img-modal' : 'css-img-modal img-form'}>
          <div className='text-img px-10 py-10'>
            <h1 className='font-bold text-3xl my-5 text-white'>Success starts here
            </h1>
            <div className='text-lg'>
              <p className='text-white my-3'><i className="fa-solid fa-check pr-2"></i>Over 600 categories
              </p>
              <p className='text-white my-3'><i className="fa-solid fa-check pr-2"></i>Pay per project, not per hour
              </p>
              <p className='text-white my-3'><i className="fa-solid fa-check pr-2"></i>Access to talent and businesses across the globe
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  }

  // handler Logout
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <>
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
            <div
              id={currentUser ? 'searchHeaderLogin' : 'searchHeader'}
              className='hidden-search-navbar'>
              <Search
                className='search'
                placeholder="What service are you looking for today?"
                onSearch={onSearch}
              />
            </div>
            <nav className={currentUser ? 'menu-bar-login' : 'menu-bar'}>

              {currentUser ? (
                <>
                  <a>
                    <i className="fa-regular fa-bell text-xl"></i>
                  </a>
                  <a>
                    <i className="fa-regular fa-envelope text-xl"></i>
                  </a>
                  <a>
                    <i className="fa-regular fa-heart text-xl"></i>
                  </a>
                  <a type='button' className='text-lg font-semibold'>Orders</a>
                  {currentUser.user.role === 'ADMIN' ? (<Dropdown
                    menu={{
                      items: [
                        { label: <a href='/profile'>Account Setting</a>, key: 0 },
                        { label: <a onClick={handleLogout}>Logout</a>, key: 1 },
                        { label: <a href='/admin'>Go To Admin</a>, key: 2 }

                      ]
                    }}
                  ><Space size="large">
                      <Badge dot
                        status='success'
                        offset={[-7, 35]}>
                        <Avatar
                          className='text-xl'
                          style={{
                            cursor: 'pointer',
                            verticalAlign: 'middle',
                            backgroundColor: 'orange'
                          }} size="large">
                          {getNameAvatar}
                        </Avatar>
                      </Badge>
                    </Space></Dropdown>) : (<Dropdown
                      menu={{
                        items: [
                          { label: <a href='/profile'>Account Setting</a>, key: 0 },
                          { label: <a href='' onClick={handleLogout}>Logout</a>, key: 1 },
                        ]
                      }}
                    ><Space size="large">
                        <Badge dot
                          status='success'
                          offset={[-7, 35]}>
                          <Avatar
                            className='text-xl'
                            style={{
                              cursor: 'pointer',
                              verticalAlign: 'middle',
                              backgroundColor: 'orange'
                            }} size="large">
                            {getNameAvatar}
                          </Avatar>
                        </Badge>
                      </Space></Dropdown>)}
                </>

              ) : (
                <>
                  <a>Fiverr Pro<i className="fa-solid fa-chevron-down"></i></a>
                  <a>Explore<i className="fa-solid fa-chevron-down"></i></a>
                  <a><i className="fa-solid fa-globe"
                    style={{ paddingRight: '8px' }}></i>English</a>
                  <a>Become a Seller</a>
                  <a>Sign Up</a>
                  <Button onClick={showModal}
                    className='btn-custom btn-join'>Join
                  </Button>
                </>
              )}



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
      </div>
      <div className='form-modal'>
        {modalCustom()}
      </div>
    </>

  );
}
