export const  timeStampToDate = (unix_timestamp) => {
  function pad(num, size) {
    let s = "0" + num;
    return s.substr(s.length - size);
  }

  const date = new Date(unix_timestamp * 1000);

  const year = date.getFullYear();

  const month = date.getMonth() + 1;

  const day = date.getDate();

  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = date.getMinutes();
  // Seconds part from the timestamp
  const seconds = date.getSeconds();

  // Will display time in 10:30:23 format
  return (
    year +
    "/" +
    pad(month, 2) +
    "/" +
    pad(day, 2) +
    " " +
    pad(hours, 2) +
    ":" +
    pad(minutes, 2)
  );
}

export const getTimeRemaining = (endtime) => {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t / 1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
