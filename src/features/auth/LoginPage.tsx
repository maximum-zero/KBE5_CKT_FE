import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BasicButton } from '@/components/ui/button/BasicButton';
import {
  LoginContainer,
  LoginForm,
  LoginHeaderSection,
  LoginContentSection,
  Heading1,
  BodyText,
  LinkText,
} from './LoginPage.styles';
import { TextInput } from '@/components/ui/input/input/TextInput';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    console.log('로그인 버튼 !! > ', email);
    console.log('로그인 버튼 !! > ', password);

    navigate('/');
  };

  const handleEnter = () => {
    console.log('엔터 버튼 !!', email);
    console.log('엔터 버튼 !!', password);
  };

  // TODO: axios 써서 Login API 호출하고
  // 일치하면 dashboard 로 이동
  // 틀리면 error message 노출

  return (
    <LoginContainer>
      <LoginForm>
        <LoginHeaderSection>
          <Heading1>로그인</Heading1>
          <BodyText>계정 정보를 입력하여 로그인하세요</BodyText>
        </LoginHeaderSection>
        <TextInput
          width="100%"
          type="text"
          id="email"
          label="이메일"
          placeholder="이메일 주소 입력"
          onChange={value => {
            setEmail(value);
          }}
          onEnter={handleEnter}
        />
        <TextInput
          width="100%"
          type="password"
          id="password"
          label="비밀번호"
          placeholder="••••••••"
          onChange={value => {
            setPassword(value);
          }}
          onEnter={handleEnter}
        />

        <LoginContentSection>
          <LinkText>비밀번호 찾기</LinkText>
        </LoginContentSection>

        <BasicButton width="100%" onClick={handleClick}>
          로그인
        </BasicButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
