CREATE OR REPLACE VIEW infoview AS
SELECT i.id AS infoModelId, i.email, i.phone, i.dni, i.gender, i.infoType, i.infoId, i.note, i.addressId,
       a.line1, a.line2, a.municipeId, a.provinceId, p.name AS province,
       p.code AS provinceCode, m.name AS municipe, m.code AS municipeCode FROM infos i
       LEFT JOIN address a ON i.addressId=a.id LEFT JOIN provinces p
       ON a.provinceId=p.id LEFT JOIN municipes m ON a.municipeId=m.id;

CREATE OR REPLACE VIEW userview AS
SELECT u.id, u.name, u.lastname, u.username, null as password, i.*, u.createdAt, u.updatedAt,
u.deletedAt FROM users u LEFT JOIN infoview i on i.infoId=u.id
WHERE i.infoType="User" OR i.phone IS NULL;

CREATE OR REPLACE VIEW patientview AS
SELECT p.*, i.* FROM patients p LEFT JOIN infoview i on i.infoId=p.id WHERE i.infoType="Patient" OR i.phone IS NULL;

CREATE OR REPLACE VIEW foodview AS
SELECT f.*, n.portion, n.calories, n.proteins, n.carbohidrates, n.fat, n.cholesterol, c.name AS categoryName
FROM foods f LEFT JOIN nutrients n ON f.nutrientId=n.id LEFT JOIN categories c ON f.categoryId=c.id;

CREATE OR REPLACE VIEW planview AS
SELECT p.*, CONCAT(pat.name," ", pat.lastname) as patientName, pn.proteins, pn.calories, pn.fat, pn.carbohidrates,
ROUND(SUM(pf.portion*fn.proteins),2) as realProteins, ROUND(SUM(pf.portion*fn.fat),2) as realFat,
ROUND(SUM(pf.portion*fn.carbohidrates),2) as realCarbohidrates, ROUND(SUM(pf.portion*fn.calories),2) as realCalories
FROM `plans` p LEFT JOIN nutrients pn ON p.nutrientId=pn.id
LEFT JOIN plan_foods pf ON pf.planId=p.id
LEFT JOIN foods f ON pf.foodId=f.id
LEFT JOIN nutrients fn ON f.nutrientId=fn.id
LEFT JOIN patientview pat ON p.patientId=pat.id
WHERE pf.deletedAt IS NULL AND f.deletedAt IS NULL AND pat.deletedAt IS NULL AND fn.deletedAt IS NULL AND pn.deletedAt IS NULL
GROUP BY p.id