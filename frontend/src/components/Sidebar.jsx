import { Upload, BarChart2, PieChart, Activity } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.aside`
    height: 100%;
    border-right: 1px solid hsla(210, 13%, 18%, 1.00);
    padding: 2rem;
    color: white;
    flex: 1;
`;

const LinkWrapper = styled.ul`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledLink = styled(Link)`
    display: flex;
    gap: 8px;
`;

const Sidebar = () => {
    return (
        <Wrapper>
            <LinkWrapper>
                <li>
                    <StyledLink to={`upload`}>
                        <Upload />Upload file
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to={`data-preprocessing`}>
                        <Activity />Data Preprocessing
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to={`statistical-analysis`}>
                        <BarChart2 />Statistical Analysis
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to={`visualizations`}>
                        <PieChart />Visualizations
                    </StyledLink>
                </li>
            </LinkWrapper>
        </Wrapper>
    );
}

export default Sidebar;