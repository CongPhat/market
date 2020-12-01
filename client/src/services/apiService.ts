import { getToken, clearToken } from "./authentication";
import axios from "axios";
import { SERVICES } from "@config/index";
import NotificationComponent from "@components/commons/NotificationComponent";

class Service {
  service: any;
  constructor() {
    let service = axios.create({
      baseURL: SERVICES.API_URL_BASE,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return Promise.resolve(response.data);
  }

  handleError(error) {
    let status = error.response.status;
    switch (status) {
      case 401: {
        NotificationComponent({
          type: "error",
          notificationProps: {
            message: error?.response?.data?.message || "No permission",
          },
        });
        clearToken();
        window.location.reload();
        window.location.href = `/#/login`;
        break;
      }
      case 500: {
        NotificationComponent({
          type: "error",
          notificationProps: {
            message: error?.response?.data?.message || "Server Error",
          },
        });
        break;
      }
      default: {
        NotificationComponent({
          type: "error",
          notificationProps: {
            message: error?.response?.data?.message || "Error",
          },
        });
        break;
      }
    }
    return Promise.reject(error);
  }

  preparePrivateHeaderConfig() {
    const token = getToken();

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  getDefaultConfig({ isPrivate, isFormData }: any = {}) {
    const config = {
      headers: {},
    };

    if (isPrivate) {
      const privateHeaderConfig = this.preparePrivateHeaderConfig();
      Object.assign(config.headers, privateHeaderConfig);
    }

    if (isFormData) {
      Object.assign(config.headers, {
        "Content-Type": "multipart/form-data",
      });
    }

    return config;
  }

  async get(path, { isPrivate = true } = {}) {
    const config = this.getDefaultConfig({ isPrivate });

    return await this.service.get(path, config);
  }

  async post(path, payload, { isPrivate = true, isFormData = false } = {}) {
    const config = this.getDefaultConfig({ isPrivate, isFormData });

    return await this.service.post(path, payload, config);
  }

  async put(path, payload, { isPrivate = true } = {}) {
    const config = this.getDefaultConfig({ isPrivate });

    return await this.service.put(path, payload, config);
  }

  async delete(path, { isPrivate = true } = {}) {
    const config = this.getDefaultConfig({ isPrivate });

    return await this.service.delete(path, config);
  }

  createFileDownloadURL = (id, accessToken) => {
    if (!id || !accessToken) return;

    return (
      SERVICES.API_URL_BASE + "/file/download/" + id + "?token=" + accessToken
    );
  };
}

export default new Service();
