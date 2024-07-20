
// import hooks
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// import api
import { apiGetDetailOfTypeJob } from "../../../apis/apiGetTypeOfListJob";

// import action
import { detailOfListJobAction } from "../../../redux/slices/detailOfTypeJob.slice";

// import css
import './cssListJobAndTypeJob.css'

// import components custom
import BreadcrumbCustom from "./BreadcrumbCustom";
import ItemListJob from "./ItemListJob";
import { TypeDetailOfListJob } from "../../../types/typeDetailOfListJob";

// import antd
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export default function ListJobAndTypeJobPage() {

  // Create hooks
  const { state } = useLocation()

  const dispatch = useAppDispatch()
  const { detailOfTypeJob } = useAppSelector((state) => state.detailOfListJob)
  const [isID, setIsID] = useState()

  const [endPointBreadcrumb, setEndPointBreadcrumb] = useState(String)

  // customBreadcrumb
  useEffect(() => {
    if (detailOfTypeJob) {
      let name = ''
      let nameEndPoint = ''
      detailOfTypeJob.map((getName: TypeDetailOfListJob) => {
        name = getName.tenLoaiCongViec
        nameEndPoint = getName.tenChiTietLoai
      })
      setEndPointBreadcrumb(nameEndPoint)
    }

  }, [detailOfTypeJob])

  // Function handler call api
  const callApiDetailOfTypeJob = async () => {
    setIsID(state.detailJobId)
    if (state.detailJobId) {
      const result = await apiGetDetailOfTypeJob(state.detailJobId)
      dispatch(detailOfListJobAction.setDetailOfTypeJob(result))
    } else if (state.jobId) {
      const result = await apiGetDetailOfTypeJob(state.jobId)
      dispatch(detailOfListJobAction.setDetailOfTypeJob(result))
    }
  }
  useEffect(() => {
    callApiDetailOfTypeJob()
  }, [])

  const items: MenuProps['items'] = [
    {
      label: 'Web Programing (20,566)',
      key: '1',
    },
    {
      label: 'Data Entry (12,566)',
      key: '2',
    },
  ]

  return (
    <div className="type-job-page">
      {isID ? (
        <div className="container mx-auto">
          <BreadcrumbCustom />
          <h1 className="tittle-type-job">{endPointBreadcrumb}</h1>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="tittle-result text-2xl lg:text-3xl font-semibold mb-2">Result for <em className="text-2xl">{`"${state.nameFind}"`}</em></h1>
          <div className="dropdown-type-job-page mb-2">
            <Dropdown
              trigger={['click']}
              menu={{ items }}
              className="dropdown-item">
              <button>
                <Space>
                  Category
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{ items }}
              className="dropdown-item">
              <button>
                <Space>
                  Service options
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{ items }}
              className="dropdown-item">
              <button>
                <Space>
                  Seller details
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{ items }}
              className="dropdown-item">
              <button>
                <Space>
                  Budget
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{ items }}
              className="dropdown-item">
              <button>
                <Space>
                  Delivery time
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          </div>
        </div>
      )}
      <div className="container mx-auto">
        <div className='item-detail-card grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2'>
          <ItemListJob />
        </div>
      </div>
    </div>
  )
}
