interface TokenPayload {
  email: string;
  name: string;
  features: string[];
  iss: string;
  staff_id: number;
  sub: string;
  scp: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
  iti?: {
    email: string,
    phone: string,
    last_name: string,
    first_name: string,
    identity: string,
  },
}

export const getPayload = (access_token: string): TokenPayload => {
  const [, body] = access_token.split(".");
  const payload = JSON.parse(atob(body));
  return payload;
};
