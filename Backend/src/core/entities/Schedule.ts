export class Schedule {
    constructor(
      public id: string,
      public price: string,
      public ownerId: string,
      public operatorId: string,
      public busId: string,
      public routeId: string,
      public dateSlots: Date[],
      public startTime: string,
      public endTime: string,
      public status: string,
      public isActive: boolean
    ) {}
  }
  