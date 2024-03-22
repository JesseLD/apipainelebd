import { ChurchService } from "../../Services/Church/church.service";
import { ChurchFilterService } from "../../Services/Church/churchfilter.service";
import { deleteChurch } from "../../Services/Church/deletechurch.service";
import { SingleChurchService } from "../../Services/Church/singleChurch.service";
import { Request, Response } from "express";

const singleChurchService = new SingleChurchService();
const churchService = new ChurchService();
const churchFilterService = new ChurchFilterService();

class ChurchController {
  async findOne(req: Request, res: Response) {
    const data = await singleChurchService.findOne(
      Number.parseInt(req.params.id)
    );
    res.json({ data });
  }
  async findMembers(req: Request, res: Response) {
    const data = await singleChurchService.findMembers(
      Number.parseInt(req.params.id)
    );
    res.json({ data });
  }
  async findSingleMember(req: Request, res: Response) {
    const data = await singleChurchService.findSingleMember(
      Number.parseInt(req.params.id)
    );
    res.json({ data });
  }
  async findChurchAdmins(req: Request, res: Response) {
    const data = await singleChurchService.findChurchAdmins(
      Number.parseInt(req.params.id)
    );
    res.json({ data });
  }

  async activate(req: Request, res: Response) {
    const { id, activate } = req.body;

    if (activate == undefined)
      return res.status(400).json({ message: "Missing 'activate' field" });
    if (!id) return res.status(400).json({ message: "Missing 'id' field" });
    const data = await churchService.activateChurch(id, activate);

    res.status(data.status).json({ message: data.message });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Missing 'id' field" });

    const data = await churchService.deleteChurchById(id);
    res.status(data.status).json({ message: data.message });
  }
  async filter(req: Request, res: Response) {
    const { churchName, churchCNPJ, plans, status, email, phone } = req.body;
    console.log(req.body);
    const data = await churchFilterService.filter(
      churchName,
      churchCNPJ,
      plans,
      status,
      email,
      phone
    );
    res.json({ data });
  }
  async findAll(req: Request, res: Response) {
    const data = await churchService.getAllChurches(
      Number.parseInt(req.query.offset as string)
    );
    res.json({ data });
  }
  async updatePlan(req: Request, res: Response) {
    const { id, plan } = req.body;

    if (!id) return res.status(400).json({ message: "Missing 'id' field" });
    if (!plan) return res.status(400).json({ message: "Missing 'plan' field" });
    const data = await churchService.updatePlan(id, plan);
    res.status(data.status).json({ message: data.message });
  }
  async updateDateplan(req: Request, res: Response) {
    const { id, time } = req.body;

    if (!id) return res.status(400).json({ message: "Missing 'id' field" });
    if (!time) return res.status(400).json({ message: "Missing 'time' field" });
    const data = await churchService.updateDateplan(id, time);
    res.status(data.status).json({ message: data.message });
  }
}

export const churchController = new ChurchController();
