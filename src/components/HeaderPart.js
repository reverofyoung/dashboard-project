import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import theme from "../common/colors";

const AlignCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HorizontalAlign = css`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const MainWrap = styled.main`
    color: ${ theme.textColor };
    height: 100%;
    width: 100%;
`;

const LayoutSection = styled.section`
    border-radius: 50px;
    box-sizing: border-box;
    background-color: ${ theme.sectionColor };
    padding: 30px;
`;

const GreetingArticle = styled.article`
    display: flex;
    height: 50px;
    justify-content: space-between;
    width: 100%;
`;

const UserArticle = styled.article`
    width: 40%;
`;

const UserInputArea = styled.div`
    ${HorizontalAlign}
    box-sizing: border-box;
    height: 100%;
`;

const InputArea = styled.input`
    background-color: ${ theme.articleColor };
    border: none;
    border-radius: 50px;
    box-sizing: border-box;
    color: ${ theme.textColor };
    font-size: 15px;
    height: 100%;
    min-width: 120px;
    padding: 0px 20px;
    width: 60%;

    ::placeholder { font-size: 15px; }
`;

const InputButton = styled.div`
    ${ AlignCenter }
    background-color: ${ theme.articleColor };
    border-radius: 50px;
    font-size: 15px;
    height: 100%;
    min-width: 80px;
    width: 30%;

    &:hover {
        background-color: ${ theme.textColor };
        color: ${ theme.articleColor };
    };
`;

const UserNameArea = styled.div`
    align-items: center;
    display: flex;
    font-size: 22px;
    font-weight: 900;
    height: 100%;
`;

const ClockArticle = styled.article`
    ${ AlignCenter }
    /* background-color: ${ theme.articleColor }; */
    background-color: #F0F0F0;
    border-radius: 50px;
    box-sizing: border-box;
    color: ${ theme.sectionColor };
    font-weight: 600;
    height: 100%;
    padding: 10px;
    width: 20%;
`;

const ClockBox = styled.div`
    font-size: 18px;
    width: fit-content;
`;

function HeaderPart() {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return (() => 
            clearInterval(id) // 불필요한 작업 방지
        ); 
    }, []);

    // 유저 네임 인풋 데이터 담기
    const getUserName = (e) => {
        setUserName(e.target.value);
    };

    // 유저 네임 저장
    const addUserName = (e) => {
        e.preventDefault();

        if(userName === '') {
            alert('입력창이 비었네요!');
        } else {
        setUser(userName);
        setUserName('');
        }
    };

    return(
        <MainWrap>
            <LayoutSection>
                <GreetingArticle>
                    <UserArticle>
                        {
                            user !== '' ? 
                            <UserNameArea>{ user }님, 안녕하세요!</UserNameArea> : 
                            <UserInputArea>
                                <InputArea 
                                onChange={ getUserName } 
                                placeholder="이름을 입력해주세요" 
                                value={ userName } 
                                />
                                <InputButton onClick={ addUserName }>저장</InputButton>
                            </UserInputArea>
                        }
                    </UserArticle>
                    <ClockArticle>
                        <ClockBox>  { time.toLocaleDateString() } { time.toLocaleTimeString()}</ClockBox>
                    </ClockArticle>
                </GreetingArticle>
            </LayoutSection>
        </MainWrap>
    )
};

export default HeaderPart;