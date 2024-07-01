import {
  Button,
  Pagination,
  Space,
  Table,
  Input,
  Modal,
  message,
  Form,
} from "antd";
import { useEffect, useState } from "react";
import {
  apiAddTypeJob,
  apiDeleteTypeJob,
  apiEditTypeJob,
  apiGetTypeJobAmin,
} from "../../../apis/apiGetTypeJobAdmin.ts";

interface JobType {
  id: number;
  tenLoaiCongViec: string;
}

export default function ManageJobTypes() {
  const { Column } = Table;
  const [pageIndex, setPageIndex] = useState(1);
  const [typeJob, setTypeJob] = useState<JobType[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state searchTerm
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingJobType, setEditingJobType] = useState<JobType | null>(null); // State để lưu thông tin công việc đang được chỉnh sửa

  console.log(typeJob);

  const callApi = async (pageIndex: any) => {
    const result: any = await apiGetTypeJobAmin(pageIndex, 10);
    setTypeJob(result.data);
  };

  useEffect(() => {
    callApi(pageIndex);
  }, [pageIndex]);

  const changePageIndex = (pageIndex: any) => {
    setPageIndex(pageIndex);
  };

  const handleOnChange = (event: any) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingJobType(null); // Reset editingJobType khi mở modal
    form.resetFields(); // Làm sạch các trường của form
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingJobType(null); // Đặt lại state editingJobType khi hủy modal
    form.resetFields();
  };

  const handleAdd = async (values: { tenLoaiCongViec: string }) => {
    try {
      await apiAddTypeJob(values);
      message.success("Thêm loại công việc thành công");
      callApi(pageIndex);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Thêm loại công việc thất bại");
    }
  };

  const handleEdit = (record: JobType) => {
    setEditingJobType(record);
    setIsModalVisible(true);
    form.setFieldsValue({ tenLoaiCongViec: record.tenLoaiCongViec }); // Đặt giá trị ban đầu cho form khi chỉnh sửa
  };

  // Function để xử lý khi submit form thêm mới hoặc chỉnh sửa
  const handleFormSubmit = async (values: { tenLoaiCongViec: string }) => {
    try {
      if (editingJobType) {
        // Nếu đang chỉnh sửa
        // Gọi API chỉnh sửa công việc
        await apiEditTypeJob(editingJobType.id, values);
        message.success("Đã cập nhật loại công việc thành công");
      } else {
        // Nếu đang thêm mới
        await apiAddTypeJob(values);
        message.success("Đã thêm loại công việc thành công");
      }
      callApi(pageIndex); // Gọi lại API để cập nhật danh sách
      setIsModalVisible(false); // Đóng Modal
      form.resetFields(); // Đặt lại form
    } catch (error) {
      console.error("Error adding/editing job type:", error);
      message.error("Đã xảy ra lỗi khi thêm/chỉnh sửa loại công việc");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteTypeJob(id);
      message.success("Xóa loại công việc thành công");
      callApi(pageIndex);
    } catch (error) {
      message.error("Xóa loại công việc thất bại");
    }
  };
  // Lọc dữ liệu dựa trên searchTerm
  const filteredJobs = typeJob.filter((item) =>
    searchTerm.toLowerCase() === ""
      ? true
      : item.tenLoaiCongViec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!typeJob.length) return <>Loading...</>;
  return (
    <>
      <div className="jobtype_searrch">
        <Input
          className="my-6 mx-auto"
          size="middle"
          allowClear
          style={{ width: "30%" }}
          placeholder="Tìm loại công việc ..."
          onChange={handleOnChange}
        />
      </div>
      <Button
        style={{ width: "10%", fontWeight: "bold", backgroundColor: "green" }}
        type="primary"
        onClick={showModal}
      >
        Add Job Type
      </Button>
      <Table
        dataSource={filteredJobs}
        pagination={false}
        className="table-users-management items-center"
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Job Type Name"
          dataIndex="tenLoaiCongViec"
          key="tenLoaiCongViec"
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={changePageIndex}
        className="flex justify-end mt-3 mr-3"
      />

      <Modal
        title={editingJobType ? "Edit Job Type" : "Add Job Type"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingJobType ? handleFormSubmit : handleAdd}
        >
          <Form.Item
            name="tenLoaiCongViec"
            initialValue={
              editingJobType ? editingJobType.tenLoaiCongViec : undefined
            }
            rules={[
              {
                required: true,
                message: "Hãy nhập loại công việc bạn muốn thêm!",
              },
            ]}
          >
            <Input placeholder="Tên loại công việc" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingJobType ? "Save" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
