namespace NetCoreMicroserviceSample.Api
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Hosting;
    using Microsoft.OpenApi.Models;
    using NetCoreMicroserviceSample.Api.Repository;
    using Serilog;
    using Swashbuckle.AspNetCore.SwaggerGen;
    using System.Diagnostics.CodeAnalysis;

    public class Startup
    {
        [SuppressMessage("Design", "CA1812", Justification = "Instantiated by Swashbuckle")]
        private class AdditionalParametersDocumentFilter : IDocumentFilter
        {
            public void Apply(OpenApiDocument openApiDoc, DocumentFilterContext context)
            {
                foreach (var schema in context.SchemaRepository.Schemas)
                {
                    if (schema.Value.AdditionalProperties == null)
                    {
                        schema.Value.AdditionalPropertiesAllowed = true;
                    }
                }
            }
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MachineVisualizerDataContext>(options => options.UseInMemoryDatabase("machines"));

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                    {
                        // In practice, be more restrictive regarding CORS
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NetCoreMicroserviceSample.Api", Version = "v1" });
                c.DocumentFilter<AdditionalParametersDocumentFilter>();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, MachineVisualizerDataContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NetCoreMicroserviceSample.Api v1"));
                dbContext.Database.EnsureCreated();
            }

            var fp = new ManifestEmbeddedFileProvider(typeof(Startup).Assembly, "wwwroot");
            app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = fp });
            app.UseStaticFiles(new StaticFileOptions { FileProvider = fp });

            app.UseCors();

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
