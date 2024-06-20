import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Dropdown,
  Input,
  Layout,
  Progress,
  Rate,
  Row,
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
import Slider from "react-slick";
import { useEffect, useState } from "react";

export default function DetailJobPage() {
  const images = [
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/4273758/original/57b854d197a85d535d4bd49e07c1e1a09b55a757/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/4273758/original/dfbe47457181ec358bb384cb324becf792c0d6f3/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/4273758/original/a999ee3b46517d55884aa5bdd9f6fdff9d8a28d7/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",
    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/10cef5ddfd7a5167e27275a99c298fae-1618654878/jonathan_london%20big%20otter%20HR%20png%201/design-fascinating-logo-with-free-revisions.png",

    // thêm các link hình ảnh khác ở đây
  ];

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="small_image">
          <img src={images[i]} alt={`Thumbnail ${i}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
  const data = [
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
  // Sort by

  // Sider
  const Basic = () => {
    return (
      <>
        <div className="flex justify-between mb-4">
          <p>Basic</p>
          <p>$ 1000</p>
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
                <span>Lorem ipsum dolor sit amet. </span>
              </p>
            </li>
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
                <span>Lorem ipsum dolor sit amet. </span>
              </p>
            </li>
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
                <span>Lorem ipsum dolor sit amet. </span>
              </p>
            </li>
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
                <span>Lorem ipsum dolor sit amet. </span>
              </p>
            </li>
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
                <span>Lorem ipsum dolor sit amet. </span>
              </p>
            </li>
          </ul>
        </div>
      </>
    );
  };
  const contentListNoTitle: Record<string, React.ReactNode> = {
    Basic: Basic(),
    Standard: Basic(),
    Premium: Basic(),
  };

  const [activeTabKey2, setActiveTabKey2] = useState<string>("Basic");

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sider = document.getElementById("sidercomponent") as HTMLElement;
  //     const footer = document.getElementById("footerpage") as HTMLElement;
  //     const headerHeight =
  //       document.querySelector(".ant-layout-header")?.offsetHeight || 0;
  //     const footerOffset = footer.getBoundingClientRect().top;
  //     const viewportHeight = window.innerHeight;

  //     if (footerOffset <= viewportHeight) {
  //       sider.style.position = "absolute";
  //       sider.style.bottom = `${viewportHeight - footerOffset + 10}px`;
  //       sider.style.top = "auto";
  //     } else {
  //       sider.style.position = "fixed";
  //       sider.style.bottom = "auto";
  //       sider.style.top = `${headerHeight}px`;
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // Sider

  return (
    <div className="container mx-auto mb-8">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "tenLoaiCongviec",
            href: "#",
          },
          {
            title: "tenNhomChiTietLoai",
            href: "#",
          },
          {
            title: "Fullweb Creation",
            href: "#",
          },
        ]}
      />
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <Title level={3}>
            I will do custom css, html, javascript, PHP coding
          </Title>
          <div className="flex items-center space-x-2 pb-2">
            <Avatar icon={<UserOutlined />} />
            <p>nofilzazaq</p>
            <p>
              <span>Top Rated Seller</span>
            </p>
            <div className="flex items-center space-x-2">
              <Rate disabled defaultValue={2} />
              <p>5</p>
              <p
                style={{
                  borderRight: "1px solid black",
                  paddingRight: "8px",
                }}
              >
                (335)
              </p>
              <p>2 Order in Queue</p>
            </div>
          </div>

          <Divider />

          <div className="flex items-center space-x-2 pt-2 mb-2">
            <TrophyTwoTone />
            <p>
              <span style={{ fontWeight: "bold" }}>Buyer keep returning!</span>{" "}
              nofilzazaq has an exceptional number of repeat buyers.
            </p>
          </div>
          {/* main carousel */}

          <div className="slider-container">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div className="slider-items" key={index}>
                  <img src={img} alt={`Slide ${index}`} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="info-container mt-10">
            <Space direction="vertical">
              <Title className="font-bold" level={4}>
                About This Gig
              </Title>
              <Title className="font-bold" level={5}>
                Top Rated Seller with all positive reviews
              </Title>
              <p>Hello,</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                distinctio veritatis, eaque cumque magni necessitatibus cum
                consectetur assumenda praesentium sed, dolores quidem eligendi
                consequatur temporibus quasi eos sequi, ducimus beatae quia
                nostrum? Dolorum sunt deleniti culpa exercitationem aspernatur
                aliquam
              </p>
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
                    <p>PHP</p>
                  </Col>
                  <Col span={12}>
                    <Title style={{ color: "grey" }} level={5}>
                      Expertise
                    </Title>
                    <p>Cross Browser</p>
                    <p>Compatibility</p>
                    <p>PSD to HTML, Performance</p>
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
                      <Avatar size={64} icon={<UserOutlined />} />
                    </div>
                    <div className=" space-y-2">
                      <Title style={{ color: "grey" }} level={5}>
                        nofilzazaq
                      </Title>
                      <p>Web Devloper</p>
                      <div className="flex items-center space-x-2 ">
                        <Rate disabled defaultValue={5} />
                        <p style={{ fontWeight: "bold", color: "#FADB14" }}>
                          5
                        </p>
                        <p>(363)</p>
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
                    style={{ fontSize: "15px" }}
                    disabled
                    defaultValue={5}
                  />
                  <p style={{ fontWeight: "bold", color: "#FADB14" }}>5</p>
                </div>
                <div className="flex space-x-2">
                  <p>Sort by</p>
                  <Dropdown
                  // menu={{ items }}
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
                <Row className="space-x-6" style={{ color: "black" }}>
                  <Col span={11}>
                    <Table
                      dataSource={data}
                      columns={columns}
                      pagination={false}
                      showHeader={false}
                    />
                  </Col>
                  <Col span={11}>
                    <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                      Rating Breakdown
                    </p>
                    <Row>
                      <Col span={20}>
                        <Space direction="vertical">
                          <p>Seller Comunication level</p>
                          <p>Recommend to a friend</p>
                          <p>Services as described</p>
                        </Space>
                      </Col>
                      <Col span={4}>
                        <Space direction="vertical">
                          <p>
                            <span className="mr-2">5</span>
                            <StarFilled style={{ color: "#FADB30" }} />
                          </p>
                          <p>
                            <span className="mr-2">5</span>
                            <StarFilled style={{ color: "#FADB30" }} />
                          </p>
                          <p>
                            <span className="mr-2">5</span>
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
                  <p>Industry</p>
                  <Dropdown
                  // menu={{ items }}
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
                  <Row className="avatar  space-x-2 ">
                    <Col span={1}>
                      <Avatar icon={<UserOutlined />} />
                    </Col>
                    <Col span={22}>
                      <p>
                        <span style={{ fontWeight: "bold" }} className="mr-2">
                          Blasckballs
                        </span>
                        <span>5</span>
                        <StarFilled style={{ color: "#FADB30" }} />
                      </p>
                      <Space direction="vertical">
                        <p className="flex items-center space-x-2">
                          <img
                            className="custom-size country-flag"
                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                            alt="US"
                            loading="lazy"
                          />
                          <span style={{ color: "gray" }}>United State</span>
                        </p>
                        <p>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Aperiam, iste. Incidunt exercitationem quos,
                          doloremque architecto laboriosam voluptates laudantium
                          nam tenetur non quia libero molestiae assumenda.
                          Aspernatur vitae eius ad sint.
                        </p>
                        <p style={{ color: "grey" }}>Public 10 months ago</p>
                        <div>
                          <Space>
                            <a>
                              <span>
                                <LikeOutlined />
                                Helpful
                              </span>
                            </a>
                            <a>
                              <span>
                                <DislikeOutlined />
                                Not helpful
                              </span>
                            </a>
                          </Space>
                        </div>

                        <Row className="avatar_commnet  space-x-2">
                          <Col span={1}>
                            <Avatar icon={<UserOutlined />} />
                          </Col>
                          <Col span={22}>
                            <p>
                              <span
                                style={{ fontWeight: "bold" }}
                                className="mr-2"
                              >
                                Blasckballs
                              </span>
                              <span>5</span>
                              <StarFilled style={{ color: "#FADB30" }} />
                            </p>
                            <Space direction="vertical">
                              <p className="flex items-center space-x-2">
                                <img
                                  className="custom-size country-flag"
                                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                                  alt="US"
                                  loading="lazy"
                                />
                                <span style={{ color: "gray" }}>
                                  United State
                                </span>
                              </p>
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam, iste. Incidunt
                                exercitationem quos, doloremque architecto
                                laboriosam voluptates laudantium nam tenetur non
                                quia libero molestiae assumenda. Aspernatur
                                vitae eius ad sint.
                              </p>
                              <p style={{ color: "grey" }}>
                                Public 10 months ago
                              </p>
                              <div>
                                <Space>
                                  <a>
                                    <span>
                                      <LikeOutlined />
                                      Helpful
                                    </span>
                                  </a>
                                  <a>
                                    <span>
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
                      <Col span={1}>
                        <Avatar icon={<UserOutlined />} />
                      </Col>
                      <Col span={22}>
                        <Input
                          className="mb-4"
                          style={{ width: "100%", height: "100px" }}
                          placeholder="Write something ...."
                          variant="filled"
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            Add comment
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Space>
          </div>
        </Content>

        <Sider width="40%" style={siderStyle}>
          <div id="sidercomponent" className="siderdetailjob">
            <Space direction="vertical">
              <Card
                className="mx-auto"
                style={{
                  width: "100%",
                  // backgroundColor: "#B8B8B8",
                  border: "1px solid #B8B8B8",
                }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey2}
                // tabBarExtraContent={<a href="#">More</a>}
                onTabChange={onTab2Change}
                tabProps={{
                  size: "middle",
                }}
              >
                {contentListNoTitle[activeTabKey2]}
                <br />
                <div className="sidercard_btn">
                  <Button type="primary" style={{ width: "80%" }}>
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Continues ($ 1,000)
                    </span>
                  </Button>
                </div>
                <div className="mt-1">
                  <Button style={{ width: "80%" }} className="font-bold">
                    <span style={{ color: "green" }}> Compare Package</span>
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
  );
}
