package tk.solex.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tk.solex.api.dao.RoleDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.User;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserDAO dao;

    @Autowired
    private RoleDAO roleDAO;

    @PostMapping("/new")
    public String addUser(@RequestBody User user) {
        System.out.println(user.toString());
        user.setSignupDateTime(new Date());
        user.setRole(roleDAO.findRoleByName("USER"));
        dao.save(user);
        return "User "+user.getUsername()+" saved";
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/secured/getAll")
    public List<User> getUsers() {
        return (List<User>) dao.findAll();
    }
}
