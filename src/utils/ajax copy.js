import axios from 'axios';

// 添加请求拦截器
// axios.interceptors.request.use(config => {
// 	if (config.method === 'get' || config.method === 'delete') {
// 		config.params = config.data;
// 	}
// 	return config;
// }, error => {
// 	return Promise.reject(error);
// });

// // 添加响应拦截器
// axios.interceptors.response.use(response => {
// 	if (response.status === 200 || response.status === 304 || response.status === 400) {
// 		return Promise.resolve(response.data);
// 	}
// }, error => {
// 	return Promise.reject(error);
// });
export default function ajax(url, method, params) {
	
	return new Promise((resolve, reject) => {
		let config = {
			url: url,
			method: method,
			data: params,
			headers: {
				'Content-type': 'application/json;charset=utf-8'
			}
		};
		axios(config).then(response => {
			// console.log('resppp',response)
			// 请求接口正确且成功时
			if (response.status === 200) {
				resolve(response.data ? response.data : response);
			} else if (response.status === 500) {
				// 请求接口错误或不成功时
				if (response.message) {
					reject(response.message);
				} else {
					// 请求接口错误或不成功时
					reject('服务器崩溃了~~~');
				}
			} else if (response.status === 401) {
				reject(response.message);
			} else if (response.status === 400 || response.status === 1001) {
				reject(response.message);
			} else {
				reject('请求失败~~~');
			}
		}).catch(error => {
			reject(error);
		});
	});

};