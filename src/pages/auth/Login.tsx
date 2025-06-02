import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0; // 적절한 배경색으로 변경
  color: #333; // 적절한 텍스트 색상으로 변경
`;

const BackButton = styled(motion.button)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1>로그인 페이지</h1>
      <p>여기에 로그인 폼이나 다른 내용을 추가하세요.</p>
      <BackButton onClick={() => navigate('/')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        홈으로 돌아가기
      </BackButton>
    </PageContainer>
  );
}
