export default class OnboardValidator {
  static validateName(name) {
    const errors = [];
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("name is required and must be a string");
    }
    return errors;
  }

  static validateCurrentFloor(currentFloor) {
    const errors = [];
    if (currentFloor === null || currentFloor === undefined) {
      errors.push("currentFloor is required");
    } else if (isNaN(currentFloor)) {
      errors.push("currentFloor must be a number");
    }
    return errors;
  }

  static validateDropOffFloor(dropOffFloor) {
    const errors = [];
    if (dropOffFloor === null || dropOffFloor === undefined) {
      errors.push("dropOffFloor is required");
    } else if (isNaN(dropOffFloor)) {
      errors.push("dropOffFloor must be a number");
    }
    return errors;
  }

  static validate(data) {
    const errors = [
      ...this.validateName(data.name),
      ...this.validateCurrentFloor(data.currentFloor),
      ...this.validateDropOffFloor(data.dropOffFloor),
    ];

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }
}
