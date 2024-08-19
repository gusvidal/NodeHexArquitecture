import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/insfrastructure/ServiceContainer";
import { UserNotFoundException } from "../domain/Exception/UserNotFoundException";

export class UserController{
// next: NextFunction nos sirve para mapear errores de ejecución
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const users = await ServiceContainer.user.getAll.run();
            return res.json(users.map((user)=> user.mapToPrimitives())).status(200);
        }catch (error){
            next(error);
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction){
        try{
            const user = await ServiceContainer.user.getOneById.run(req.params.id);
            return res.json(user.mapToPrimitives()).status(200); 
        } catch (error){
            if (error instanceof UserNotFoundException) {
                return res.status(404).json({ message: error.message });
              }
            next(error);
        }
        
    }

    async create(req: Request, res: Response, next: NextFunction){
            try{
                const {id, name, email, createAt} = req.body as {
                        id: string,
                        name: string,
                        email: string,
                        createAt: string
                };
                await ServiceContainer.user.create.run(id, name, email, new Date(createAt));
                return res.status(201).send();
            }catch (error){
                next(error);
            }
        }

    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {id, name, email, createAt} = req.body as {
                id: string,
                name: string,
                email: string,
                createAt: string
            };
            await ServiceContainer.user.update.run(id, name, email, new Date(createAt));
            return res.status(201).send();
        }catch (error){
            if (error instanceof UserNotFoundException) {
                return res.status(404).json({ message: error.message });
              }
            next(error);
        }
    }
    
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            await ServiceContainer.user.delete.run(req.params.id)
            return res.status(204).send();
        }catch (error){
            if (error instanceof UserNotFoundException) {
                return res.status(404).json({ message: error.message });
              }
            next(error);
        }
    }
}