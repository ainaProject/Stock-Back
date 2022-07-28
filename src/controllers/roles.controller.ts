/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Roles } from '@interfaces/roles.interface';
import RolesService from '@services/roles.service';
import { CreateRolesDto } from '@/dtos/roles.dto';
import BaseController from './base.controller';
import { ApiResponse } from '@/interfaces/apitResponse';

class RolesController extends BaseController {
  public roleService = new RolesService();

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllRolesData: Roles[] = await this.roleService.findAllRoles(limit, offset);
      const findAllRoles: Roles[] = await this.roleService.findAllRoles(null, null);

      const totalRows: number = findAllRoles.length;
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get all roles with success";
        success = true;
      }else{
        message = "Not found role";
        success = false;
      }

      const data: ApiResponse = this.response( success, message, findAllRolesData, totalRows, limit, page);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleData: CreateRolesDto = req.body;
      const createRolesData: Roles = await this.roleService.createRole(roleData);

      res.status(201).json({ data: createRolesData, message: 'created role success' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const RoleId = Number(req.params.id);
      const roleData: CreateRolesDto = req.body;
      const updateRoleData: Roles = await this.roleService.updateRole(RoleId, roleData);

      res.status(200).json({ data: updateRoleData, message: 'role updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const RoleId = Number(req.params.id);
      const findRoleByIdData: Roles[] = await this.roleService.findRolesById(RoleId);
      const totalRows: number = findRoleByIdData.length;
      let message = "";
      let success = true;

      if ( totalRows > 0 ) {
        message = "Get one role with success";
        success = true;
      }else{
        message = "Not found roles";
        success = false;
      }

      const data: ApiResponse = this.response( success, message, findRoleByIdData, totalRows, null, 1);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };


  public deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleId = Number(req.params.id);
      const deleteRoleData: Roles = await this.roleService.deleteRole(roleId);

      res.status(200).json({ data: deleteRoleData, message: 'role deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default RolesController;
