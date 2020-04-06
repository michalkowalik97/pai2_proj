import java.util.Date;
import java.util.List;

@Entity
@Table(name="advertisement")
public class Advertisement {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    private String title;

    private String description;

    private List<String> photos; //tego nie jestem pewien czy lista czy zwykły string

    private String phone;

    private String status;

    private Date DateTime;

    @OneToOne
    private User user;

    @OneToOne
    private Category category;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateTime() {
        return DateTime;
    }

    public void setDateTime(Date dateTime) {
        DateTime = dateTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
