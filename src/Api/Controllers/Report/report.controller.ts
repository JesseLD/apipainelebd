import { Request, Response } from "express";
import { ReportService } from "../../Services/Reports/report.service";


const reportService = new ReportService();

/**
 *
 * Report controller class
 */
class ReportController {

  /**
   *
   * @param res Should Return all churches
   * @returns Array of churches
   * This function should return all churches grouped by each month of the selected year
   */
  async getChurchesByYear(req: Request, res: Response) {

    const { year } = req.query;

    return res.json(await reportService.getChurchesByYear(year as string));

  }

 
  async getStates(req: Request, res: Response) {

    return res.json(await reportService.getFiveStatesWithMoreChurches());
  }

  async getChurchesByState(req: Request, res: Response) {

    const { state } = req.query;

    return res.json(await reportService.getChurchesByState());
  }
 
}

/**
 * Exporting a instance of UserController
 */
export const reportController = new ReportController();
