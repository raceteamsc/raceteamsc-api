const database = require('../models');
const { Op } = require("sequelize");

class EventsController {
  static async getAllEvents(req, res) {
    try {
      const events = await database.Events.findAll({
        include: database.Locals
      });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getEvent(req, res) {
    const { id } = req.params;
    try {
      const event = await database.Events.findOne({
        where: { id: Number(id) },
        include: database.Locals
      });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async searchEvent(req, res) {
    const { search } = req.query;
    console.log(req.query);
    try {
      const event = await database.Events.findOne({
        where: {
          name: 
          {
            [Op.iLike]: search
          }
        },
        include: database.Locals
      });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createEvent(req, res) {
    const body = req.body;
    try {
      const newEvent = await database.Events.create(body);
      return res.status(200).json(newEvent);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async recuseParticipant(req, res) {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (eventConfirm)
      {
        if (eventConfirm.status == "recused")
        {
          return res.status(409).json("O membro já recusado.");
        }
        if (eventConfirm.status == "checkin")
        {
          return res.status(409).json("Não pôde ser recusado, o check-in já foi feito. Faça o check-out antes.");
        }
        await database.EventsConfirmations.update({status: "recused"}, { where: {event_id: Number(id), member_id: Number(memberId)}});
        return res.status(200).json("O membro estava confirmado nesse evento");
      }
      eventConfirm = await database.EventsConfirmations.create({event_id: Number(id), member_id: Number(memberId), status: "recused"});
      return res.status(200).json("Membro recusado");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async confirmParticipant(req, res) {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (eventConfirm)
      {
        eventConfirm = await database.EventsConfirmations.update({status: "confirmed"}, {where: {event_id: Number(id), member_id: Number(memberId)}})
        return res.status(200).json(eventConfirm);
      }
      eventConfirm = await database.EventsConfirmations.create({event_id: Number(id), member_id: Number(memberId), status: "confirmed"});
      return res.status(200).json(eventConfirm);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async checkinParticipant(req, res) {
    const { id } = req.params;
    const { memberId, status } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (!eventConfirm)
      {
        return res.status(409).json("O membro não está confirmado nesse evento");
      }
      if (eventConfirm.status == "recused")
      {
        return res.status(409).json("Você não pode fazer o check-in de um membro que recusou esse evento");
      }
      if (eventConfirm.status == "checkin")
      {
        return res.status(409).json("O membro já está com o checkin feito");
      }
      await database.EventsConfirmations.update({status: "checkin"}, { where: {event_id: Number(id), member_id: Number(memberId)}});
      return res.status(200).json("Check-in feito");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async checkoutParticipant(req, res) {
    const { id } = req.params;
    const { memberId, status } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (!eventConfirm)
      {
        return res.status(409).json("O membro não está confirmado nesse evento");
      }
      if (eventConfirm.status != "checkin")
      {
        return res.status(409).json("O membro não está com o checkin feito");
      }
      await database.EventsConfirmations.update({status: "confirmed"}, { where: {event_id: Number(id), member_id: Number(memberId)}});
      return res.status(200).json("Check-out feito");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getParticipants(req, res) {
    const { id } = req.params;
    try {
      const events = await database.EventsConfirmations.findAll({ 
        where: {
          event_id: Number(id),
          status: ["confirmed", "checkin"]
        },
        include: { all: true }
      });
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async updateEvent(req, res) {
    const { id } = req.params;
    const newInfos = req.body;
    try {
      await database.Events.update(newInfos, { where: { id: Number(id) } });
      const eventUpdated = await database.Events.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(eventUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteEvent(req, res) {
    const { id } = req.params;
    try {
      await database.Events.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `evento id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async cancelEvent(req, res) {
    const { id } = req.params;
    try {
      await database.Events.update({canceled: true}, { where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `evento id ${id} cancelado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async uncancelEvent(req, res) {
    const { id } = req.params;
    try {
      await database.Events.update({canceled: false}, { where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `evento id ${id} descancelado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EventsController;
