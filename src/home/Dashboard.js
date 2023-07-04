import styled, { css } from "styled-components";
import GreetingPart from "../components/GreetingPart";
import ToDoPart from "../components/ToDoPart";
import ThirdPart from "../components/ThirdPart";

const Wrap = styled.div`
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
