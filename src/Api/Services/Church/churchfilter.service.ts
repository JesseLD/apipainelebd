import { sequelize } from "../../Database/sequelize";

export class ChurchFilterService {
  async filter(
    churchNameFilter: string,
    churchCNPJFilter: string,
    plansFilter: string[],
    statusFilter: string,
    emailFilter: string,
    phoneFilter: string
  ) {
    const churchName = churchNameFilter || "";
    const CPF_CNPJ = churchCNPJFilter.replace(/[./-]/g, "") || "";
    const plans = plansFilter || [""];
    const status = statusFilter || "";
    const email = emailFilter || "";
    const phone = phoneFilter || "";

    let statusQuery = "";

    const date = new Date().toISOString().split("T")[0];
    if (status == "1") {
      statusQuery = `AND isActiveted = 1 AND datePlan  >= '${date} 00:00:00.00'`;
    } else if (status == "2") {
      statusQuery = `AND isActiveted = 0`;
    } else if (status == "3") {
      statusQuery = `AND isActiveted = 1 AND datePlan  <= '${date} 00:00:00.00'`;
    }
    // console.log(plans)

    const values = plans.map((plan: string) => plan);

    const placeholders = values.map(() => "?").join(","); // Criar os placeholders para a consulta SQL

    const results = await sequelize.query(
      `SELECT 
        id,
        name,
        REPLACE(REPLACE(REPLACE(CPF_CNPJ, '.', ''), '-', ''), '/', '') AS CPF_CNPJ,
        isActiveted,
        dateplan,
        creationDate,
        TypePlan,
        emailAdmin,
        contact 
      FROM 
        Church 
      WHERE 
        idChurch IS NULL 
        AND name LIKE ?
        AND REPLACE(REPLACE(REPLACE(CPF_CNPJ, '.', ''), '-', ''), '/', '') LIKE ?
        AND emailAdmin LIKE ?
        AND contact LIKE ? 
        ${statusQuery}
        AND TypePlan IN (${placeholders}) 
        `,
      {
        replacements: [
          `%${churchName}%`,
          `%${CPF_CNPJ}%`,
          `%${email}%`,
          `%${phone}%`,
          ...values,
        ],
      }
    );
    // setData(data);
    const data = results[0];
    return data;
  }
}
