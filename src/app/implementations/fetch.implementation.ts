import { IHttp, IHttpData, IHttpResponse } from "../interfaces/http.interface";

export class FetchImplementation implements IHttp {
    async get(data: IHttpData): Promise<IHttpResponse> {
        const response = await fetch(
            data.route,
            {
                method: 'GET',
                ...data.options,
            }
        );

        const responseJson = await response.json();

        if (responseJson?.statusCode !== 200)
            throw new Error(responseJson?.logMessage);

        return responseJson;
    }

    async post(data: IHttpData): Promise<IHttpResponse> {
        const response = await fetch(
            data.route,
            {
                method: 'POST',
                body: data.body,
                ...data.options,
            }
        );

        const responseJson = await response.json();

        if (responseJson?.statusCode !== 200)
            throw new Error(responseJson?.logMessage);

        return responseJson;
    }

    async put(data: IHttpData): Promise<IHttpResponse> {
        const response = await fetch(
            data.route,
            {
                method: 'PUT',
                body: data.body,
                ...data.options,
            }
        );

        const responseJson = await response.json();

        if (responseJson?.statusCode !== 200)
            throw new Error(responseJson?.logMessage);

        return responseJson;
    }

    async delete(data: IHttpData): Promise<IHttpResponse> {
        const response = await fetch(
            data.route,
            {
                method: 'DELETE',
                ...data.options,
            }
        );

        const responseJson = await response.json();

        if (responseJson?.statusCode !== 200)
            throw new Error(responseJson?.logMessage);

        return responseJson;
    }

}