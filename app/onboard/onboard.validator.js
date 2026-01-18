export default class OnboardValidator {
  static validate(data) {
    const errors = [];

    // Check if name exists and is not empty
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim() === ""
    ) {
      errors.push("name is required and must be a string");
    }

    // Check if currentFloor exists and is a number
    if (data.currentFloor === null || data.currentFloor === undefined) {
      errors.push("currentFloor is required");
    } else if (isNaN(data.currentFloor)) {
      errors.push("currentFloor must be a number");
    }

    // Check if dropOffFloor exists and is a number
    if (data.dropOffFloor === null || data.dropOffFloor === undefined) {
      errors.push("dropOffFloor is required");
    } else if (isNaN(data.dropOffFloor)) {
      errors.push("dropOffFloor must be a number");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }
}
