using ServiceDI = OnionTech.Billing.Software.Service.DependencyInjection;
using RepositoryDI = OnionTech.Billing.Software.Repository.DependencyInjection;
using InfrastructureDI = OnionTech.Billing.Software.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

//using OnionTech.Billing.Software.Infrastructure;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
InfrastructureDI.AddConfiguration(builder.Services);
RepositoryDI.AddConfiguration(builder.Services);
ServiceDI.AddConfiguration(builder.Services);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
