import OnboardRepository from "./onboard.repository.js";
import OnboardModel from "./onboard.model.js";
import OnboardValidator from "./onboard.validator.js";

export default class OnboardService {
  constructor() {
    this.repository = new OnboardRepository();
  }

  async create(name, currentFloor, dropOffFloor) {
    OnboardValidator.validate({ name, currentFloor, dropOffFloor });

    const data = await this.repository.create(name, currentFloor, dropOffFloor);
    return new OnboardModel(
      data.id,
      data.name,
      data.currentFloor,
      data.dropOffFloor,
    );
  }

  async findAll() {
    const rows = await this.repository.findAll();
    return rows.map((row) => OnboardModel.fromDatabase(row));
  }

  async findById(id) {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new Error("Record not found");
    }
    return OnboardModel.fromDatabase(row);
  }

  async delete(id) {
    const changes = await this.repository.delete(id);
    if (changes === 0) {
      throw new Error("Record not found");
    }
    return changes;
  }
}
