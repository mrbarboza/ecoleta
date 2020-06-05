import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { state, city, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex.select('points.*').distinct().table('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('state', String(state))
      .where('city', String(city));

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.15.15:3333/uploads/${point.image}`,
      }
    })

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex.select().table('points').where('id', id).first();

    if (!point) {
      response.status(400).json({ message: "Point not found" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.15.15:3333/uploads/${point.image}`,
    }

    const items = await knex.select('point_items.item_id', 'items.title').table('items')
      .join('point_items', 'items.id', '=', 'point_items.id')
      .where('point_items.point_id', id);

    return response.json({
      ...serializedPoint,
      items
    })
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      state,
      city,
      items
    } = request.body;
  
    const trx = await knex.transaction();
  
    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      state,
      city
    }

    const insertedIds = await trx.insert(point).table('points');
  
    const point_id = insertedIds[0];
  
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          point_id,
          item_id,
        }
      });
  
    await trx.insert(pointItems).table('point_items');

    await trx.commit();
  
    return response.json({ 
      id: point_id,
      ...point
     })
  }
}

export default PointsController;