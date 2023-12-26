import {realtorAvailable}  from '../jobs/RealtorValidate';

class ManagerCron{
 private jobs: any[]
//dateAtestation, datePlayDay
  constructor(){
    this.jobs = [realtorAvailable]
  }

  run(){
    this.jobs.forEach(job => job.start())
  }
}

export default new ManagerCron()