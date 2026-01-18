import OnboardService from "./onboard.service.js";

export default class OnboardController {
  constructor() {
    this.service = new OnboardService();
  }

  create = async (req, res) => {
    try {
      const { name, currentFloor, dropOffFloor } = req.body;
      const data = await this.service.create(name, currentFloor, dropOffFloor);
      res.status(201).json(data.toJSON());
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const data = await this.service.findAll();
      res.json(data.map((item) => item.toJSON()));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const changes = await this.service.delete(id);
      res.json({ deleted: changes });
    } catch (error) {
      const statusCode = error.message === "Record not found" ? 404 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  };
}
