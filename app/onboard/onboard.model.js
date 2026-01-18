export default class OnboardModel {
  constructor(id, name, currentFloor, dropOffFloor) {
    this.id = id;
    this.name = name;
    this.currentFloor = currentFloor;
    this.dropOffFloor = dropOffFloor;
  }

  static fromDatabase(row) {
    return new OnboardModel(
      row.id,
      row.name,
      row.currentFloor,
      row.dropOffFloor,
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      currentFloor: this.currentFloor,
      dropOffFloor: this.dropOffFloor,
    };
  }
}
