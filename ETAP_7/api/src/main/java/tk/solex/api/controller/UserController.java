package tk.solex.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tk.solex.api.dao.RoleDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.Role;
import tk.solex.api.model.User;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    /**
     * Metoda pozwalająca na podwyzszenie poziomu uprawnień użytkownika
     * @param userId Id użytkownika
     * @return Komunikat informujący czy udało się dodać użytkownika
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/elevate")
    public String elevateUser(@RequestParam Long userId) {
        Role role = roleDAO.findByName("ROLE_ADMIN").get();
        User user = userDAO.findById(userId).get();
        user.setRole(role);
        userDAO.save(user);
        return "User "+user.getUsername()+" has been elevated to role "+role.getName()+".";
    }

    /**
     * Metoda zwracająca wszystkich użytkowników
     * @return Dane wszystkich użytkowników zapisanych w bazie
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAll")
    public List<User> getUsers() {
        return (List<User>) userDAO.findAll();
    }
}
