import { httpPost } from '../main';
import { UserDetail } from './getInfo';

export async function login(email: string, password: string): Promise<UserDetail> {
  const userInfo = await httpPost<{ email: string; password: string }, UserDetail>('/user/login', { email, password });
  if (userInfo.level !== 3) {
    throw new Error('不是管理员账号');
  }
  return userInfo;
}
