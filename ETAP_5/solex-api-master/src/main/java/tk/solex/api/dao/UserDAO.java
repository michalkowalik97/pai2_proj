package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tk.solex.api.model.User;

import java.util.Optional;


public interface UserDAO extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
