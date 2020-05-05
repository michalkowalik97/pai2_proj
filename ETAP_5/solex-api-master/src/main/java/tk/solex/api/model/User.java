package tk.solex.api.model;

import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String email;
    private String username;
    private String passwordHash;
    private String address;
    private Date signupDateTime;

    @ManyToOne
    private Role role;

    public User(){}

    public User(String email, String username, String passwordHash, String address, Date signupDateTime, Role role) {
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.address = address;
        this.signupDateTime = signupDateTime;
        this.role = role;
    }

    public User(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.passwordHash = user.getPasswordHash();
        this.address = user.getAddress();
        this.signupDateTime = user.getSignupDateTime();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getSignupDateTime() {
        return signupDateTime;
    }

    public void setSignupDateTime(Date signupDateTime) {
        this.signupDateTime = signupDateTime;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", address='" + address + '\'' +
                ", signupDateTime=" + signupDateTime +
                ", role=" + role +
                '}';
    }
}