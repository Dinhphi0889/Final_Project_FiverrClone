import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { TypeDetailOfListJob } from '../../../types/typeDetailOfListJob';

import {useNavigate} from 'react-router-dom'

export default function BreadcrumbCustom() {

    const { detailOfTypeJob } = useAppSelector((state) => state.detailOfListJob)

    const navigate = useNavigate()

    const goBack = ()=>{
        navigate(-1)
    }

    const [nameBreadcrumb, setnameBreadcrumb] = useState(String)
    const [endPointBreadcrumb, setEndPointBreadcrumb] = useState(String)
    useEffect(() => {
        if (detailOfTypeJob) {
            let name = ''
            let nameEndPoint = ''
            detailOfTypeJob.map((getName: TypeDetailOfListJob) => {
                name = getName.tenLoaiCongViec
                nameEndPoint = getName.tenChiTietLoai
            })
            setnameBreadcrumb(name)
            setEndPointBreadcrumb(nameEndPoint)
        }

    },[detailOfTypeJob])

    return (
        <Breadcrumb
            items={[
                {
                    href: '/',
                    title: <HomeOutlined />,
                },
                {   
                    // href:``,
                    title: (
                        <>
                            <UserOutlined />
                            <span onClick={goBack}>{nameBreadcrumb}</span>
                        </>
                    ),
                },
                {
                    href: '',
                    title: endPointBreadcrumb,
                },
            ]}
        />
    );
}
