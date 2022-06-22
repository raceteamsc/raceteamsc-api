const database = require('../models');

class LocalsController {
  static async getAllLocals(req, res) {
    try {
      const Locals = await database.Locals.findAll({where: { random: true }});
      return res.status(200).json(Locals);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getLocal(req, res) {
    const { id } = req.params;
    try {
      const Local = await database.Locals.findOne({
        where: { id: number },
      });
      if (!Local)
        return res.status(500).json("Local não encontrado");
      return res.status(200).json(Local);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getEvents(req, res) {
    const { id } = req.params;
    try {
      const events = await database.EventsConfirmations.findAll({ where: {Local_id: Number(id)}});
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createLocal(req, res) {
    const body = req.body;
    try {
      const newLocal = await database.Locals.create(body);
      return res.status(200).json(newLocal);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateLocal(req, res) {
    const { id } = req.params;
    const newInfos = req.body;
    try {
      await database.Locals.update(newInfos, { where: { id: Number(id) } });
      const LocalUpdated = await database.Locals.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(LocalUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteLocal(req, res) {
    const { id } = req.params;
    try {
      await database.Locals.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LocalsController;
