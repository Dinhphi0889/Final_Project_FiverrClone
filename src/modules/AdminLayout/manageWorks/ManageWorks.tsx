import { Button, Modal, Pagination, Space, Table, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetDataPagination } from '../../../apis/apiPaginationAdmin';
import { FormEditWork } from './FormEditWork';
import './cssManageWorks.css'
import { apiEditJobAdmin } from '../../../apis/apiEditJobAdmin';
import { CongViec } from '../../../types/typeDetailOfListJob';
import { apiSearchJobAdmin } from '../../../apis/apiSearchJobAdmin';
import { TypeNameJob, congViec } from '../../../types/typeNameJob';
export default function ManageWorks() {

  const { Column } = Table;
  const { Search } = Input;


  // create hooks
  const [pageIndex, setPageIndex] = useState(1)
  const [job, setJob] = useState()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editWork, setEditWork] = useState()
  const [dataEdit, setDataEdit] = useState<CongViec>()

  // call api
  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetDataPagination('cong-viec', pageIndex, 7)
    setJob(result.data)
  }
  useEffect(() => {
    callApi(pageIndex)
  }, [pageIndex])

  // pagination
  const changePageIndex = (pageIndex: any) => {
    setPageIndex(pageIndex)
  }
  const showModal = (data: any) => {
    setOpen(true);
    setEditWork(data)
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handeFormSubmit = () => {
    if (dataEdit) {
      apiEditJobAdmin(dataEdit.id, dataEdit)
      handleOk()
    } else {
      handleCancel()
    }
  }
  const handleFormEditJob = (data: any) => {
    setDataEdit(data)
  }

  // search job
  const onSearch = async (e: any) => {
    const { value } = e.target
    if (value !== "" && value.trim()) {
      const result: any = await apiSearchJobAdmin(value)
      const resultSearch: any = []
      result.map((itemResult: TypeNameJob) => {
        resultSearch.push(itemResult.congViec)
      })
      setJob(resultSearch)
    } else {
      callApi(pageIndex)
    }
  }

  // modal edit
  const handleModal = () => {
    return <>
      <Modal
        width={700}
        className='modal-edit-manage-work text-center text-lg'
        open={open}
        title="Edit Job"
        onOk={handleOk}
        onCancel={handleCancel}

        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handeFormSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <FormEditWork editJob={editWork} formEditJob={handleFormEditJob} />
      </Modal>
    </>
  }

  const handleDelete = async () => {
    message.error("Delete Job False");
  };

  return (
    <div className='manage-work-page ml-10'>
      <div className='my-5'
        style={{ width: '50%' }}>
        <h1 className='text-2xl'>Search Job</h1>
        <Search
          className='searchUser'
          placeholder="Search Job"
          // onSearch={onSearch}
          onChange={onSearch}
        />
      </div>
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
          key="tenCongViec"
          render={(text: any) => (
            <p
              style={{
                width: '250px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              {text}
            </p>
          )} />
        <Column title="Image" dataIndex='hinhAnh' key='hinhAnh'
          render={(text) => text !== "" ? <img src={text}
            style={{
              width: 50,
              height: 50,
              borderRadius: '10%',
              objectFit: 'cover',
            }}
          /> : ''} />

        <Column
          title="Description"
          dataIndex='moTaNgan'
          key='moTaNgan' width={400}
          render={(text: any) => (
            <p
              style={{
                width: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              {text}
            </p>
          )}
        />
        <Column title="Prices" dataIndex='giaTien' key='giaTien' />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
                onClick={() => { showModal(record) }}
              >Edit
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Pagination
        defaultCurrent={1}
        total={60}
        onChange={changePageIndex}
        className='flex justify-end my-5 mr-5'
      />
      {handleModal()}
    </div>
  )
}
