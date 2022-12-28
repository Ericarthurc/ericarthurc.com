import { IPost } from './siteAPI';

export interface IAdminLogin {
  password: string;
  pin: string;
}

export const adminLogin = async (formData: IAdminLogin): Promise<Response> => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...formData }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminGetMe = async (): Promise<Response> => {
  const response = await fetch('/api/admin/login/me', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminLogout = async (): Promise<Response> => {
  const response = await fetch('/api/admin/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminGetPosts = async (): Promise<Response> => {
  const response = await fetch('/api/admin/posts', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminGetPost = async (postId: String): Promise<Response> => {
  const response = await fetch(`/api/admin/posts/${postId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminCreatePost = async (
  newPostData: IPost
): Promise<Response> => {
  const response = await fetch('/api/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminUpdatePost = async (
  updatedPostData: IPost
): Promise<Response> => {
  const response = await fetch(`/api/admin/posts/${updatedPostData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPostData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export const adminDeletePost = async (postId: String): Promise<Response> => {
  const response = await fetch(`/api/admin/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};
