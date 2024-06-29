import { Button, Drawer, Input } from "antd";
import "./styleHeader.css";
import { SearchProps } from "antd/es/input/Search";
import { useQuery } from "@tanstack/react-query";
import { getMenuJob } from "../../apis/apiMenuJob";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e) => {
  console.log(_e, value);
};

export default function HeaderPage() {
  const [open, setOpen] = useState(false);

  //Call api get list menu job
  const { data = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenuJob,
  });

  // Function handler show sidebar
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Render menu job
  const handleRenderMenuJob = () => {
    const dataSlice = data.slice(0, 11);
    return dataSlice.map((itemData, index) => {
      const items: MenuProps["items"] = [
        {
          key: itemData.tenLoaiCongViec,
          label: (
            <div className="nameGroup">
              {itemData.dsNhomChiTietLoai.map((itemDetail) => {
                // console.log(itemDetail)
                return (
                  <div>
                    <ul>
                      <p>{itemDetail.tenNhom}</p>
                      {itemDetail.dsChiTietLoai.map((itemDetailType) => {
                        return (
                          <li>
                            <a className="txtDetail" href="#">
                              {itemDetailType.tenChiTiet}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          ),
        },
      ];
      return (
        <>
          <Dropdown key={index} menu={{ items }}>
            <p onClick={(e) => e.preventDefault()}>
              <Space>
                <NavLink to={`list-job/${itemData.id}`}>
                  {itemData.tenLoaiCongViec}
                </NavLink>
              </Space>
            </p>
          </Dropdown>
        </>
      );
    });
  };

  // Event scroll change header
  const handleScroll = () => {
    const search = document.getElementById("searchHeader");
    const header = document.querySelector("header");
    // const changeHeader = document.querySelector('#changeHeader')
    const listJob = document.getElementsByClassName("menu-list-job")[0];
    // if (window.location.pathname === "/") {
    if (window.scrollY > 0) {
      header?.classList.add("changeColor");
      if (window.scrollY > 180) {
        search?.classList.remove("hidden-search-navbar");
        listJob?.classList.remove("hidden");
      } else {
        search?.classList.add("hidden-search-navbar");
        listJob?.classList.add("hidden");
      }
    } else {
      header?.classList.remove("changeColor");
    }
    // }
    //  else {
    //   changeHeader?.classList.add("fixed-header-page");
    // }
  };

  useEffect(() => {
    const changeHeader = document.querySelector("#changeHeader");
    if (window.location.pathname === "/") {
      handleScroll();
    } else {
      changeHeader?.classList.add("fixed-header-page");
    }
  }, [window.location.pathname]);

  window.addEventListener("scroll", handleScroll);

  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      type: "divider",
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
      ],
    },
  ];

  // Custom Sidebar
  const customDrawer = () => {
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
      >
        <div className="show-sidebar">
          <button className="bg-black text-white text-center text-lg font-bold px-6 py-2 my-3 flex rounded-md">
            Join Fiverr
          </button>
          <div className="sidebar-menu">
            <a href="">Sign In</a>
            <a href="">Browse categories</a>
            <a href="">Explore</a>
            <a href="">Fiverr Pro</a>
            <a href="">General</a>
            <a href="">Home</a>
            <a>
              English<i className="fa-solid fa-globe"></i>
            </a>
            <a href="">US$ USD</a>
          </div>
        </div>
      </Drawer>
    );
  };

  return (
    <div id="changeHeader">
      <div className="header_cover">
        <header>
          <Button className="pt-0" id="btn-sidebar" onClick={showDrawer}>
            <i className="fa-solid fa-bars"></i>
          </Button>
          {customDrawer()}
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            <a href="/">fiverr</a>
            <span style={{ color: "green", fontSize: "45px" }}>.</span>
          </p>
          <div id="searchHeader" className="hidden-search-navbar">
            <Search
              className="search"
              placeholder="What service are you looking for today?"
              onSearch={onSearch}
            />
          </div>
          <nav className="menu-bar">
            <a>
              Fiverr Pro<i className="fa-solid fa-chevron-down"></i>
            </a>
            <a>
              Explore<i className="fa-solid fa-chevron-down"></i>
            </a>
            <a>
              <i
                className="fa-solid fa-globe"
                style={{ paddingRight: "8px" }}
              ></i>
              English
            </a>
            <a>Become a Seller</a>
            <a>Sign Up</a>
            <Button className="btn-custom btn-join">Join</Button>
          </nav>
        </header>
        <div className="menu-list-job hidden animate__animated animate__flipInX">
          {handleRenderMenuJob()}
        </div>
      </div>
    </div>
  );
}
