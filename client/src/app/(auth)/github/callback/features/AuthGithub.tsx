'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGithub } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';

type Props = {
  authCode: string;
};

const AuthGithub = ({ authCode }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    const fetchUser = async (code: string) => {
      try {
        const fetchResult = await authenticateByGithub(code);
        saveUserSession(fetchResult);
      } catch (err) {
        alert('로그인에 실패했어요.');
      } finally {
        replace('/');
      }
    };
    fetchUser(authCode);
  }, [authCode, replace, saveUserSession]);
  return <div>인증 중...</div>;
};

export default AuthGithub;