package tk.solex.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @RequestMapping("/login")
    public String loginPage() {
        return "<html><h1>Login Page</h1></html>";
    }
}
