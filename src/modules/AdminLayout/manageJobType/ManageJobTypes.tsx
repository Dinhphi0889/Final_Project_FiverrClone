import { Button, Pagination, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetDataPagination } from '../../../apis/apiPaginationAdmin';
import { SearchProps } from 'antd/es/input/Search';

export default function ManageJobTypes() {
  const { Column } = Table;


  const [pageIndex, setPageIndex] = useState(1)
  const [typeJob, setTypeJob] = useState()

  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetDataPagination('loai-cong-viec', pageIndex, 10)
    setTypeJob(result.data)
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
        dataSource={typeJob}
        pagination={false}
        className='table-users-management items-center'

      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Job Type Name" dataIndex='tenLoaiCongViec' key='tenLoaiCongViec' />
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
