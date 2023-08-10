import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CLIENT_ID, CLIENT_SECRET } from '../../utils/dev-config';
import { BASE_API } from '../../utils';
// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f

export default function Oauth() {
  const [searchParams] = useSearchParams();
  const code: string = searchParams.get('code')!;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append('grant_type', 'authorization_code');
    formdata.append('client_id', CLIENT_ID);
    formdata.append('client_secret', CLIENT_SECRET);
    formdata.append('code', code);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://oauth.yandex.ru/token', requestOptions)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((result) => {
        setToken(JSON.parse(result).access_token);
      })
      .catch((error) => console.log('error', error));
  }, [code]);

  useEffect(() => {
    if (token) {
      const raw = JSON.stringify({ token });
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${BASE_API}/api/oauth`, requestOptions)
        .then((response) => response.json())
        .then((result: unknown) => {
          setUser(result as Record<string, string>);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }
  }, [token]);

  return (
    <section className="page">
      <div className="page__content">
        {code}
        -
        {token}
        {user?.default_email}
        {user?.login}
      </div>
    </section>
  );
}
