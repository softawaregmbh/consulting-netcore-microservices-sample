namespace NetCoreMicroserviceSample.Api.Repository
{
    using Microsoft.EntityFrameworkCore;
    using NetCoreMicroserviceSample.Api.Domain;
    using System;

    public class MachineVisualizerDataContext : DbContext
    {
        public DbSet<Machine> Machines { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public MachineVisualizerDataContext(DbContextOptions<MachineVisualizerDataContext> options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Machine>().HasData(new
            {
                Id = Guid.NewGuid(),
                Name = "Machine 1",
                Description = "Description 1",
                ImageUrl = "machine1.jpg",
            });
            modelBuilder.Entity<Machine>().HasData(new
            {
                Id = Guid.NewGuid(),
                Name = "Machine 2",
                Description = "Description 2",
                ImageUrl = "machine2.jpg",
            });
            modelBuilder.Entity<Machine>().HasData(new
            {
                Id = Guid.NewGuid(),
                Name = "Machine 3",
                Description = "Description 3",
                ImageUrl = "machine3.jpg",
            });
        }
    }
}
