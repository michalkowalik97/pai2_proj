package tk.solex.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tk.solex.api.config.jwt.JwtProvider;
import tk.solex.api.dao.RoleDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.message.request.RegisterDTO;
import tk.solex.api.model.User;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private JwtProvider provider;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDTO registerDTO) {
        if(userDAO.existsByUsername(registerDTO.getUsername()))
            return new ResponseEntity<>("Username already taken", HttpStatus.BAD_REQUEST);
        if(userDAO.existsByEmail(registerDTO.getEmail()))
            return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);

        User user = new User(
                registerDTO.getEmail(),
                registerDTO.getUsername(),
                passwordEncoder.encode(registerDTO.getPassword()),
                registerDTO.getAddress(),
                new Date(System.currentTimeMillis()),
                roleDAO.findByName("ROLE_USER").get()
        );
        userDAO.save(user);
        return ResponseEntity.ok("User registered");
    }

}
