// eslint-disable-next-line import/no-anonymous-default-export
export default async (url: any, token: any) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    });
  
    return res.json();
  };