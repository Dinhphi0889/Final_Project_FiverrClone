
// import hooks
import { useEffect, useState } from 'react';

// import antd
import { Button, Modal, Pagination, Space, Table, Tag, message } from 'antd';

//import api
import { apiGetUserAdmin } from '../../../apis/apiGetUserAdmin';
import { apiEditUser } from '../../../apis/apiEditUser';

// import type
import { TypeUser } from '../../../types/typeUser';

// import form custom
import { FormShowInfo } from './FormShowInfo';

export default function UserManagement() {
  const { Column } = Table;

  // create hooks + use
  const [dataUser, setDataUser] = useState<TypeUser[]>()
  const [pageIndex, setPageIndex] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState<TypeUser>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // call api
  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetUserAdmin(pageIndex, 7)
    setDataUser(result.data)
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
    setSelectedItem(data)
  };

  const handleOk = () => {
    registerSuccess()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const registerSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Update Success',
    });
  };

  const handleFormEdit = (data: any) => {
    const newArrSkill = data.skill.split(',')
    const newArrCer = data.certification.split(',')
    const value = {
      ...data,
      birthday: data['birthday'].format('DD-MM-YYYY'),
      skill: newArrSkill,
      certification: newArrCer
    }
    setFormData(value);
  };

  const handeFormSubmit = () => {
    console.log(formData)
    if (formData) {
      apiEditUser(formData.id, formData)
      handleOk()
    } else {
      handleCancel()
    }
  }

  const handlerModal = () => {
    return <>
      <Modal
        className='modal-edit mb-2 text-center'
        open={open}
        title="Show Information"
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

        <FormShowInfo dataPropsAdmin={selectedItem}
          formEdit={handleFormEdit}
        />
      </Modal>
    </>
  }

  return (
    <>
      {contextHolder}
      <Table
        dataSource={dataUser}
        pagination={false}
        className='table-users-management items-center'

      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Avatar" dataIndex="avatar" key="avatar"

          render={(text) => text !== "" ? <img src={text}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          /> : ''}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email"
        />

        <Column
          title="Type Users"
          dataIndex="role"
          key="role"
          render={(role: any) => (
            role === 'ADMIN' ? <Tag color='#f50'>ADMIN</Tag> : <Tag color='#87d068'>USER</Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
                onClick={() => { showModal(record) }}>Edit</Button>
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
      {handlerModal()}
    </>
  );
}
