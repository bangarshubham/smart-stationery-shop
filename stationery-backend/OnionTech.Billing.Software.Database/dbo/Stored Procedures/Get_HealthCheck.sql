CREATE PROCEDURE dbo.Get_HealthCheck
AS
BEGIN
   SET NOCOUNT ON;

   SELECT CAST(1 AS INT) AS Status, N'Service is healthy1' AS Message;
END

