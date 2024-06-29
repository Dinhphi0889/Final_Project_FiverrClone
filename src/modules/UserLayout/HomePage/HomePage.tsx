// import modules
import React, { useState } from "react";
import { Carousel, Input } from "antd";
import { nameJobAction } from "../../../redux/slices/nameJob.slice.ts";

// import image
import {
  ImageBanner1,
  ImageBanner2,
  ImageBanner3,
  ImageBanner4,
  ImageBanner5,
  ImageLogo1,
  ImageLogo2,
  ImageLogo3,
  ImageLogo4,
  ImageLogo5,
  ImageGoogle,
  ImageMeta,
  ImageNetflix,
  ImagePandg,
  ImagePaypal,
  Item1,
  Item2,
  Item3,
  Item4,
  Item5,
  Item6,
  Item7,
  Item8,
  Item9,
  Item10,
  Video1,
  Video2,
  ImgVideo1,
  ImgVideo2,
  ImageItem1,
  ImageItem2,
  ImageItem3,
  ImageItem4,
  ImageItem5,
  ImageItem6,
  ImageItem7,
  ImageItem8,
  ImageItem9,
  ImageItem10,
} from "./image.ts";

// import file css
import "./cssHomePage.css";

// import api
import { apiGetNameJob } from "../../../apis/apiGetNameJob.ts";

// import hooks
import { useAppDispatch } from "../../../redux/hooks.ts";
import ListNameJob from "./ListNameJob.tsx";

const { Search } = Input;

// render carousel
const CarouselCustom: React.FC = () => (
  <Carousel effect="fade" autoplay>
    <div className="item">
      <img className="img-carousel" src={ImageBanner1}></img>
      <div className="tag-name">
        <div className="tag-name-img">
          <img src={ImageLogo1}></img>
        </div>
        <div className="tag-name-info">
          <p className="span-name">@jenny</p>
          <p className="span-job">Children's Voice Over</p>
        </div>
        <span className="number-start">
          5
          <i
            className="fa-solid fa-star"
            style={{
              fontSize: "14px",
              color: "white",
            }}
          ></i>
        </span>
      </div>
    </div>
    <div className="item">
      <img className="img-carousel" src={ImageBanner2}></img>

      <div className="tag-name">
        <div className="tag-name-img">
          <img src={ImageLogo2}></img>
        </div>
        <div className="tag-name-info">
          <p className="span-name">@colinstark</p>
          <p className="span-job">Creative Director</p>
        </div>
        <span className="number-start">
          5
          <i
            className="fa-solid fa-star"
            style={{
              fontSize: "14px",
              color: "white",
            }}
          ></i>
        </span>
      </div>
    </div>
    <div className="item">
      <img className="img-carousel" src={ImageBanner3}></img>
      <div className="tag-name">
        <div className="tag-name-img">
          <img src={ImageLogo3}></img>
        </div>
        <div className="tag-name-info">
          <p className="span-name">Scarlett</p>
          <p className="span-job">Business Founder</p>
        </div>
      </div>
    </div>
    <div className="item">
      <img className="img-carousel" src={ImageBanner4}></img>
      <div className="tag-name">
        <div className="tag-name-img">
          <img src={ImageLogo4}></img>
        </div>
        <div className="tag-name-info">
          <p className="span-name">Jordanruncie_</p>
          <p className="span-job">Production Assistant</p>
        </div>
        <span className="number-start">
          5
          <i
            className="fa-solid fa-star"
            style={{
              fontSize: "14px",
              color: "white",
            }}
          ></i>
        </span>
      </div>
    </div>
    <div className="item">
      <img className="img-carousel" src={ImageBanner5}></img>
      <div className="tag-name">
        <div className="tag-name-img">
          <img src={ImageLogo5}></img>
        </div>
        <div className="tag-name-info">
          <p className="span-name">Christina</p>
          <p className="span-job">Jewelry Shop Owner</p>
        </div>
        <span className="number-start">
          5
          <i
            className="fa-solid fa-star"
            style={{
              fontSize: "14px",
              color: "white",
            }}
          ></i>
        </span>
      </div>
    </div>
  </Carousel>
);

// render slide
const SlideItem: React.FC = () => (
  <Carousel arrows infinite={true}>
    <div className="carousel-item">
      <div>
        <div className="tittle-item">
          <p>Add talent to AI</p>
          <p>AI Artists</p>
        </div>
        <img src={Item1}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Build your brand</p>
          <p>Logo Design</p>
        </div>
        <img src={Item2}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Customize your site</p>
          <p>WordPress</p>
        </div>
        <img src={Item3}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Share your message</p>
          <p>Voice Over</p>
        </div>
        <img src={Item4}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Engage your audience</p>
          <p>Video Explainer</p>
        </div>
        <img src={Item5}></img>
      </div>
    </div>
    <div className="carousel-item">
      <div>
        <div className="tittle-item">
          <p>Reach more customers</p>
          <p>Social Media</p>
        </div>
        <img src={Item6}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Unlock growth online</p>
          <p>SEO</p>
        </div>
        <img src={Item7}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Color your dreams</p>
          <p>IIIustration</p>
        </div>
        <img src={Item8}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Go Global</p>
          <p>Translation</p>
        </div>
        <img src={Item9}></img>
      </div>
      <div>
        <div className="tittle-item">
          <p>Learn your business</p>
          <p>Data Entry</p>
        </div>
        <img src={Item10}></img>
      </div>
    </div>
  </Carousel>
);

export default function HomePage() {
  // create + use hooks
  const dispatch = useAppDispatch();
  const [showNameJob, setShowNameJob] = useState("none");

  // create + use event handlers
  const onSearch = async (event: any) => {
    if (event.target.value !== "" && event.target.value.trim()) {
      const result = await apiGetNameJob(event.target.value);
      dispatch(nameJobAction.setNameJob(result));
      setShowNameJob("block");
    } else if (event.target.value === "") {
      setShowNameJob("none");
    }
  };

  return (
    <>
      {/* Carousel */}
      <section className="carousel container mx-auto relative">
        <div className="form-carousel">
          <h1 className="form-carousel-tittle">
            Find the right <em>freelance</em>
            <br /> service, right away
          </h1>
          <Search
            className="form-carousel-input"
            placeholder="Search for any service..."
            onChange={onSearch}
          />
          <div
            className="show-listNameJob rounded-md h-64 shadow-lg"
            style={{ display: showNameJob }}
          >
            <ListNameJob />
          </div>
          {/* <div className='popular-carousel'>
          <span className='popular-carousel-span'>Popular: </span>
          <button className='form-carousel-btn'>Website Design</button>
          <button className='form-carousel-btn'>WordPress</button>
          <button className='form-carousel-btn'>Logo Design</button>
          <button className='form-carousel-btn'>AI Services</button>
        </div>
        Item Trusted */}

          <div className="info-trust">
            <div className="trust-by container mx-auto flex items-center">
              <span className="trust-by-span">Trusted By:</span>
              <img className="trust-by-logo" src={ImageMeta}></img>
              <img className="trust-by-logo" src={ImageGoogle}></img>
              <img className="trust-by-logo" src={ImageNetflix}></img>
              <img className="trust-by-logo" src={ImagePandg}></img>
              <img className="trust-by-logo" src={ImagePaypal}></img>
            </div>
          </div>
        </div>
        {/* <CarouselCustom /> */}
      </section>

      {/* Popular Service */}
      <section className="item-service">
        <div className="container mx-auto">
          <p className="tittle-popular-services">Popular services</p>
          <div className="item-popular-services">
            <SlideItem />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="content">
        <div className="background-content">
          <div className="container mx-auto">
            <div className="content-top grid grid-flow-cols lg:grid-cols-2 md:grid-cols-1 md:gap-10 ">
              <div className="text-content lg:mx-4 mx-10">
                <h1 className="tittle-content">
                  A whole world of freelance talent at your fingertips
                </h1>
                <ul>
                  <li className="item-content">
                    <i className="fa-regular fa-circle-check"></i>
                    <span className="text-content-tittle">
                      The best for every budget
                    </span>
                    <p>
                      Find high-quanlity services at every price point. No
                      hourly rates, just project-based pricing.
                    </p>
                  </li>
                  <li className="item-content">
                    <i className="fa-regular fa-circle-check"></i>
                    <span className="text-content-tittle">
                      Quality work done quickly
                    </span>
                    <p>
                      Find the right freelancer to begin working on your project
                      within minutes
                    </p>
                  </li>
                  <li className="item-content">
                    <i className="fa-regular fa-circle-check"></i>
                    <span className="text-content-tittle">
                      Protected payments, every time
                    </span>
                    <p>
                      Always know what you'll pay upfront. Your payment isn't
                      released until you approve the work
                    </p>
                  </li>
                  <li className="item-content">
                    <i className="fa-regular fa-circle-check"></i>
                    <span className="text-content-tittle">24/7 support</span>
                    <p>
                      Questions? Our round-the-clock support team is available
                      to help anytime, anywhere
                    </p>
                  </li>
                </ul>
              </div>
              <div className="video-content mx-5 flex items-center justify-center">
                <video src={Video1} controls poster={ImgVideo1}></video>
              </div>
            </div>
          </div>
        </div>
        <div className="content-bottom container mx-auto grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="video-content">
            <video src={Video2} controls poster={ImgVideo2}></video>
          </div>
          <div className="text-content">
            <p className="name-content-bottom">
              Kay Kim, Co-Founder | <span className="text-bold">rooted</span>
            </p>
            <em className="text-content-bottom">
              "It's extremely execiting that Fiverr has freelancers from all
              over the world - it broadens the talent pool. One of the best
              things about Fiverr is that while we're sleeping, someone's
              working."
            </em>
          </div>
        </div>
      </section>

      {/* Item Menu */}
      <section className="item-menu">
        <div className="container mx-auto">
          <h1 className="tittle-item">You need it, we've got it</h1>
          <ul className="grid grid-flow-cols grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 place-content-center">
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem1}></img>
                <p>Graphics & Design</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem2}></img>
                <p>Digital Marketing</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem3}></img>
                <p>Writing & Translation</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem4}></img>
                <p>Video & Animation</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem5}></img>
                <p>Music & Audio</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem6}></img>
                <p>Programming & Tech</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem7}></img>
                <p>Business</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem8}></img>
                <p>Lifestyle</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem9}></img>
                <p>Data</p>
              </a>
            </li>
            <li className="list-item-menu">
              <a href="">
                <img src={ImageItem10}></img>
                <p>Photography</p>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
