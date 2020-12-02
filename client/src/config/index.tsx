export let BASE_URL = document.head.querySelector<any>(
  "[property~=base_url][content]"
).content;

export const SERVICES = {
  API_URL_BASE: BASE_URL,
  AuthenticationHeaderField: "__INIT__CURRENT_TOKEN__",
};

export const USA = "USA";
export const CURRENT_LANGUAGE = "__INIT__CURRENT_LANGUAGE__";

export const DASHBOARD = "/dashboard";
export const HOME = "/:id";
