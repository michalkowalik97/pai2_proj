package tk.solex.api.message.response;


import tk.solex.api.model.Advertisement;
import tk.solex.api.model.Category;
import tk.solex.api.model.User;

import java.util.Date;

public class AdvertisementDTO  {
    class AdUserDetails {
        public Long id;
        public String email;
        public String username;
        public String address;

        public AdUserDetails(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.username = user.getUsername();
            this.address = user.getAddress();
        }
    }

    private Long id;
    private String title;
    private String description;
    private String photos;
    private String phone;
    private Date dateTime;
    private Category category;
    private AdUserDetails user;
    private String status;


    public AdvertisementDTO(Advertisement advertisement) {
        this.id = advertisement.getId();
        this.title = advertisement.getTitle();
        this.description = advertisement.getDescription();
        this.photos = advertisement.getPhotos();
        this.phone = advertisement.getPhone();
        this.dateTime = advertisement.getDateTime();
        this.category = advertisement.getCategory();
        this.user = new AdUserDetails(advertisement.getUser());
        this.status = advertisement.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public AdUserDetails getUser() {
        return user;
    }

    public void setUser(AdUserDetails user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
