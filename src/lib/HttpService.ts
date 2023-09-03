import axios from 'axios';

import type { AxiosInstance } from 'axios';

class HttpService {
	instance: AxiosInstance;

	constructor(public endpoint: string) {
		this.instance = axios.create({
			baseURL: 'https://64cf6ee5ffcda80aff51d894.mockapi.io'
		});
	}

	get<Data>() {
		return this.instance.get<Data>(this.endpoint);
	}

	post<Data, T>(payload: T) {
		return this.instance.post<Data>(this.endpoint, payload);
	}

	patch<Data, T>(payload: T) {
		return this.instance.patch<Data>(this.endpoint, payload);
	}
}

export default HttpService;
