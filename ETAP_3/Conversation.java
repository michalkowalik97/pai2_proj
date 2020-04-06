@Entity
@Table(name="conversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    @OneToOne
    private Advertisement advertisement;

    @OneToOne
    private User client;

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

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }
}
