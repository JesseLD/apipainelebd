import { sequelize } from "../../Database/sequelize";

type YearChurchInfo = {
  Total: number;
  MonthName: string;
};

export class ReportService {
  async getChurchesByYear(year: string): Promise<YearChurchInfo> {
    let yearQuery = year;

    if (!year) {
      yearQuery = new Date().getFullYear().toString();
    }

    try {
      const data = (await sequelize.query(`
      SELECT 
    COALESCE(COUNT(ch.creationDate), 0) AS Total,
    months.MonthName
FROM 
    (SELECT 1 AS MonthNumber, 'January' AS MonthName UNION ALL
     SELECT 2, 'February' UNION ALL
     SELECT 3, 'March' UNION ALL
     SELECT 4, 'April' UNION ALL
     SELECT 5, 'May' UNION ALL
     SELECT 6, 'June' UNION ALL
     SELECT 7, 'July' UNION ALL
     SELECT 8, 'August' UNION ALL
     SELECT 9, 'September' UNION ALL
     SELECT 10, 'October' UNION ALL
     SELECT 11, 'November' UNION ALL
     SELECT 12, 'December') AS months
LEFT JOIN 
    Church AS ch ON MONTH(ch.creationDate) = months.MonthNumber
                 AND ch.creationDate BETWEEN '${yearQuery}-01-01' AND '${yearQuery}-12-31'
GROUP BY 
    months.MonthNumber, months.MonthName
ORDER BY 
    months.MonthNumber;

`)) as YearChurchInfo[];

      return data[0];
    } catch (err) {
      console.log(err);

      return {
        Total: 0,
        MonthName: "",
      };
    }
  }

  async getFiveStatesWithMoreChurches(): Promise<any> {
    try {
      const data = (await sequelize.query(`SELECT state, COUNT(*) AS users
      FROM Church
      WHERE idChurch IS NULL
      GROUP BY state
      ORDER BY users DESC
      LIMIT 5;
      `)) as any;
      return data[0];
    } catch (err) {
      console.log(err);

      return [];
    }
  }

  async getChurchesByState(): Promise<any> {
    try {
      const data = (await sequelize.query(`SELECT
      SUM(CASE WHEN isActiveted = 1 AND datePlan > CURRENT_DATE() THEN 1 ELSE 0 END) AS active,
      SUM(CASE WHEN isActiveted = 1 AND datePlan <= CURRENT_DATE() THEN 1 ELSE 0 END) AS blocked,
      SUM(CASE WHEN isActiveted = 0 THEN 1 ELSE 0 END) AS inactive
  FROM
      Church
  WHERE
      idChurch IS NULL;
  
      `)) as any;
      return data[0];
    } catch (err) {
      console.log(err);

      return [];
    }
  }
}
