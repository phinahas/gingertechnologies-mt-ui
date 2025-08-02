
import {DateTime} from 'luxon'

export const convertUTCToLocalWithLuxon = (utcDateString) => {

    try {

        const dt = DateTime.fromISO(utcDateString, { zone: 'utc' });
        if (!dt.isValid) {
            return { error: 'Invalid date format' };
        }
        const localDt = dt.toLocal(); // Convert to local timezone


        return `${localDt.toFormat('HH:mm')}, ${localDt.toFormat('dd/MM/yyyy')}`

    } catch (error) {
        return ''
    }


}

export const  generateUniqueId = ()=> {
  const now = new Date();

  const pad = (n, width = 2) => n.toString().padStart(width, '0');

  const dd = pad(now.getDate());
  const mm = pad(now.getMonth() + 1); // Months are zero-based
  const yyyy = now.getFullYear();
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  const ms = pad(now.getMilliseconds(), 2); // pad milliseconds to 3 digits

  return `${dd}${mm}${yyyy}${hh}${min}${ss}${ms}`;
}


export const getCurrentUtcTime = () => {
  return new Date().toISOString();
}
