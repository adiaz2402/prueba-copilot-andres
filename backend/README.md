# .NET Backend Setup

## Prerequisites
- .NET 8 SDK
- MySQL Server

## Setup

1. Update the connection string in `appsettings.json` with your MySQL credentials.
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Apply migrations and update the database:
   ```bash
   dotnet ef database update
   ```
4. Run the API:
   ```bash
   dotnet run
   ```
5. The API will be available at `http://localhost:5000/api/products`.

## Project Structure
- `Controllers/ProductController.cs`: REST API for Product entity.
- `Models/Product.cs`: Product entity definition.
- `Data/AppDbContext.cs`: Entity Framework Core DB context.

## Notes
- Uses Entity Framework Core with Pomelo.EntityFrameworkCore.MySql provider.
