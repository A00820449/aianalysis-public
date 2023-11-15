import styled from "styled-components";
import { Menu } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { COLORS } from "../../constants";

function SideMenu({ collapsed }) {
  return (
    <Wrapper>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "8px 0 8px",
        }}
        selectable={false}
      >
        <Menu.Item
          icon={<DeploymentUnitOutlined style={{ fontSize: "1.25rem" }} />}
          label="AI Analysis"
          title="AI Analysis"
          key="logo"
          style={{
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          <Link to="/">AI Analysis</Link>
        </Menu.Item>
        <Filler />
        {routes.map((route) => {
          if (route.children) {
            return (
              <Menu.SubMenu
                key={route.key}
                icon={route.icon}
                title={route.label}
              >
                {route.children.map((child) => (
                  <Menu.Item
                    key={child.key}
                    icon={child.icon}
                    title={child.label}
                  >
                    <Link to={child.path}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }

          return (
            <Menu.Item icon={route.icon} key={route.key} title={route.label}>
              <Link to={route.path}>{route.label}</Link>
            </Menu.Item>
          );
        })}
        <Filler />
        {!collapsed && (
          <>
            <Menu.Item
              key="terms"
              title="Terms and Conditions"
              style={{
                textAlign: "center",
                height: "auto",
              }}
            >
              <FooterLink to="/terms">Terms and Conditions</FooterLink>
            </Menu.Item>
            <Menu.Item
              key="privacy"
              title="Privacy Policy"
              style={{
                textAlign: "center",
                height: "auto",
              }}
            >
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </Menu.Item>
            <Menu.Item
              key="contact"
              title="Contact Us"
              style={{
                textAlign: "center",
                height: "auto",
              }}
            >
              <FooterLink to="/contact">Contact Us</FooterLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled(Link)`
  font-size: ${12 / 16}rem;
  color: ${COLORS.gray[700]};
  text-decoration: none;

  &:hover {
    color: ${COLORS.white};
  }

  transition: color 0.5s ease-in-out;
`;

const Filler = styled.div`
  flex: 1;
`;

export default SideMenu;
