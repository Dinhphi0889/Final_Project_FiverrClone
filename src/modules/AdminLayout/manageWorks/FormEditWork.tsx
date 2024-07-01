import { useEffect, useState } from 'react';
import { Form, Input, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './cssManageWorks.css'


export const FormEditWork = (props: any) => {
    // create hooks
    const [form] = Form.useForm<FormData>();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])

    // change values form
    useEffect(() => {
        form.setFieldsValue(props.editJob)
        setFileList([
            {
                uid: props.editJob.id,
                name: 'image.jpg',
                status: 'done',
                url: props.editJob.hinhAnh,
            },
        ])
    }, [props.editJob])

    const handleValuesChange = () => {
        const values = form.getFieldsValue()
        console.log({ ...values, id: props.editJob.id, maChiTietLoaiCongViec: props.editJob.maChiTietLoaiCongViec })
        props.formEditJob({ ...values, id: props.editJob.id, maChiTietLoaiCongViec: props.editJob.maChiTietLoaiCongViec })
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    const handleUploadChange = ({ fileList }: any) => {
        setFileList(fileList);
    };
    return (
        <>
            <Form
                className='form-edit-works my-4'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ width: '100%' }}
                initialValues={props.editJob}
                onValuesChange={handleValuesChange}
                form={form}
            >
                <Form.Item
                    label="Name Job"
                    name='tenCongViec'>
                    <TextArea rows={2} />
                </Form.Item>
                <div className='flex items-center justify-around'>
                    <div>
                        <Form.Item
                            label="Creator"
                            name="nguoiTao">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className=''
                            label="Prices"
                            name="giaTien">
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name='hinhAnh'
                    >
                        <Upload
                            beforeUpload={() => false}
                            listType="picture-circle"
                            fileList={fileList}
                            // onPreview={handlePreview}
                            onChange={handleUploadChange}
                            multiple={false}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image

                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </div>
                <div className='flex items-center justify-evenly '>

                    <Form.Item
                        label="Reviews"
                        name="danhGia"
                        className='mr-3 md:ml-12 sm:ml-12'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Stars"
                        name="saoCongViec"
                    >
                        <Input />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Short Description"
                    name="moTaNgan"
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Descriptions"
                    name="moTa"
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form >
        </>
    );
};
