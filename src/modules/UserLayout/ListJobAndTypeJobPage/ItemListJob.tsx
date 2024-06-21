import { Avatar, Card, Rate } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import { CongViec, TypeDetailOfListJob } from '../../../types/typeDetailOfListJob';
import { Empty } from 'antd';

const { Meta } = Card;
export default function ItemListJob() {

    const { detailOfTypeJob } = useAppSelector((state) => state.detailOfListJob)
    if (detailOfTypeJob.length > 0) {
        return detailOfTypeJob.map((item: TypeDetailOfListJob) => {
            return Array(item.congViec).map((getDetail: CongViec) => {
                return (
                    <Card
                        className='item-card mx-5 my-5 pb-10'
                        cover={
                            <img className='img-detail'
                                alt="example"
                                src={getDetail.hinhAnh}
                            />
                        }
                        actions={[
                            <div className='flex justify-between mx-3 text-lg border-b-2'>
                                <i className="fa-regular fa-heart"></i>
                                <span className=''>{`Prices : $${getDetail.giaTien}`}</span>
                            </div>
                        ]}
                    >
                        <Meta
                            className='tittle-card-detail'
                            avatar={<Avatar src={item.avatar} />}
                            title={`Ad by: ${item.tenNguoiTao.toUpperCase()}`}
                        />
                        <div className='flex flex-col'>
                            <a className='desc-detail mt-3'>{getDetail.tenCongViec}</a>
                            <div>
                                <Rate disabled defaultValue={getDetail.saoCongViec} />
                                <span className='ml-2 evaluate'>{`(${getDetail.danhGia})`}</span>

                            </div>
                        </div>

                        {/* <Meta
                            description={`$${getDetail.giaTien}`} 
                            /> */}
                    </Card>
                )
            })
        })
    } else {
        return <div className='empty my-24'>
            <Empty />
        </div>
    }

}
