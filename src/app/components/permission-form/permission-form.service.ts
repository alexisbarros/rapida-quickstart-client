import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "src/app/implementations";

@Injectable({
  providedIn: "root",
})
export class PermissionFormService {
  BASE_URL = "http://localhost:3000";

  constructor(private _httpClient: HttpClient) { }

  getAll(filter: string = "") {
    // return this._httpClient
    //   .get(`${this.BASE_URL}/__permission-groups${filter}`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .get({
        route: `${this.BASE_URL}/__permission-groups${filter}`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  delete(id: string) {
    // return this._httpClient
    //   .delete(`${this.BASE_URL}/__permission-groups/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .delete({
        route: `${this.BASE_URL}/__permission-groups/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  save(body: any) {
    // return this._httpClient
    //   .post(`${this.BASE_URL}/__permission-groups`, body, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .post({
        route: `${this.BASE_URL}/__permission-groups`,
        body,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  update(body: any, id: string) {
    // return this._httpClient
    //   .put(`${this.BASE_URL}/__permission-groups/${id}`, body, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .put({
        route: `${this.BASE_URL}/__permission-groups/${id}`,
        body,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  find(id: string) {
    // return this._httpClient
    //   .get(`${this.BASE_URL}/__permission-groups/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .get({
        route: `${this.BASE_URL}/__permission-groups/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  moduleIdSelectObjectGetAll() {
    // return this._httpClient
    //   .get(`${this.BASE_URL}/__modules`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .get({
        route: `${this.BASE_URL}/__modules`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }
  permissionActionsSelectObjectGetAll() {
    // return this._httpClient
    //   .get(`${this.BASE_URL}/__permission-actions`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   });
    return Http
      .get({
        route: `${this.BASE_URL}/__permission-actions`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      });
  }

  refreshToken() {
    // return this._httpClient
    //   .get(`${this.BASE_URL}/auth/refresh-token`, {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
    //     },
    //   });
    return Http
      .get({
        route: `${this.BASE_URL}/auth/refresh-token`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
          },
        }
      });
  }
}
