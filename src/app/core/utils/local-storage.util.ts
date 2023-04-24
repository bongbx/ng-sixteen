import { getLanguageCodeByCountry } from './i18n.util';

export const setTenantId = (tenantId: string) => {
  const id_token_claims_obj_data = localStorage.getItem('id_token_claims_obj');

  if (id_token_claims_obj_data) {
    const id_token_claims_obj = JSON.parse(id_token_claims_obj_data);
    const new_id_token_claims_obj_data = JSON.stringify({
      ...id_token_claims_obj,
      tenantid: tenantId,
    });
    localStorage.setItem('id_token_claims_obj', new_id_token_claims_obj_data);
  } else {
    localStorage.setItem(
      'id_token_claims_obj',
      JSON.stringify({
        tenantid: tenantId,
      }),
    );
  }
};

export const setTenantIdIfNull = (tenantId: string) => {
  const id_token_claims_obj_data = localStorage.getItem('id_token_claims_obj');

  if (id_token_claims_obj_data) {
    const id_token_claims_obj = JSON.parse(id_token_claims_obj_data);
    // tenantId is null
    if (!id_token_claims_obj.tenantid) {
      const new_id_token_claims_obj_data = JSON.stringify({
        ...id_token_claims_obj,
        tenantid: tenantId,
      });
      localStorage.setItem('id_token_claims_obj', new_id_token_claims_obj_data);
    }
  } else {
    localStorage.setItem(
      'id_token_claims_obj',
      JSON.stringify({
        tenantid: tenantId,
      }),
    );
  }
};

export const getTenantId = (): string | undefined => {
  const id_token_claims_obj_data = localStorage.getItem('id_token_claims_obj');

  if (id_token_claims_obj_data) {
    const id_token_claims_obj = JSON.parse(id_token_claims_obj_data);
    if (id_token_claims_obj) {
      return id_token_claims_obj.tenantid;
    }
  }

  return undefined;
};

export const setSubject = (subject: string) => {
  const id_token_claims_obj_data = localStorage.getItem('id_token_claims_obj');

  if (id_token_claims_obj_data) {
    const id_token_claims_obj = JSON.parse(id_token_claims_obj_data);
    const new_id_token_claims_obj_data = JSON.stringify({
      ...id_token_claims_obj,
      sub: subject,
    });
    localStorage.setItem('id_token_claims_obj', new_id_token_claims_obj_data);
  } else {
    localStorage.setItem(
      'id_token_claims_obj',
      JSON.stringify({
        sub: subject,
      }),
    );
  }
};

export const setDLVR_JWTToken = (token: string) => {
  localStorage.setItem('dlvr_jwt_token', token);
};

export const getDLVR_JWTToken = () => localStorage.getItem('dlvr_jwt_token');

export const getSubject = (): string | undefined => {
  const id_token_claims_obj_data = localStorage.getItem('id_token_claims_obj');

  if (id_token_claims_obj_data) {
    const id_token_claims_obj = JSON.parse(id_token_claims_obj_data);
    if (id_token_claims_obj) {
      return id_token_claims_obj.sub;
    }
  }

  return undefined;
};

export const setCountryCode = (country_code: string) => {
  localStorage.setItem('country_code', country_code);
};

export const setLanguageByCountry = (country_code: string) => {
  const languageCode = getLanguageCodeByCountry(country_code);
  localStorage.setItem('lang', languageCode);
};

export const getCountryCode = () => localStorage.getItem('country_code');

export const getLanguageCode = () => localStorage.getItem('lang');
