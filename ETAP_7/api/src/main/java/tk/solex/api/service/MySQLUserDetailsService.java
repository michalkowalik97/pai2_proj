package tk.solex.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.User;
import tk.solex.api.model.UserDetailsImpl;

import java.util.Optional;

@Service
public class MySQLUserDetailsService implements UserDetailsService {
    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userDAO.findByUsername(username);
        optionalUser.orElseThrow(()-> new UsernameNotFoundException("Username '"+username+"' not found!"));
        return UserDetailsImpl.build(optionalUser.get());
    }
}
