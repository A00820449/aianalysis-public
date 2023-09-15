import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    background-color: hsla(210, 13%, 6%, 1.00);
`;

const MainContent = styled.main`
    padding: 48px 64px;
    height: 100%;
    width: 100%;
`;

export default function Root() {
    return (
        <Wrapper>
            <Sidebar />
            <MainContent>
                <Outlet />
            </MainContent>
        </Wrapper>
    );
  }
  