<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Category } from '@interfaces/category.interface';
import categoryService from '@services/category.service';
import { CreateCategoryDto } from '@/dtos/category.dto';
import BaseController from './base.controller';
import { ApiResponse } from '../interfaces/apitResponse';

class CategoryController extends BaseController {
  public categoryService = new categoryService();

  public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllCategorysData: Category[] = await this.categoryService.findAllCategory(limit, offset);
      const findAllCategorys: Category[] = await this.categoryService.findAllCategory(null, null);
      const totalRows: number = findAllCategorys.length;
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get one product success";
        success = true;
      }else{
        message = "Product not found";
        success = false;
      }

      const data: ApiResponse = this.response(success, message, findAllCategorysData, totalRows, limit, page);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCatData: Category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createCatData, message: 'created category success' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoryService.updateCategory(CategoryId, categoryData);

      res.status(200).json({ data: updateCategoryData, message: 'category updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const findCategoryByIdData: Category[] = await this.categoryService.findCategoryById(CategoryId);
      const totalRows: number =  findCategoryByIdData.length;
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get one category success";
        success = true;
      }else{
        message = "Category not found";
        success = false;
      }
      const data: ApiResponse = this.response(success, message, findCategoryByIdData, totalRows, null, 1);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };


  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      //console.log(produitId);
      const deleteCategoryData: Category = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'category deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default CategoryController;
=======
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Category } from '@interfaces/category.interface';
import categoryService from '@services/category.service';
import { CreateCategoryDto } from '@/dtos/category.dto';

class CategoryController {
  public categoryService = new categoryService();

  public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllCategorysData: Category[] = await this.categoryService.findAllCategory(limit, offset);
      const findAllCategorys: Category[] = await this.categoryService.findAllCategory(null, null);

      const data = {
        status: 200,
        totalRows: findAllCategorys.length,
        limit: limit,
        page: page,
        rows: findAllCategorysData, 
      }

      res.status(200).json({ data, message: 'get all category success' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCatData: Category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createCatData, message: 'created category success' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoryService.updateCategory(CategoryId, categoryData);

      res.status(200).json({ data: updateCategoryData, message: 'category updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const findCategoryByIdData: Category[] = await this.categoryService.findCategoryById(CategoryId);
      const data: any = {
        status: 200,
        totalRows: findCategoryByIdData.length,
        limit: null,
        page: 1,
        rows: findCategoryByIdData
      }
      res.status(200).json({ data, message: 'findCategory data success' });
    } catch (error) {
      next(error);
    }
  };


  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      //console.log(produitId);
      const deleteCategoryData: Category = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'category deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default CategoryController;
>>>>>>> 841b2cf615be13410de068f1feeadaccbe93ef19
