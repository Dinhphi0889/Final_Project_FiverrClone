// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// import image 
import { Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10 } from './image.ts';

// import hooks
import { useEffect, useRef, useState } from 'react';


export default function SwiperSlideCustom() {

    // Create + use hooks   
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
            }
        });
        if (refSwiper.current) {
            observer.observe(refSwiper.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Swiper
                spaceBetween={10}
                slidesPerView={showItem}
                loopPreventsSliding
                ref={refSwiper}
            >
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Add talent to AI</p>
                            <p>AI Artists</p>
                        </div>
                        <img src={Item1}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Build your brand</p>
                            <p>Logo Design</p>
                        </div>
                        <img src={Item2}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Customize your site</p>
                            <p>WordPress</p>
                        </div>
                        <img src={Item3}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Share your message</p>
                            <p>Voice Over</p>
                        </div>
                        <img src={Item4}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Engage your audience</p>
                            <p>Video Explainer</p>
                        </div>
                        <img src={Item5}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Reach more customers</p>
                            <p>Social Media</p>
                        </div>
                        <img src={Item6}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Unlock growth online</p>
                            <p>SEO</p>
                        </div>
                        <img src={Item7}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Color your dreams</p>
                            <p>IIIustration</p>
                        </div>
                        <img src={Item8}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Go Global</p>
                            <p>Translation</p>
                        </div>
                        <img src={Item9}></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='tittle-item'>
                            <p>Learn your business</p>
                            <p>Data Entry</p>
                        </div>
                        <img src={Item10}></img>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};