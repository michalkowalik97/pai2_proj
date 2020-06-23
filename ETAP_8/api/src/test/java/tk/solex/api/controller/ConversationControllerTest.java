package tk.solex.api.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.ConversationDAO;
import tk.solex.api.dao.MessageDAO;
import tk.solex.api.dao.UserDAO;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ConversationControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MessageDAO messageDAO;

    @Autowired
    ConversationDAO conversationDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    AdvertisementDAO advertisementDAO;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void newConversation() throws Exception {
        mockMvc.perform(
            post("/api/nowa-konwersacja")
                .content("{\"advertisement_id\":\"0\"}")
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andDo(print())
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void newMessage() throws Exception {
        mockMvc.perform(
            post("/api/nowa-wiadomosc")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"conversation_id\":\"0\",\"body\":\"Wiadomość testowa\"}")
            )
            .andDo(print())
            .andExpect(status().isOk());
    }
}