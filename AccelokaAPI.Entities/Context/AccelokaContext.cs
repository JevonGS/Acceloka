using AccelokaAPI.Entities.Model;
using Microsoft.EntityFrameworkCore;

namespace AccelokaAPI.Entities.Context;

public partial class AccelokaContext : DbContext
{
    public AccelokaContext()
    {
    }

    public AccelokaContext(DbContextOptions<AccelokaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookedTicketDB> BookedTicketDbs { get; set; }

    public virtual DbSet<TicketDB> TicketDbs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=localhost; Initial Catalog=Acceloka; Integrated Security=True; Encrypt=False");

        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookedTicketDB>(entity =>
        {
            entity.HasKey(e => new { e.BookedTicketId, e.TicketCode });

            entity.ToTable("BookedTicketDB");

            entity.Property(e => e.BookedEventDate).HasColumnType("datetime");
            entity.Property(e => e.BookedTicketId).HasMaxLength(50);
            entity.Property(e => e.TicketCode)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.TicketCodeNavigation).WithMany()
                .HasForeignKey(d => d.TicketCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookedTic__Ticke__4BAC3F29");
        });

        modelBuilder.Entity<TicketDB>(entity =>
        {
            entity.HasKey(e => e.TicketCode);

            entity.ToTable("TicketDB");

            entity.Property(e => e.TicketCode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CategoryName)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.EventDate).HasColumnType("datetime");
            entity.Property(e => e.TicketName)
                .HasMaxLength(64)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
