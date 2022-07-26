const database = require('../models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");

class BranchsController {
  static async getAllBranchs(req, res) {
    try {
      const branchs = await database.Branchs.findAll();
      return res.status(200).json(branchs);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getBranch(req, res) {
    const { id } = req.params;
    try {
      const branch = await database.Branchs.findOne({
        where: { id: Number(id) }
      });
      return res.status(200).json(branch);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getAllEvents(req, res) {
    const { branch } = req.params;
    try {
      const events = await database.Events.findAll({
        where: {
          branch_id: branch,
          date: {
            [Op.or]: {
              [Op.gte]: new Date(),
              [Op.eq]: null
            }
          }
        },
        order: [['date']],
        include: [database.Locals, database.Branchs]
      });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getAllMainEvents(req, res) {
    try {
      const events = await database.Events.findAll({
        where: {
          branch_id: null,
          date: {
            [Op.or]: {
              [Op.gte]: new Date(),
              [Op.eq]: null
            }
          }
        },
        order: [['date']],
        include: database.Locals
      });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async createBranch(req, res) {
    const body = req.body;
    try {
      const newBranch = await database.Branchs.create(body);
      return res.status(200).json(newBranch);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async updateBranch(req, res) {
    const { id } = req.params;
    const newInfos = req.body;
    try {
      await database.Branchs.update(newInfos, { where: { id: Number(id) } });
      const branchUpdated = await database.Branchs.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(branchUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteBranch(req, res) {
    const { id } = req.params;
    try {
      await database.Branchs.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `Filial id ${id} deletada` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = BranchsController;
