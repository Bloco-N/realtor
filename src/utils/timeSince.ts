export function timeSince(locale:string, dateInit:Date, dateEnd = new Date()) {

  const seconds = Math.floor((dateEnd.getTime() - dateInit.getTime()) / 1000);

  let interval = seconds / 31536000;

  const period = {
    pt:{
      years: " anos",
      months: " meses",
      days: " dias",
      hours: " horas",
      minutes: " minutos",
      seconds: " segundos"
    },
    en:{
      years: " years",
      months: " months",
      days: " days",
      hours: " hours",
      minutes: " minutes",
      seconds: " seconds"
    },
    es:{
      years: " años",
      months: " meses",
      days: " días",
      hours: " horas",
      minutes: " minutos",
      seconds: " segundos"
    }
  }

  if (interval > 1) {

    return Math.floor(interval) + period[locale].years;
  
  }
  interval = seconds / 2592000;
  if (interval > 1) {

    return Math.floor(interval) + period[locale].months;
  
  }
  interval = seconds / 86400;
  if (interval > 1) {

    return Math.floor(interval) + period[locale].days;
  
  }
  interval = seconds / 3600;
  if (interval > 1) {

    return Math.floor(interval) + period[locale].hours;
  
  }
  interval = seconds / 60;
  if (interval > 1) {

    return Math.floor(interval) + period[locale].minutes;
  
  }
  return Math.floor(seconds) + period[locale].seconds;

}