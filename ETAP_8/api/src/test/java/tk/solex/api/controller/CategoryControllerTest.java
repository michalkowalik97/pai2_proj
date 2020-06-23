package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tk.solex.api.dao.RoleDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.message.request.RegisterDTO;
import tk.solex.api.model.Role;
import tk.solex.api.model.User;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CategoryControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void should_getAllCategories() throws Exception {
        mockMvc.perform(get("/api/public/getAllCategories")).andDo(print()).andExpect(status().isOk());
    }
    @Test
    void should_getAllCategories_onlyMain() throws Exception {
        mockMvc.perform(get("/api/public/getAllCategories").queryParam("onlyMain","true")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    void should_getCategory() throws Exception {
        mockMvc.perform(get("/api/public/getCategory").queryParam("id","1")).andDo(print()).andExpect(status().isOk());
    }
}