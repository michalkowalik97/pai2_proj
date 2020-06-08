package tk.solex.api.controller;

import org.junit.jupiter.api.Test;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TicketControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserDAO userDAO;

    @Autowired
    TicketDAO ticketDAO;

    @Autowired
    AdvertisementDAO advertisementDAO;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void closeTicket() throws Exception {
        mockMvc.perform(
                    put("/zamknij-zgloszenie")
                        .param("id","17")
                    )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void newTicket() throws Exception {
        String model = "{"
                + "\"description\":\"TestDesc\","
                + "\"adId\":14"
                + "}";
        mockMvc.perform(
                    post("/nowe-zgloszenie")
                        .param("model", model)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }
}