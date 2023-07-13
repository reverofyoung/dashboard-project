import styled, { css } from "styled-components";
import theme from "../common/colors";
import GreetingPart from "../components/GreetingPart";
import ToDoPart from "../components/ToDoPart";
import ThirdPart from "../components/ThirdPart";

const Wrap = styled.div`
  background-color: ${theme.mainBg};
  color: ${theme.textColor};
  display: flex;
  height: 100vh;
  width: 100vw;
`;

function Dashboard() {
  return (
    <Wrap>
      <GreetingPart />
      <ToDoPart />
      <ThirdPart />
    </Wrap>
  );
}

export default Dashboard;
