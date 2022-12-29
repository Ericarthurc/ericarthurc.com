// export interface IHTTP<T extends IPost | IMeta[] | IMeta | ISeries[]> {
//   data: T;
// }

export interface IPost {
  id?: string;
  title: string;
  date: string;
  series: string;
  categories: string[];
  markdown: string;
}

export interface IMeta {
  id: string;
  title: string;
  date: string;
  series: string;
  categories: string[];
}

export interface ISeries {
  series: string;
}

export const getMeta = async (): Promise<IMeta[]> => {
  const response = await fetch('/api/v1/meta', { method: 'GET' });
  return response.json();
};

export const getPost = async (param: String): Promise<IPost> => {
  const response = await fetch(`/api/v1/post/${param}`, { method: 'GET' });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response.json();
};

export const getSeries = async (): Promise<ISeries[]> => {
  const response = await fetch(`/api/v1/series`, { method: 'GET' });
  return response.json();
};

export const getSeriesMeta = async (param: String): Promise<IMeta[]> => {
  const response = await fetch(`/api/v1/series/${param}`, { method: 'GET' });
  return response.json();
};

export const getCategoryMeta = async (param: String): Promise<IMeta[]> => {
  const response = await fetch(`/api/v1/category/${param}`, { method: 'GET' });
  return response.json();
};
