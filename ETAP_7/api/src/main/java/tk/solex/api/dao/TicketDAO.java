package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Ticket;

import java.util.List;

public interface TicketDAO extends JpaRepository<Ticket,Long> {
    public List<Ticket> findAllByStatus(String status);
}
