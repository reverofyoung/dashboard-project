import styled, { css } from "styled-components";
import GreetingPart from "../components/GreetingPart";
import ToDoPart from "../components/ToDoPart";

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
    </Wrap>
  );
}

export default Dashboard;
