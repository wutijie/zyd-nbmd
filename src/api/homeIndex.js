import { cGet, cPost } from '../utils/cServe.js'
export function getIndex(params){
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/Index',{
				// userTelNumber:'13806665159',
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}