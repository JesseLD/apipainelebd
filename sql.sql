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
    `Church` AS ch ON MONTH(ch.creationDate) = months.MonthNumber
WHERE 
    ch.creationDate BETWEEN '2024-01-01' AND '2024-12-31' OR ch.creationDate IS NULL
GROUP BY 
    months.MonthNumber, months.MonthName
ORDER BY 
    months.MonthNumber;
