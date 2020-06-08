package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Advertisement;
import tk.solex.api.model.User;

import java.util.List;


public interface AdvertisementDAO extends JpaRepository <Advertisement,Long> {
    public List<Advertisement> findAdvertisementsByUser(User user);
}
