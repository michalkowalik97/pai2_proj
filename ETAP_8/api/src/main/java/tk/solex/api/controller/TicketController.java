package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.TicketDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.message.response.TicketDTO;
import tk.solex.api.model.Advertisement;
import tk.solex.api.model.Ticket;
import tk.solex.api.model.User;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TicketController {

    @Autowired
    UserDAO userDAO;

    @Autowired
    TicketDAO ticketDAO;

    @Autowired
    AdvertisementDAO advertisementDAO;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/zgloszenia", method = RequestMethod.GET)
    public ResponseEntity getTickets(HttpServletRequest request, @RequestParam(required = false,defaultValue = "") String status) {
        return ResponseEntity.ok(ticketDAO.findByStatusContaining(status)
                .stream()
                .map(ticket ->
                        new TicketDTO(ticket)
                )
        );
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PatchMapping("/zamknij-zgloszenie")
    public String closeTicket(@RequestParam Long id) {
        Ticket ticket = ticketDAO.getOne(id);
        if(ticket.getStatus().equals("CLOSED"))
            return "The ticket was already closed";
        ticket.setStatus("CLOSED");
        ticketDAO.save(ticket);
        return "Closed";
    }

    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @PostMapping("/nowe-zgloszenie")
    public String newTicket(HttpServletRequest request, @RequestParam("model") String model) throws JsonProcessingException {
        Ticket ticket = getTicketFromModel(model);
        ticket.setReporter(getUser(request));
        ticket.setAdvertisement(getAdFromJSON(model));
        ticket.setStatus("PENDING");
        ticketDAO.save(ticket);
        return "Created";
    }

    private Advertisement getAdFromJSON(String model) {
        JSONParser parser = new JSONParser(model);
        LinkedHashMap<String, Object> messageJson = null;
        try {
            messageJson = parser.parseObject();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        BigInteger id = (BigInteger)messageJson.get("adId");
        return advertisementDAO.getOne(id.longValue());
    }

    private Ticket getTicketFromModel(String model) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(model, Ticket.class);
    }
    private User getUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        Optional<User> optionalUser = userDAO.findByUsername(principal.getName());
        return optionalUser.get();
    }
}
