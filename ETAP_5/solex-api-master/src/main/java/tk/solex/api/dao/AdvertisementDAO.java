package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Advertisement;

public interface AdvertisementDAO extends JpaRepository <Advertisement,Long> {
}
