const database = require('../models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const sympla = require('../services/sympla');
const bot = require('../services/bot');
const whatsapp = require('../services/whatsapp');
const FormData = require('form-data');
const fs = require('fs');
const path = require("path");
const BranchsController = require('./BranchsController');

class EventsController {
  static async getAllEvents(req, res) {
    try {
      const events = await database.Events.findAll({
        where: {
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
  static async getEvent(req, res) {
    const { id } = req.params;
    try {
      const symplaEvents = await BranchsController.getSymplaEvents();
      const symplaEvent = symplaEvents.find(event => event.id == id);
      if (symplaEvent)
      {
        return res.status(200).json(symplaEvent);
      }

      const event = await database.Events.findOne({
        where: { id: Number(id) },
        include: [database.Locals, database.Branchs]
      });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async searchEvent(req, res) {
    const { search } = req.params;
    try {
      const event = await database.Events.findAll({
        where: {
          name: sequelize.where(sequelize.fn('LOWER', sequelize.col('Events.name')), 'LIKE', '%' + search + '%')
        },
        order: [['date']],
        include: [database.Locals, database.Branchs]
      });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createEvent(req, res) {
    let {body, file} = req;
    try {
      body.date = new Date(body.date);
      if (file) {
        const form = new FormData();

        // Append text fields to the form
        const originalPath = path.resolve(__dirname,"../" + file.path);
        fs.renameSync(originalPath, originalPath + ".jpg")
        const localFile = fs.createReadStream(originalPath + ".jpg");
        
        form.append('file', localFile);
        form.append('messaging_product', "whatsapp");

        const res = await whatsapp.post('/media', form)
          .catch((e) => console.error(e.response.data))
          
        if (res)
          body.media_url = res.data.id;
      }
      body.active = true;
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
        if (eventConfirm.confirmed == false)
        {
          return res.status(409).json("O membro já recusado.");
        }
        if (eventConfirm.checkin == true)
        {
          return res.status(409).json("Não pôde ser recusado, o check-in já foi feito. Faça o check-out antes.");
        }
        await database.EventsConfirmations.update({confirmed: false}, { where: {event_id: Number(id), member_id: Number(memberId)}});
        return res.status(200).json("O membro estava confirmado nesse evento");
      }
      eventConfirm = await database.EventsConfirmations.create({event_id: Number(id), member_id: Number(memberId), confirmed: false});
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
        eventConfirm = await database.EventsConfirmations.update({confirmed: true}, {where: {event_id: Number(id), member_id: Number(memberId)}})
        return res.status(200).json(eventConfirm);
      }
      eventConfirm = await database.EventsConfirmations.create({event_id: Number(id), member_id: Number(memberId), confirmed: true});
      return res.status(200).json(eventConfirm);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async paidParticipant(req, res) {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (!eventConfirm)
      {
        return res.status(409).json("O membro não está confirmado nesse evento");
      }
      if (eventConfirm.checkin == true)
      {
        return res.status(409).json("O membro já está com o checkin feito");
      }
      await database.EventsConfirmations.update({paid: true}, { where: {event_id: Number(id), member_id: Number(memberId)}});
      return res.status(200).json("Pagamento feito");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async checkinParticipant(req, res) {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (!eventConfirm)
      {
        return res.status(409).json("O membro não está confirmado nesse evento");
      }
      if (eventConfirm.checkin == true)
      {
        return res.status(409).json("O membro já está com o checkin feito");
      }
      await database.EventsConfirmations.update({checkin: true}, { where: {event_id: Number(id), member_id: Number(memberId)}});
      return res.status(200).json("Check-in feito");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async checkoutParticipant(req, res) {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(id), member_id: Number(memberId)}});
      if (!eventConfirm)
      {
        return res.status(409).json("O membro não está confirmado nesse evento");
      }
      if (eventConfirm.checkin == false)
      {
        return res.status(409).json("O membro não está com o checkin feito");
      }
      await database.EventsConfirmations.update({checkin: false}, { where: {event_id: Number(id), member_id: Number(memberId)}});
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
          confirmed: true
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
    let {body, file} = req;
    try {
      if (file) {
        const form = new FormData();

        // Append text fields to the form
        const originalPath = path.resolve(__dirname,"../" + file.path);
        fs.renameSync(originalPath, originalPath + ".jpg")
        const localFile = fs.createReadStream(originalPath + ".jpg");
        
        form.append('file', localFile);
        form.append('messaging_product', "whatsapp");

        const res = await whatsapp.post('/media', form)
          .catch((e) => console.error(e.response.data))
        if (res)
          body.media_url = res.data.id;
      }
      await database.Events.update(body, { where: { id: Number(id) } });
      const eventUpdated = await database.Events.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(eventUpdated);
    } catch (error) {
      console.error(error.message)
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
