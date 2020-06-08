package tk.solex.api.message.response;


import tk.solex.api.model.Role;
import tk.solex.api.model.User;

public class JwtTokenDTO {
    class BrowserUserDetails {
        public String username;
        public String email;
        public Role role;

        public BrowserUserDetails(User user){
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.role = user.getRole();
        }

    }
    private String token;
    private String type = "Bearer";
    private BrowserUserDetails userDetails;

    public JwtTokenDTO(String token) {
        this.token = token;
    }
    public JwtTokenDTO(String token, User user){
        this.token = token;
        this.userDetails = new BrowserUserDetails(user);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BrowserUserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(BrowserUserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
