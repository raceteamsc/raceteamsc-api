const database = require('../models');

class MembersController {
  static async getAllMembers(req, res) {
    try {
      const Members = await database.Members.findAll();
      return res.status(200).json(Members);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getMember(req, res) {
    const { number } = req.params;
    try {
      const member = await database.Members.findOne({
        where: { number: number },
      });
      if (!member)
        return res.status(500).json("Membro não encontrado");
      return res.status(200).json(member);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getEvents(req, res) {
    const { id } = req.params;
    try {
      const events = await database.EventsConfirmations.findAll({ where: {member_id: Number(id)}});
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createMember(req, res) {
    const body = req.body;
    try {
      const newMember = await database.Members.create(body);
      return res.status(200).json(newMember);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateMember(req, res) {
    const { id } = req.params;
    const newInfos = req.body;
    try {
      await database.Members.update(newInfos, { where: { id: Number(id) } });
      const memberUpdated = await database.Members.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(memberUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteMember(req, res) {
    const { id } = req.params;
    try {
      await database.Members.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = MembersController;
