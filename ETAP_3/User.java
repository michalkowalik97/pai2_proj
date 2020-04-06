import java.util.Date;

@Entity
@Table(name = "user")

public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    private String email;
    private String username;
    private String passwordHash;
    private String address;
    private Date signupDateTime;

    @OneToMany
    private int roleId;

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

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
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
                ", roleId=" + roleId +
                '}';
    }
}
