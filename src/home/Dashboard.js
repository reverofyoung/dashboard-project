import styled, { css } from "styled-components";
import theme from "../common/colors";
import GreetingPart from "../components/GreetingPart";
import ToDoPart from "../components/ToDoPart";
import ThirdPart from "../components/ThirdPart";
import HeaderPart from "../components/HeaderPart";

const Wrap = styled.div`
  background-color: ${ theme.mainColor };
  box-sizing: border-box;
  /* color: ${ theme.textColor }; */
  height: 100vh;
  padding: 30px;
  width: 100vw;
`;

const HeaderSection = styled.section`
  margin-bottom: 30px;
  height: 120px;
  width: 100%;
`;

const ContentSection = styled.section`
  display: flex;
  justify-content: space-between;
  height: calc(100% - 150px);
  width: 100%;

  @media (max-width: 768px) { flex-direction: column }
`;

function Dashboard() {
  return (
    <Wrap>
      <HeaderSection>
        <HeaderPart />
      </HeaderSection>

      <ContentSection>
        <GreetingPart />
        <ToDoPart />
        {/* <ThirdPart /> */}
      </ContentSection>
    </Wrap>
  );
}

export default Dashboard;
