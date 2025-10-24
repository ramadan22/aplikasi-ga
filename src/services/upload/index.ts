import AxiosInstance from '@/lib/axios';
import { PostParams, PostResponse } from './type';

const post = async (params: PostParams): Promise<PostResponse> =>
  AxiosInstance.post('/upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => response?.data || null);

export { post };
