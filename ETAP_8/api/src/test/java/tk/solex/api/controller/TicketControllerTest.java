package tk.solex.api.controller;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.TicketDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.Advertisement;
import tk.solex.api.model.Ticket;
import tk.solex.api.model.User;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TicketControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserDAO userDAO;

    @Autowired
    TicketDAO ticketDAO;

    @Autowired
    AdvertisementDAO advertisementDAO;

    private Ticket ticket;

    @BeforeAll
   void createTicket() {
        Ticket ticket = new Ticket();
        ticket.setDescription("desc");
        ticket.setReporter(userDAO.findByUsername("user").get());
        ticket.setAdvertisement(advertisementDAO.findAll().get(0));
        ticket.setStatus("PENDING");
        this.ticket = ticketDAO.save(ticket);
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void should_closeTicket() throws Exception {
        mockMvc.perform(
                patch("/api/zamknij-zgloszenie")
                        .param("id",""+this.ticket.getId())
        )
                .andDo(print())
                .andExpect(status().isOk());
    }
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void should_getTickets() throws Exception {
        mockMvc.perform(
                get("/api/zgloszenia")
        )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", password = "user", roles = "USER")
    void should_not_closeTicket_forbidden() throws Exception {
        mockMvc.perform(
                patch("/api/zamknij-zgloszenie")
                        .param("id",""+this.ticket.getId())
        )
                .andDo(print())
                .andExpect(status().is(403));
    }

    @Test
    void should_not_closeTicket_unauthenticated() throws Exception {
        mockMvc.perform(
                patch("/api/zamknij-zgloszenie")
                        .param("id",""+this.ticket.getId())
        )
                .andDo(print())
                .andExpect(status().is(401));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void newTicket() throws Exception {
        String model = "{"
                + "\"description\":\"TestDesc\","
                + "\"adId\":"+advertisementDAO.findAll().get(0).getId()
                + "}";
        mockMvc.perform(
                    post("/api/nowe-zgloszenie")
                        .param("model", model)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @AfterAll
    void removeTicket() {
        ticketDAO.delete(this.ticket);
    }
}