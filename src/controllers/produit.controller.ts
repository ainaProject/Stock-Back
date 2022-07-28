/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Produit } from '@interfaces/produits.interface';
import produitService from '@services/produits.service';
import { CreateProduitDto } from '@/dtos/produits.dto';
import BaseController from './base.controller';
import { ApiResponse } from '../interfaces/apitResponse';

class ProduitController extends BaseController {
  public produitService = new produitService();

  public getAllProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request = req.query;
      const page = +request.page;
      const take = +request.limit;
      const skip = take * (page - 1)

      const findAllProduitsDataNoLimit: Produit[] = await this.produitService.findAllProduit(null, null);
      const totalRows = findAllProduitsDataNoLimit.length;
      const findAllProduitsData: Produit[] = await this.produitService.findAllProduit(take, skip);
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get all product with success";
        success = true;
      }else{
        message = "Product not found";
        success = false;
      }

      const data: ApiResponse = this.response(success, message, findAllProduitsData, totalRows, take, page);
      res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  };

  public getProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ProduitId = Number(req.params.id);
      const findProduct: Produit[]= await this.produitService.findProduitById(ProduitId);
      let message = "";
      let success = true;

      if ( findProduct.length > 0 ) {
        message = "Get one product success";
        success = true;
      }else{
        message = "Product not found";
        success = false;
      }

      const data: ApiResponse = this.response(success, message, findProduct, findProduct.length, null, 1); 
      res.status(200).json({ data, message: 'findCategory data success' });
    } catch (error) {
      next(error);
    }
  };

  public createProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const produitData: CreateProduitDto = req.body;
      const createProdData: Produit = await this.produitService.createProduit(produitData);

      res.status(201).json({ data: createProdData, message: 'created' });
      
    } catch (error) {
      next(error);
    }
  };

  public updateProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ProduitId = Number(req.params.id);
      const produitData: CreateProduitDto = req.body;
      const updateProduitData: Produit = await this.produitService.updateProduit(ProduitId, produitData);

      res.status(200).json({ data: updateProduitData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };


  public deleteProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const produitId = Number(req.params.id);
      //console.log(produitId);
      const deleteProduitData: Produit = await this.produitService.deleteProduit(produitId);

      res.status(200).json({ data: deleteProduitData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default ProduitController;
