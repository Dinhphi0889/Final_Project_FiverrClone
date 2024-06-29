import { Button, Modal, Pagination, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetJobAdmin } from '../../../apis/apiGetJobAdmin';
export default function ManageWorks() {

  // create hooks
  const { Column } = Table;
  const [pageIndex, setPageIndex] = useState(1)
  const [job, setJob] = useState()


  // call api
  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetJobAdmin(pageIndex, 7)
    console.log(result.data)
    setJob(result.data)
  }
  useEffect(() => {
    callApi(pageIndex)
  }, [pageIndex])

  // pagination
  const changePageIndex = (pageIndex: any) => {
    setPageIndex(pageIndex)
  }

  return (
    <>
      <Table

        dataSource={job}
        pagination={false}
        className='table-users-management items-center'
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Creator" dataIndex="nguoiTao" key="nguoiTao" />

        <Column
          width={300}
          title="Name Job"
          dataIndex="tenCongViec"
          key="tenCongViec" />
        <Column title="Image" dataIndex='hinhAnh' key='hinhAnh'
          render={(text) => text !== "" ? <img src={text}
            style={{
              width: 50,
              height: 50,
              borderRadius: '10%',
              objectFit: 'cover',
            }}
          /> : ''} />
        <Column title="Prices" dataIndex='giaTien' key='giaTien' />

        <Column title="Description" dataIndex='moTaNgan' key='moTaNgan' width={400} />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
              //onClick={() => { showModal(record) }}
              >Edit
              </Button>
              <Button>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={changePageIndex}
        className='flex justify-end my-5 mr-5'
      />
      {/* {handlerModal()} */}
    </>
  )
}
