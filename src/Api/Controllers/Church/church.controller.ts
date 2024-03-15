import { SingleChurchService } from "../../Services/Church/singleChurch.service";
import { Request, Response } from "express";
const singleChurchService = new SingleChurchService();

class ChurchController {
  async findOne(req: Request, res: Response) {
    const data = await singleChurchService.findOne(
      Number.parseInt(req.params.id),
    );
    res.json({ data });
  }
  async findMembers(req: Request, res: Response) {
    const data = await singleChurchService.findMembers(
      Number.parseInt(req.params.id),
    );
    res.json({ data });
  }
  async findSingleMember(req: Request, res: Response) {
    const data = await singleChurchService.findSingleMember(
      Number.parseInt(req.params.id),
    );
    res.json({ data });
  }
  async findChurchAdmins(req: Request, res: Response) {
    const data = await singleChurchService.findChurchAdmins(
      Number.parseInt(req.params.id),
    );
    res.json({ data });
  }
}

export const churchController = new ChurchController();
