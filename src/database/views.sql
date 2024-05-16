CREATE OR REPLACE VIEW infoview AS
SELECT i.email, i.phone, i.dni, i.gender, i.infoType, i.infoId, i.note, i.addressId,
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
SELECT f.*, n.cant, m.name AS measure, m.sigla, n.calories, n.proteins, n.carbohidrates, n.fat, n.cholesterol,
n.measureId, c.name AS categoryName FROM foods f LEFT JOIN nutrients n ON f.nutrientId=n.id LEFT JOIN measures m
 ON n.measureId=m.id LEFT JOIN categories c ON f.categoryId=c.id;