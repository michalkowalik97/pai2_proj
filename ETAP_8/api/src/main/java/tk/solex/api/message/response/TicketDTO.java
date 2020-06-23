package tk.solex.api.message.response;


import tk.solex.api.model.Advertisement;
import tk.solex.api.model.Ticket;
import tk.solex.api.model.User;

public class TicketDTO  {
    class TicketUserDetails {
        public Long id;
        public String username;

        public TicketUserDetails(User user) {
            this.id = user.getId();
            this.username = user.getUsername();
        }
    }
    class TicketAdDetails {
        public Long id;
        public String title;

        public TicketAdDetails(Advertisement ad) {
            this.id = ad.getId();
            this.title = ad.getTitle();
        }
    }
    private Long id;
    private String description;
    private TicketAdDetails ad;
    private TicketUserDetails reporter;
    private String status;

    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.description = ticket.getDescription();
        this.ad = new TicketAdDetails(ticket.getAdvertisement());
        this.reporter = new TicketUserDetails(ticket.getReporter());
        this.status = ticket.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TicketAdDetails getAd() {
        return ad;
    }

    public void setAd(TicketAdDetails ad) {
        this.ad = ad;
    }

    public TicketUserDetails getReporter() {
        return reporter;
    }

    public void setReporter(TicketUserDetails reporter) {
        this.reporter = reporter;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
