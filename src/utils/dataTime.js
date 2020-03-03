// 处理时间格式
export function handleTime(time) {
    let time_str = time ? new Date(time) : new Date();

    time_str = time_str.getFullYear() +
        '-' +
        ('00' + (time_str.getMonth() + 1)).substr(-2) +
        '-' +
        ('00' + time_str.getDate()).substr(-2) +
        ' ' +
        ('00' + time_str.getHours()).substr(-2) +
        ':' +
        ('00' + time_str.getMinutes()).substr(-2) +
        ':' +
        ('00' + time_str.getSeconds()).substr(-2);

    return time_str;
}