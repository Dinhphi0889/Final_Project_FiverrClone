import React from 'react';
import { Carousel, Input } from 'antd';
import ImageBanner1 from '../../../assets/img/banner_1.png'
import ImageBanner2 from '../../../assets/img/banner_2.png'
import ImageBanner3 from '../../../assets/img/banner_3.png'
import ImageBanner4 from '../../../assets/img/banner_4.png'
import ImageBanner5 from '../../../assets/img/banner_5.png'
import ImageLogo1 from '../../../assets/img/logo_banner1.jpg'
import ImageLogo2 from '../../../assets/img/logo_banner2.jpg'
import ImageLogo3 from '../../../assets/img/logo_banner3.jpg'
import ImageLogo4 from '../../../assets/img/logo_banner4.jpg'
import ImageLogo5 from '../../../assets/img/logo_banner5.jpg'
import ImageGoogle from '../../../assets/img/google.61e78c8.png'
import ImageMeta from '../../../assets/img/meta.12b5e5c.png'
import ImageNetflix from '../../../assets/img/netflix.96c5e3f.png'
import ImagePandg from '../../../assets/img/pandg.0f4cfc2.png'
import ImagePaypal from '../../../assets/img/paypal.305e264.png'
import './cssHomePage.css'
import type { SearchProps } from 'antd/es/input/Search';



const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  console.log(value)
};


// Design layout
const App: React.FC = () => (
  <Carousel
    autoplay
  >
    <div className='item '>
      <img className='img-caoursel'
        src={ImageBanner1}>
      </img>
      <div className='tag-name'
        style={{
          right: '82%'
        }}>
        <div className='tag-name-img'>
          <img src={ImageLogo1}>
          </img>
        </div>
        <div className='tag-name-info'>
          <p className='span-name'>@jenny</p>
          <p className='span-job'>Children's Voice Over</p>
        </div>
        <span className='number-start'>5
          <i className="fa-solid fa-star" style={{
            fontSize: '14px',
            color: 'white',
          }}></i>
        </span>
      </div>
    </div>
    <div className='item'>
      <img className='img-caoursel' src={ImageBanner2}>
      </img>

      <div className='tag-name' style={{
        right: '73%'
      }}>
        <div className='tag-name-img'>
          <img src={ImageLogo2}>
          </img>
        </div>
        <div className='tag-name-info'>
          <p className='span-name'>@colinstark</p>
          <p className='span-job'>Creative Director</p>
        </div>
        <span className='number-start'>5
          <i className="fa-solid fa-star" style={{
            fontSize: '14px',
            color: 'white',
          }}></i>
        </span>
      </div>
    </div>
    <div className='item'
    >
      <img className='img-caoursel' src={ImageBanner3}>
      </img>
      <div className='tag-name' style={{
        right: '64%'
      }}>
        <div className='tag-name-img'>
          <img src={ImageLogo3}>
          </img>
        </div>
        <div className='tag-name-info'>
          <p className='span-name'>Scarlett</p>
          <p className='span-job'>Business Founder</p>
        </div>
      </div>

    </div>
    <div className='item'>
      <img className='img-caoursel' src={ImageBanner4}>
      </img>
      <div className='tag-name' style={{
        right: '55%'
      }}>
        <div className='tag-name-img'>
          <img src={ImageLogo4}>
          </img>
        </div>
        <div className='tag-name-info'>
          <p className='span-name'>Jordanruncie_</p>
          <p className='span-job'>Production Assistant</p>
        </div>
        <span className='number-start'>5
          <i className="fa-solid fa-star" style={{
            fontSize: '14px',
            color: 'white',
          }}></i>
        </span>
      </div>

    </div>
    <div className='item'>
      <img src={ImageBanner5}></img>
      <div className='tag-name' style={{
        right: '46%'
      }}>
        <div className='tag-name-img'>
          <img src={ImageLogo5}>
          </img>
        </div>
        <div className='tag-name-info'>
          <p className='span-name'>Christina</p>
          <p className='span-job'>Jewelry Shop Owner</p>
        </div>
        <span className='number-start'>5
          <i className="fa-solid fa-star" style={{
            fontSize: '14px',
            color: 'white',
          }}></i>
        </span>
      </div>
    </div>
  </Carousel>
);

export default function HomePage() {


  return (<>
    <section className="carousel"
      style={{
        position: 'relative',
      }}>
      <div className='form-carousel'
        style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          zIndex: '1',
        }}>
        <h1 className='form-carousel-tittle'
        >Find the right <em>freelance</em><br /> service, right away</h1>
        <Search className='form-carousel-input' placeholder='Search for any service...'
          onSearch={onSearch}
        />

        <div className='popular-carousel'>
          <span className='popular-carousel-span'>Popular: </span>
          <button className='form-carousel-btn'>Website Design</button>
          <button className='form-carousel-btn'>WordPress</button>
          <button className='form-carousel-btn'>Logo Design</button>
          <button className='form-carousel-btn'>AI Services</button>
        </div>
      </div>
      <App />
    </section>
    <section className='info-trust'>
      <div className='trust-by md:container mx-auto flex items-center'>
        <span className='trust-by-span'>Trusted By:</span>
        <img className='trust-by-logo' src={ImageMeta}></img>
        <img className='trust-by-logo' src={ImageGoogle}></img>
        <img className='trust-by-logo' src={ImageNetflix}></img>
        <img className='trust-by-logo' src={ImagePandg}></img>
        <img className='trust-by-logo' src={ImagePaypal}></img>
      </div>
    </section>
    <section>
      <div className='container mx-auto'>
        <p className='tittle-popular-services'>Popular services</p>
      </div>
    </section>
  </>
  )
}
