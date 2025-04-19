# Use the official .NET 9.0 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official ASP.NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose port 5000 for the API
EXPOSE 5090

# Set environment variable for ASP.NET Core URLS
ENV ASPNETCORE_URLS=http://+:5090

# Run the application
ENTRYPOINT ["dotnet", "CafeServer.dll"]
