import { Button, Input } from 'antd';
import './styleHeader.css'
import { SearchProps } from 'antd/es/input/Search';
import { useQuery } from '@tanstack/react-query';
import { getMenuJob } from '../../apis/apiMenuJob';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';



const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export default function HeaderPage() {

  const { isLoading, data = [] } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenuJob
  })


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
                      return <li>
                        <a
                          className='txtDetail'
                          href='#'>
                          {itemDetailType.tenChiTiet}
                        </a>
                      </li>
                    })}
                  </ul>
                </div>
              }))}
            </div>
          ),
        },
      ];
      return <>
        <Dropdown key={index} menu={{ items }}>
          <p onClick={(e) => e.preventDefault()}>
            <Space>
              {itemData.tenLoaiCongViec}
            </Space>
          </p>
        </Dropdown>
      </>

    })
  }


  const handleScroll = () => {
    const search = document.getElementById('searchHeader')
    const header = document.querySelector('header')
    const listJob = document.getElementsByClassName('menu-list-job')[0]
    if (window.scrollY > 0) {
      header?.classList.add('changeColor');
      if (window.scrollY > 60) {
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

  return (
    <div>
      <div className='container'>
        <header>
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
            <Button className='btn-custom btn-join'>Join</Button>
          </nav>
        </header>
        <div className='menu-list-job hidden animate__animated animate__flipInX' style={{
          position: 'fixed',
          top: '88px',
          zIndex: '2',
          padding: '10px 50px',
          width: '100%'
        }}>
          {handleRenderMenuJob()}
        </div>
      </div>
    </div>
  );
}
