
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RelatedUserFormService {
  BASE_URL = "http://localhost:3000";

  constructor(private _httpClient: HttpClient) { }


  getAll(filter: string = "") {
    return this._httpClient.get(
      `${this.BASE_URL}/__related-users${filter}`, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    }
    );
  };

  delete(id: string) {
    return this._httpClient.delete(
      `${this.BASE_URL}/__related-users/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
  };

  save(body: any) {
    return this._httpClient.post(
      `${this.BASE_URL}/__related-users`,
      body,
      {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
  };

  update(body: any, id: string) {
    return this._httpClient.put(
      `${this.BASE_URL}/__related-users/${id}`,
      body,
      {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
  };

  find(id: string) {
    return this._httpClient.get(
      `${this.BASE_URL}/__related-users/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
  };

  permissionGroupIdSelectObjectGetAll(filter: string = "") {
    return this._httpClient.get(
      `${this.BASE_URL}/__permission-groups${filter}`, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    }
    );
  }



  refreshToken() {
    return this._httpClient.get(
      `${this.BASE_URL}/auth/refresh-token`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('refreshToken')}`
      }
    }
    );
  }

}
