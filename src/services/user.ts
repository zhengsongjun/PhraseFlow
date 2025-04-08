import { request } from '@/utils/request';
import { CreateUserDto, LoginUserDto } from './api/model';

export const register = (data: CreateUserDto) => {
  const result = request({
    url: '/user/register',
    method: 'post',
    data: { ...data },
  });
  return result;
};

export const login = (data: CreateUserDto): Promise<LoginUserDto> => {
  const result = request({
    url: '/user/login',
    method: 'post',
    data: {
      ...data,
    },
  });
  return result;
};
