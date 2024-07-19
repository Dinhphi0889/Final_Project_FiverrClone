import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Layout,
  message,
  Progress,
  Rate,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { layoutStyle, contentStyle, siderStyle } from "./DetailjogPage-style";
import {
  CheckOutlined,
  ClockCircleOutlined,
  DislikeOutlined,
  DownOutlined,
  LikeOutlined,
  StarFilled,
  SyncOutlined,
  TrophyTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import "./style.css";
import { useEffect, useState } from "react";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getBannerDetailJob, postComment } from "../../../apis/apiDetailJob";
import { NewComment } from "../../../types/detailJob";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { TypeDetailOfListJob } from "../../../types/typeDetailOfListJob";
import { useAppSelector } from "../../../redux/hooks";
import { apiHireJob } from "../../../apis/apiHireJob";


export default function DetailJobPage() {
  const { data } = useQuery({
    queryKey: ["tenLoaicongViec"],
    queryFn: getBannerDetailJob,
  });

  // lấy data props từ component detailoftypejob
  const [dataProps, setDataProps] = useState<TypeDetailOfListJob>()

  const { state } = useLocation()
  const { currentUser } = useAppSelector(state => state.user)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [quality, setQuality] = useState(1)
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Hire Job Success',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: "Can't Hire Job, Check Again",
    });
  };
  const showLoading = () => {
    setOpenDrawer(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 0);
  };
  useEffect(() => {
    if (state) {
      setDataProps(state.detailJob.data)
    }
  }, [state])

  const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </p>
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Do you provide regular updates on order?",
      children: text,
    },
    {
      key: "2",
      label: "How do you guarantee product quality and relability",
      children: text,
    },
    {
      key: "3",
      label: "Do you give post-development support?",
      children: text,
    },
    {
      key: "4",
      label: "Do you convert PDF to HTML?",
      children: text,
    },
  ];
  // Biến thông tin cho bản đánh giá
  const data_star = [
    {
      key: "5",
      stars: "5 Stars",
      percentage: 97.13546847026059,
      count: 4883,
    },
    {
      key: "4",
      stars: "4 Stars",
      percentage: 2.16829122737219,
      count: 109,
    },
    {
      key: "3",
      stars: "3 Stars",
      percentage: 0.517207081758504,
      count: 26,
    },
    {
      key: "2",
      stars: "2 Stars",
      percentage: 0.07957032027053909,
      count: 4,
    },
    {
      key: "1",
      stars: "1 Star",
      percentage: 0.09946290033817386,
      count: 5,
    },
  ];
  const columns = [
    {
      dataIndex: "stars",
      key: "stars",
      render: (text: any) => <Button>{text}</Button>,
      width: "20%",
    },
    {
      dataIndex: "percentage",
      key: "percentage",
      render: (text: any) => (
        <Progress
          percent={parseFloat(text.toFixed(2))}
          showInfo={false}
          strokeColor="#FADB30"
        />
      ),
      width: "60%",
    },
    {
      dataIndex: "count",
      key: "count",
      render: (text: any) => <span>({text})</span>,
    },
  ];

  const mangMoTaNgan = dataProps?.congViec.moTaNgan.split("\n");

  const [activeTabKey2, setActiveTabKey2] = useState<string>("Basic");
  const tabListNoTitle = [
    {
      key: "Basic",
      label: "Basic",
    },
    {
      key: "Standard",
      label: "Standard",
    },
    {
      key: "Premium",
      label: "Premium",
    },
  ];
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };
  const Basic = (level: string) => {
    return (
      <>
        <div className="flex justify-between mb-4">
          <p>{mangMoTaNgan?.[0]}</p>
          {/* <p>{mangMoTaNgan?.[0]}</p> */}
          <p>{mangMoTaNgan?.[1]}</p>
        </div>
        <p style={{ fontWeight: "lighter" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="mt-6 flex space-x-2">
          <ClockCircleOutlined />
          <p>30 Days Delivery </p>
          <SyncOutlined />
          <p>Revolution</p>
        </div>
        <div className="mt-2">
          <ul style={{ textAlign: "left" }}>
            {mangMoTaNgan?.slice(2).map((mota) => {
              return (
                <li>
                  <p className="space-x-4" style={{ fontWeight: "lighter" }}>
                    <CheckOutlined
                      style={{
                        fontSize: "20px",
                        color: "green",
                        fontWeight: "bold",
                        marginRight: "5px",
                      }}
                    />
                    <span> {mota}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };
  const contentListNoTitle: Record<string, React.ReactNode> = {
    Basic: Basic("Basic"),
    Standard: Basic("Standard"),
    Premium: Basic("Premium"),
  };

  // comment
  const [comment, setComment] = useState<string>("");

  // Sử dụng useMutation với kiểu dữ liệu được xác định
  const mutation: UseMutationResult<void, AxiosError, NewComment> = useMutation<
    void,
    AxiosError,
    NewComment
  >({
    mutationFn: postComment,
    onSuccess: () => {
      // Xử lý sau khi bình luận được đăng thành công
      alert("Bình luận đã được đăng!");
      setComment("");
    },
    onError: (error: AxiosError) => {
      // Xử lý lỗi
      alert(`Có lỗi xảy ra`);
    },
  });
  const handleSubmit = (event: React.FormEvent) => {
    const newComment: NewComment = {
      maCongViec: 1, // Giả sử mã công việc
      maNguoiBinhLuan: 1, // Giả sử mã người bình luận
      ngayBinhLuan: new Date().toISOString(), // Giả sử ngày bình luận là ngày hiện tại
      noiDung: comment,
      saoBinhLuan: 5, // Giả sử số sao bình luận
    };
    mutation.mutate(newComment);
  };
  const hireJob = async () => {
    const date = new Date()
    const data = {
      maCongViec: dataProps?.congViec.id,
      maNguoiThue: currentUser.user.id,
      ngayThue: date,
    }
    const result = await apiHireJob(data)
    if (result) {
      success()
    }
  }
  return (
    <>
      {contextHolder}
      <div className="detailjob_page container mx-auto mb-8">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: dataProps?.tenLoaiCongViec,
              href: "#",
            },
            {
              title: dataProps?.tenNhomChiTietLoai,
              href: "#",
            },
            {
              title: dataProps?.tenChiTietLoai,
              href: "#",
            },
          ]}
        />
        <Layout style={layoutStyle}>
          <Content className="left_layout" style={contentStyle}>
            <Title level={3}>{dataProps?.congViec.tenCongViec}</Title>
            <div className="toprate flex items-center space-x-2 pb-2">
              <div className="avatar_user flex items-center space-x-2">
                <Avatar icon={<UserOutlined />} src={dataProps?.avatar} />
                <p className="p-detail" style={{ fontWeight: "bold" }}>{dataProps?.tenNguoiTao}</p>
              </div>
              <div className="detailjob_header flex items-center space-x-2">
                <p className="p-detail">Top Rated Seller</p>
                <Rate className="rate-custom" disabled value={dataProps?.congViec.saoCongViec} />
                <p className="p-detail" style={{ fontWeight: "bold" }}>
                  {dataProps?.congViec.saoCongViec}
                </p>
                <p
                  className="p-detail"
                  style={{
                    borderRight: "1px solid black",
                    paddingRight: "8px",
                  }}
                >
                  ({dataProps?.congViec.danhGia})
                </p>
                <p className="p-detail">2 Order in Queue</p>
              </div>
            </div>
            <Divider />

            <div className="flex items-center space-x-2 pt-2 mb-2">
              <TrophyTwoTone />
              <p className="p-detail">
                <span className="span-detail" style={{ fontWeight: "bold" }}>Buyer keep returning!</span>{" "}
                nofilzazaq has an exceptional number of repeat buyers.
              </p>
            </div>
            {/* main carousel */}

            <div className="slider-container">
              <Carousel arrows infinite={false}>
                <div className="slider-items">
                  <img src={dataProps?.congViec.hinhAnh} />
                </div>
              </Carousel>
            </div>
            <Sider
              className="sider_layout sider_layout_active"
              width="100%"
              style={siderStyle}
            >
              <div className="sider_component">
                <Space direction="vertical">
                  <Card
                    className="mx-auto"
                    style={{
                      width: "100%",
                      border: "1px solid #B8B8B8",
                    }}
                    tabList={tabListNoTitle}
                    activeTabKey={activeTabKey2}
                    onTabChange={onTab2Change}
                    tabProps={{
                      size: "middle",
                    }}
                  >
                    {contentListNoTitle[activeTabKey2]}
                    <br />
                    <div className="sidercard_btn">
                      <Button
                        type="primary"
                        style={{ width: "80%" }}
                        onClick={showLoading}
                      >
                        <span className="span-detail" style={{ color: "white", fontWeight: "bold" }}>
                          Continues (${dataProps?.congViec.giaTien})
                        </span>
                      </Button>
                    </div>
                    <div className="mt-1">
                      <Button style={{ width: "80%" }} className="font-bold">
                        <span className="span-detail" style={{ color: "green" }}> Compare Package</span>
                      </Button>
                    </div>
                  </Card>
                  <Card style={{ width: "100%", backgroundColor: "#B8B8B8" }}>
                    <Space direction="vertical">
                      <p>Do you have any special requirement</p>
                      <Button
                        style={{ backgroundColor: "#F0F2F5", width: "50%" }}
                      >
                        Get a Quote
                      </Button>
                    </Space>
                  </Card>
                </Space>
              </div>
            </Sider>

            <div className="info-container mt-10">
              <Space direction="vertical">
                <Title className="font-bold" level={4}>
                  About This Gig
                </Title>
                <Title className="font-bold" level={5}>
                  Top Rated Seller with all positive reviews
                </Title>
                <p className="p-detail">Hello,</p>
                <p className="p-detail">{dataProps?.congViec.moTa}</p>
                <div className="offer_things">
                  <Title className="font-bold" level={5}>
                    Things I offer
                  </Title>
                  <ul className="desc_info_list">
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                  </ul>
                </div>
                <div>
                  <Title className="font-bold" level={5}>
                    I will do the work until you are satisfied with fast and
                    responsive communication
                  </Title>
                  <Divider />
                  <Row style={{ color: "black" }}>
                    <Col span={12}>
                      <Title style={{ color: "grey" }} level={5}>
                        Programming Language
                      </Title>
                      <p className="p-detail">PHP</p>
                    </Col>
                    <Col span={12}>
                      <Title style={{ color: "grey" }} level={5}>
                        Expertise
                      </Title>
                      <p className="p-detail">Cross Browser</p>
                      <p className="p-detail">Compatibility</p>
                      <p className="p-detail">PSD to HTML, Performance</p>
                    </Col>
                  </Row>
                </div>
                <div className="user">
                  <div>
                    <Title className="font-bold" level={5}>
                      About The Seller
                    </Title>
                    <Divider />
                    <div
                      className="flex items-center space-x-6"
                      style={{ color: "black" }}
                    >
                      <div>
                        <Avatar
                          src={data?.[0].avatar}
                          size={64}
                          icon={<UserOutlined />}
                        />
                      </div>
                      <div className=" space-y-2">
                        <Title style={{ color: "grey" }} level={5}>
                          {data?.[0].tenNguoiTao}
                        </Title>
                        <p className="p-detail">Web Devloper</p>
                        <div className="flex items-center space-x-2 ">
                          <Rate className="rate-custom" disabled value={data?.[0].congViec.saoCongViec} />
                          <p style={{ fontWeight: "bold", color: "#FADB14" }}>
                            {dataProps?.congViec.saoCongViec}
                          </p>
                          <p>({dataProps?.congViec.danhGia})</p>
                        </div>
                        <Button style={{ width: "100%" }}>Contact Me</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Title level={5}>FAQ</Title>
                  <Collapse
                    items={items}
                    bordered={false}
                    defaultActiveKey={["1"]}
                  />
                </div>

                <div className="Rate-part mt-5 flex justify-between">
                  <div className="flex items-center space-x-2 ">
                    <p style={{ fontWeight: "bold" }}>(363) Reviews</p>
                    <Rate
                      className="rate-custom"
                      style={{ fontSize: "15px" }}
                      disabled
                      defaultValue={5}
                    />
                    <p className="p-detail" style={{ fontWeight: "bold", color: "#FADB14" }}>5</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="p-detail">Sort by</p>
                    <Dropdown
                    >
                      <a
                        style={{ color: "black", fontWeight: "bold" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          Hover me
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <div className="FAQ_rate">
                  <Row
                    className="space-x-6 rating_breakdown"
                    style={{ color: "black" }}
                  >
                    <Col span={11}>
                      <Table
                        dataSource={data_star}
                        columns={columns}
                        pagination={false}
                        showHeader={false}
                      />
                    </Col>
                    <Col span={11}>
                      <p className="p-detail" style={{ fontWeight: "bold", marginBottom: "15px" }}>
                        Rating Breakdown
                      </p>
                      <Row>
                        <Col className="rating_breakdwn_text" span={20}>
                          <Space direction="vertical">
                            <p className="p-detail">Seller Comunication level</p>
                            <p className="p-detail">Recommend to a friend</p>
                            <p className="p-detail">Services as described</p>
                          </Space>
                        </Col>
                        <Col className="rating_breakdwn_star" span={4}>
                          <Space direction="vertical">
                            <p className="p-detail">
                              <span className="span-detail mr-2">5</span>
                              <StarFilled style={{ color: "#FADB30" }} />
                            </p>
                            <p className="p-detail">
                              <span className="span-detail mr-2">5</span>
                              <StarFilled style={{ color: "#FADB30" }} />
                            </p>
                            <p className="p-detail">
                              <span className="span-detail mr-2">5</span>
                              <StarFilled style={{ color: "#FADB30" }} />
                            </p>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div className="cmt_part">
                  <Title level={5}>Filter</Title>
                  <div className="flex space-x-2 mb-6">
                    <p className="p-detail">Industry</p>
                    <Dropdown
                    >
                      <a
                        style={{ color: "black", fontWeight: "bold" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          All Industry
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                  <Divider />
                  <div className="mt-6">
                    <Row className="avatar space-x-2 ">
                      <Col
                        xs={{ span: 2, offset: 1 }}
                        xl={{ span: 1, offset: 2 }}
                      >
                        <Avatar icon={<UserOutlined />} />
                      </Col>
                      <Col xs={{ span: 20, offset: 1 }}>
                        <p className="p-detail">
                          <span style={{ fontWeight: "bold" }} className="span-detail mr-2">
                            Blasckballs
                          </span>
                          <span className="span-detail">5</span>
                          <StarFilled style={{ color: "#FADB30" }} />
                        </p>
                        <Space direction="vertical">
                          <p className="p-detail flex items-center space-x-2">
                            <img
                              className="custom-size country-flag"
                              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                              alt="US"
                              loading="lazy"
                            />
                            <span className="span-detail" style={{ color: "gray" }}>United State</span>
                          </p>
                          <p className="p-detail">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Aperiam, iste. Incidunt exercitationem quos,
                            doloremque architecto laboriosam voluptates laudantium
                            nam tenetur non quia libero molestiae assumenda.
                            Aspernatur vitae eius ad sint.
                          </p>
                          <p className="p-detail" style={{ color: "grey" }}>Public 10 months ago</p>
                          <div>
                            <Space>
                              <a>
                                <span className="span-detail">
                                  <LikeOutlined />
                                  Helpful
                                </span>
                              </a>
                              <a>
                                <span className="span-detail">
                                  <DislikeOutlined />
                                  Not helpful
                                </span>
                              </a>
                            </Space>
                          </div>

                          <Row className="avatar_comment space-x-2">
                            <Col
                              xs={{ span: 2, offset: 1 }}
                              xl={{ span: 1, offset: 2 }}
                            >
                              <Avatar icon={<UserOutlined />} />
                            </Col>
                            <Col xs={{ span: 20, offset: 1 }}>
                              <p className="p-detail">
                                <span
                                  style={{ fontWeight: "bold" }}
                                  className="span-detail mr-2"
                                >
                                  Blasckballs
                                </span>
                                <span className="span-detail">5</span>
                                <StarFilled style={{ color: "#FADB30" }} />
                              </p>
                              <Space direction="vertical">
                                <p className="p-detail flex items-center space-x-2">
                                  <img
                                    className="custom-size country-flag"
                                    src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                                    alt="US"
                                    loading="lazy"
                                  />
                                  <span className="span-detail" style={{ color: "gray" }}>
                                    United State
                                  </span>
                                </p>
                                <p className="p-detail">
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Aperiam, iste. Incidunt
                                  exercitationem quos, doloremque architecto
                                  laboriosam voluptates laudantium nam tenetur non
                                  quia libero molestiae assumenda. Aspernatur
                                  vitae eius ad sint.
                                </p>
                                <p className="p-detail" style={{ color: "grey" }}>
                                  Public 10 months ago
                                </p>
                                <div>
                                  <Space>
                                    <a>
                                      <span className="span-detail">
                                        <LikeOutlined />
                                        Helpful
                                      </span>
                                    </a>
                                    <a>
                                      <span className="span-detail">
                                        <DislikeOutlined />
                                        Not helpful
                                      </span>
                                    </a>
                                  </Space>
                                </div>
                              </Space>
                            </Col>
                          </Row>
                        </Space>
                      </Col>
                    </Row>
                    <div className="input_container mt-4">
                      <Row className="avatar_input flex space-x-2">
                        <Col
                          xs={{ span: 2, offset: 1 }}
                          xl={{ span: 1, offset: 2 }}
                        >
                          <Avatar icon={<UserOutlined />} />
                        </Col>

                        <Col xs={{ span: 20, offset: 1 }}>
                          <Form>
                            <Form.Item>
                              <Input
                                className="mb-4"
                                style={{ width: "100%", height: "100px" }}
                                placeholder="Write something ...."
                                variant="filled"
                                name="cmt"
                                onChange={(event) => {
                                  console.log(
                                    event.target.name,
                                    event.target.value
                                  );
                                  setComment(event.target.value);
                                }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                className="btn_comment"
                                htmlType="submit"
                                style={{ width: "30%" }}
                                type="primary"
                                onClick={handleSubmit}
                              >
                                <span className="span-detail"
                                  style={{ color: "white", fontWeight: "bold" }}
                                >
                                  Add comment
                                </span>
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Space>
            </div>
          </Content>

          <Sider
            className="sider_layout sider_layout_disable"
            width="40%"
            style={siderStyle}
          >
            <div className="sider_component">
              <Space direction="vertical">
                <Card
                  className="mx-auto"
                  style={{
                    width: "100%",
                    border: "1px solid #B8B8B8",
                  }}
                  tabList={tabListNoTitle}
                  activeTabKey={activeTabKey2}
                  onTabChange={onTab2Change}
                  tabProps={{
                    size: "middle",
                  }}
                >
                  {contentListNoTitle[activeTabKey2]}
                  <br />
                  <div className="sidercard_btn">
                    <Button
                      type="primary"
                      style={{ width: "80%" }}
                      onClick={showLoading}
                    >
                      <span className="span-detail flex items-center" style={{ color: "white", fontWeight: "bold" }}>
                        Continues <i className="ml-1 fa-solid fa-arrow-right"></i>
                      </span>
                    </Button>
                    <Drawer
                      closable
                      destroyOnClose
                      title={<p className="tittle-drawer">Order options</p>}
                      placement="right"
                      open={openDrawer}
                      loading={loading}
                      onClose={() => setOpenDrawer(false)}
                    >
                      <div className="flex justify-between mb-2">
                        <p className="text-xl font-medium">Basic</p>
                        <p className="text-xl font-medium">
                          {
                            dataProps ?
                              dataProps?.congViec?.giaTien * quality : ""
                          }$</p>
                      </div>
                      <div className="price-drawer">
                        <span className="font-medium">{`${dataProps?.congViec.giaTien}$`}</span>
                        <span className="ml-2 font-medium">{dataProps?.congViec.tenCongViec}</span>
                      </div>
                      <div>
                        <h1 className="mt-3 text-lg font-medium">How often do you need this order?</h1>
                        <div className="info-deposit">
                          <div className="flex justify-between info-deposit-top">
                            <p className="font-medium">Single order</p>
                            <p className="text-lg font-medium">US$
                              {dataProps ? dataProps?.congViec.giaTien * quality : ""}</p>
                          </div>
                          <div className="flex justify-between info-deposit-bottom">
                            <p className="font-medium">Gig Quantity</p>
                            <div>
                              <button className="text-lg font-medium btn-down"
                                onClick={() => {
                                  if (quality > 1) {
                                    setQuality(quality - 1)
                                  }
                                }}>-</button>
                              <span className="quanlity">{quality}</span>
                              <button className="text-lg font-medium btn-up"
                                onClick={() => { setQuality(quality + 1) }}>+</button>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-center">

                          <Button
                            className="btn-continues w-full"
                            onClick={hireJob}
                          >Continues {dataProps ? dataProps?.congViec.giaTien * quality : ""}$</Button>
                        </div>
                      </div>
                    </Drawer>

                  </div>
                  <div className="mt-1">
                    <Button style={{ width: "80%" }} className="font-bold">
                      <span className="span-detail" style={{ color: "green" }}> Compare Package</span>
                    </Button>
                  </div>
                </Card>
                <Card style={{ width: "100%", backgroundColor: "#B8B8B8" }}>
                  <Space direction="vertical">
                    <p>Do you have any special requirement</p>
                    <Button style={{ backgroundColor: "#F0F2F5", width: "50%" }}>
                      Get a Quote
                    </Button>
                  </Space>
                </Card>
              </Space>
            </div>
          </Sider>
        </Layout>
      </div>
    </>

  );
}
