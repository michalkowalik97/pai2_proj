package tk.solex.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.User;
import tk.solex.api.model.UserDetailsImpl;

import java.util.Optional;

@Service
public class MySQLUserDetailsService implements UserDetailsService {
    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> optionalUser = userDAO.findByUsername(s);
        optionalUser
                .orElseThrow(()-> new UsernameNotFoundException("Username not found!"));
        return optionalUser
                .map(UserDetailsImpl::new).get();
    }
}
