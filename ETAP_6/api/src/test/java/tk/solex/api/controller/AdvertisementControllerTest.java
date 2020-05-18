package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockBodyContent;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.CategoryDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.Advertisement;
import tk.solex.api.service.FileStorageService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AdvertisementControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    AdvertisementDAO advertisementDAO;
    @Autowired
    UserDAO userDAO;
    @Autowired
    CategoryDAO categoryDAO;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void editAd() {
        Path path = Paths.get("src/test/resources/passat.png");
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        }catch (Exception e ){
            e.printStackTrace();
        }

        Advertisement advertisement = new Advertisement();
        advertisement.setId(1);
        advertisement.setTitle("TestTitle");
        advertisement.setDescription("desc");
        advertisement.setPhone("123456789");

        ObjectMapper objectMapper = new ObjectMapper();
        String obj = "";
        try {
            obj = objectMapper.writeValueAsString(advertisement);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        MockMultipartFile photo = new MockMultipartFile("files","passat.png","image/png",content);

        try {
            mockMvc.perform(MockMvcRequestBuilders.multipart("/edytuj-ogloszenie").file(photo).param("model",obj).with(new RequestPostProcessor() {
                @Override
                public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                    request.setMethod("PUT");
                    return request;
                }
            })).andDo(print()).andExpect(status().isOk());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void newAd() {
        Path path = Paths.get("src/test/resources/passat.png");
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        }catch (Exception e ){
            e.printStackTrace();
        }

        Advertisement advertisement = new Advertisement();
        advertisement.setTitle("TestTitle");
        advertisement.setDescription("desc");
        advertisement.setPhone("123456789");

        ObjectMapper objectMapper = new ObjectMapper();
        String obj = "";
        try {
            obj = objectMapper.writeValueAsString(advertisement);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        MockMultipartFile photo = new MockMultipartFile("files","passat.png","image/png",content);

        try {
            mockMvc.perform(MockMvcRequestBuilders.multipart("/nowe-ogloszenie").file(photo).param("model",obj)).andDo(print()).andExpect(status().isOk());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}