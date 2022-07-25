export function countDownTo(year, month, day, timeOfDay) {

  const currentYear = new Date().getFullYear();

  if (year >= currentYear) {

    const mintDeadLine = new Date(`${month} ${day} ${year} ${timeOfDay}`);

    const currentTime = new Date();
    const diff = mintDeadLine - currentTime;
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    const time = {
      d,
      h: h < 10 ? "0" + h : h ,
      m: m < 10 ? "0" + m : m,
      s : s < 10 ? "0" + s : s,
    };

    return time;
 
  }
}
export default countDownTo;