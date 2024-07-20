
// import hooks
import { useEffect, useState } from 'react';

// import antd
import { Button, Modal, Pagination, Space, Table, Tag, message, Input } from 'antd';

//import api
import { apiGetUserAdmin } from '../../../apis/apiGetUserAdmin';
import { apiEditUser } from '../../../apis/apiEditUser';

// import type
import { TypeUser } from '../../../types/typeUser';

// import form custom
import { FormShowInfo } from './FormShowInfo';
import { apiSearchUserAdmin } from '../../../apis/apiSearchUserAdmin';
import { PlusOutlined } from '@ant-design/icons';
import FormAddNew from './FormAddNewUser';
import { apiRegister } from '../../../apis/apiRegister';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const { Column } = Table;
  const { Search } = Input;


  // create hooks + use
  const [dataUser, setDataUser] = useState<TypeUser[]>()
  const [pageIndex, setPageIndex] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState<TypeUser>();
  const [dataFormAddNew, setFormDataAddNew] = useState()
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModalAddNew, setOpenModalAddNew] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

  // call api
  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetUserAdmin(pageIndex, 10)
    setDataUser(result.data)
  }
  useEffect(() => {
    callApi(pageIndex)
  }, [pageIndex])

  // pagination
  const changePageIndex = (pageIndex: any) => {
    setPageIndex(pageIndex)
  }

  // modal edit
  const showModalEdit = (data: any) => {
    setOpenEdit(true);
    setSelectedItem(data)
  };

  const handleOkEdit = () => {
    registerSuccess()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEdit(false);
    }, 500);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const registerSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Success',
    });
  };

  const handleFormEdit = (data: any) => {
    const newArrSkill = data.skill.split(',')
    const newArrCer = data.certification.split(',')
    const value = {
      ...data,
      birthday: data['birthday'].format('DD-MM-YYYY'),
      skill: newArrSkill,
      certification: newArrCer,
      avatar: data.avatar
    }
    setFormData(value);
  };

  const handeFormSubmitEdit = () => {
    if (formData) {
      apiEditUser(formData.id, formData)
      handleOkEdit()
    } else {
      handleCancelEdit()
    }
  }

  const handlerModalEdit = () => {
    return <>
      <Modal
        className='modal-edit mb-2 text-center'
        open={openEdit}
        title="Edit User"
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handeFormSubmitEdit}
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
  // modal Add New
  const showModalAddNew = () => {
    setOpenModalAddNew(true);
  };

  const handleOkModalAddNew = () => {
    registerSuccess()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModalAddNew(false);
    }, 500);
  };

  const handleCancelModalAddNew = () => {
    setOpenModalAddNew(false);
  };

  const handlerModalAddNew = () => {
    return <Modal
      className='modal-edit mb-2'
      open={openModalAddNew}
      title="Add New User"
      onOk={handleOkModalAddNew}
      onCancel={handleCancelModalAddNew}
      footer={[
        <Button key="back" onClick={handleCancelModalAddNew}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={submitFormAddNew}
        >
          Submit
        </Button>,
      ]}
    >
      <FormAddNew submitFormAddNew={getDataFormAddNew} />
    </Modal>
  }
  const getDataFormAddNew = (values: any) => {
    setFormDataAddNew(values)
  }
  const submitFormAddNew = async () => {
    if (dataFormAddNew) {
      const result = await apiRegister(dataFormAddNew)
      registerSuccess()
      setOpenModalAddNew(false);
    }
  }

  //search user
  const onSearch = async (e: any) => {
    const { value } = e.target
    if (value !== "" && value.trim()) {
      const result = await apiSearchUserAdmin(value)
      setDataUser(result)
    }else{
      callApi(pageIndex)
    }
  }

  const handleDelete = async () => {
    message.error("Delete User False");
  };

  return (
    <div className='ml-10'>
      {contextHolder}
      <div className='mt-5 mb-3'
        style={{ width: '50%' }}>
        <h1 className='text-2xl'>Search</h1>
        <Search
          className='searchUser'
          placeholder="Search User"
          onChange={onSearch}
        />
      </div>
      <div className='mb-3'>
        <Button className='flex items-center'
          onClick={showModalAddNew}
        ><PlusOutlined />
          Add New</Button>

      </div>
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
                onClick={() => { showModalEdit(record) }}>Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Pagination
        defaultCurrent={1}
        total={80}
        onChange={changePageIndex}
        className='flex justify-end mt-3 mr-3'
      />
      {handlerModalEdit()}
      {handlerModalAddNew()}
    </div>
  );
}
