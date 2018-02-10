const Main = {
	/**
	 * 时间格式转换
	 * 
	 * @param {time} 	时间戳 （毫秒）
	 * @param {format} 	显示的格式
	 * @returns
	 */
	detaFormat(time,format) {
		if (time) {
			let date = new Date(time);
			let o = {
			    "M+": date.getMonth() + 1, //月
			    "D+": date.getDate(), //天
			    "W": "日一二三四五六".charAt(date.getDay()), //星期
			    "h+": date.getHours(), //时
			    "m+": date.getMinutes(), //分
			    "s+": date.getSeconds(), //秒
			    "q+": Math.floor((date.getMonth() + 3) / 3), //季节
			    "S": date.getMilliseconds() //毫秒
			};
			if (/(Y+)/.test(format))
			    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

			for (let k in o) {
			    if (new RegExp("(" + k + ")").test(format)) {
			        format = format.replace(RegExp.$1,
			        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			    }
			}		
		} else {
			format = '';
		}
		
		return format;
	}
};

export default Main;
