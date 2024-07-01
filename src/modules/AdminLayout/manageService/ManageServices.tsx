import { useEffect, useState } from 'react';
import { Button, Pagination, Space, Table, Tag } from 'antd';
import { TypeServices } from '../../../types/typeServices';
import { apiGetDataPagination } from '../../../apis/apiPaginationAdmin';

export default function ManageServices() {

  const { Column } = Table;
  const [pageIndex, setPageIndex] = useState(1)
  const [services, setServices] = useState<TypeServices[]>();


  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetDataPagination('thue-cong-viec',pageIndex, 10)
    setServices(result.data)
  }
  useEffect(() => {
    callApi(pageIndex)
  }, [pageIndex])

  const changePageIndex = (pageIndex: any) => {
    setPageIndex(pageIndex)
  }
  return (
    <>
      <Table
        dataSource={services}
        pagination={false}
        className='table-users-management items-center'

      >
        <Column title="ID" dataIndex="id" key="id" />

        <Column title="ID Job" dataIndex="maCongViec" key="maCongViec" />

        <Column title="ID Tenant" dataIndex="maNguoiThue" key="maNguoiThue" />

        <Column title="Date Of Hire" dataIndex="ngayThue" key="ngayThue" />
        <Column
          title="Status"
          dataIndex="hoanThanh"
          key="hoanThanh"
          render={(role: any) => (
            role ? <Tag color='#87d068'>COMPLETE</Tag> : <Tag color='#f50'>UNFINISHED</Tag>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
              // onClick={() => { showModal(record) }}
              >Edit</Button>
              <Button>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={changePageIndex}
        className='flex justify-end mt-3 mr-3'
      />
    </>
  )
}
