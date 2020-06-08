package tk.solex.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tk.solex.api.config.jwt.JwtProvider;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.message.request.LoginDTO;
import tk.solex.api.message.response.JwtTokenDTO;
import tk.solex.api.model.User;

import javax.xml.ws.Response;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    UserDAO userDAO;

    @Autowired
    JwtProvider provider;

    @Autowired
    AuthenticationManager manager;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );
        User user = userDAO.findByUsername(loginDTO.getUsername()).get();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = provider.generateToken(authentication);

        return ResponseEntity.ok(new JwtTokenDTO(token, user));
    }
}
