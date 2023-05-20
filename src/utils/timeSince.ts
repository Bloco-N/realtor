export function timeSince(dateInit:Date, dateEnd = new Date()) {

  const seconds = Math.floor((dateEnd.getTime() - dateInit.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {

    return Math.floor(interval) + " anos";
  
  }
  interval = seconds / 2592000;
  if (interval > 1) {

    return Math.floor(interval) + " meses";
  
  }
  interval = seconds / 86400;
  if (interval > 1) {

    return Math.floor(interval) + " dias";
  
  }
  interval = seconds / 3600;
  if (interval > 1) {

    return Math.floor(interval) + " horas";
  
  }
  interval = seconds / 60;
  if (interval > 1) {

    return Math.floor(interval) + " minutos";
  
  }
  return Math.floor(seconds) + " segundos";

}