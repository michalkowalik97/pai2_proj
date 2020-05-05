package tk.solex.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String homePage() {
        return "<html><body><h1>Home Page</h1></body></html>";
    }
}
