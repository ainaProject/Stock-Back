<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import StockService from '../services/stock.service';
import { Stock } from '@/interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import SeuilSecurityService from '@/services/seuilSecurity.service';
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';
import { ApiResponse } from '@/interfaces/apitResponse';
import BaseController from './base.controller';

class StockController extends BaseController {
  public stockService = new StockService();
  public seuilSecurityService = new SeuilSecurityService
  public getAllStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = limit * (page - 1);
      const findAllStockData: Stock[] = await this.stockService.findAllStock(limit, offset);
      const findAllStock: Stock[] = await this.stockService.findAllStock(null, null);
      const totalRows: number = findAllStock.length;
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get all detail with success";
        success = true;
      }else{
        message = "Not found details";
        success = false;
      }

      const data: ApiResponse = this.response( success, message, findAllStockData, totalRows, limit, page);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockId = Number(req.params.id);
      const findStock: Stock = await this.stockService.findStockById(stockId);

      res.status(200).json({ data: findStock, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public getStockRupture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockSeuil: seuilSecurity = await this.seuilSecurityService.findSeuilById();
      const findStock: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil.seuil);
      const totalRows: number = findStock.length;

      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get thresolde security with success";
        success = true;
      }else{
        message = "Not found thresolde";
        success = false;
      }

      const data: ApiResponse = this.response( success, message, findStock, totalRows, null, 1);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockData: CreatestockDto = req.body;
      const createStockData: Stock = await this.stockService.createStock(stockData);

      res.status(201).json({ data: createStockData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default StockController;
=======
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import StockService from '../services/stock.service';
import { Stock } from '@/interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import SeuilSecurityService from '@/services/seuilSecurity.service';
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';

class StockController {
  public stockService = new StockService();
  public seuilSecurityService = new SeuilSecurityService
  public getAllStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = limit * (page - 1);
      const findAllStockData: Stock[] = await this.stockService.findAllStock(limit, offset);
      const findAllStock: Stock[] = await this.stockService.findAllStock(null, null);
      const data = {
        status: 200,
        totalRows: findAllStock.length,
        limit: limit,
        page: page,
        rows: findAllStockData,
      }

      res.status(200).json({ data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockId = Number(req.params.id);
      const findStock: Stock = await this.stockService.findStockById(stockId);

      res.status(200).json({ data: findStock, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public getSeuilStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockSeuil: seuilSecurity = await this.seuilSecurityService.findSeuilById();
      const findStock: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil.seuil);

      const data = {
        status: 200,
        totalRows: findStock.length,
        limit: null,
        page: 1,
        rows: findStock,
      }

      res.status(200).json({ data, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockData: CreatestockDto = req.body;
      const createStockData: Stock = await this.stockService.createStock(stockData);

      res.status(201).json({ data: createStockData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default StockController;
>>>>>>> 841b2cf615be13410de068f1feeadaccbe93ef19
