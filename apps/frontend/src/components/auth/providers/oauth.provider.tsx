import { useCallback } from 'react';
import Image from 'next/image';
import interClass from '@gitroom/react/helpers/inter.font';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { supabase } from '../../../utils/supabase';

export const OauthProvider = () => {
  const { oauthLogoUrl, oauthDisplayName } = useVariables();

  const gotoLogin = useCallback(async () => {
    try {
      // 使用 Supabase 的通用 OAuth 登录
      await supabase.auth.signInWithOAuth({
        provider: 'azure',  // 或其他支持的提供商，如 'bitbucket', 'discord' 等
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error('Failed to get generic oauth login link:', error);
    }
  }, []);

  return (
    <div
      onClick={gotoLogin}
      className={`cursor-pointer bg-white h-[44px] rounded-[4px] flex justify-center items-center text-customColor16 ${interClass} gap-[4px]`}
    >
      <div>
        <Image
          src={oauthLogoUrl || '/icons/generic-oauth.svg'}
          alt="genericOauth"
          width={40}
          height={40}
        />
      </div>
      <div>Sign in with {oauthDisplayName || 'OAuth'}</div>
    </div>
  );
};
