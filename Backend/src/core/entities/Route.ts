export class Route {
    constructor(
      public id: string,
      public ownerId: string,
      public source: string,
      public destination: string,
      public pickupStops:string[],
      public dropStops: string[],
      public distance: number,
      public createdAt: Date,
      public estimatedTime: string,
      public updatedAt: Date | null
    ) {}
  

  }
  