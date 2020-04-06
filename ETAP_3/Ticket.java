@Entity
@Table(name="ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    @OneToOne
    private Advertisement advertisement;

    @OneToOne
    private User reporter;

    private String description;

    private String status;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public Advertisement getAdvertisement() {
        return advertisement;
    }

    public void setAdvertisement(Advertisement advertisement) {
        this.advertisement = advertisement;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
