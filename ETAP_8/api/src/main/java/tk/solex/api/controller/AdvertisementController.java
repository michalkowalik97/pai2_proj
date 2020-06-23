package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.CategoryDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.message.response.AdvertisementDTO;
import tk.solex.api.model.Advertisement;
import tk.solex.api.model.Category;
import tk.solex.api.model.User;
import tk.solex.api.service.FileStorageService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api")
public class AdvertisementController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AdvertisementDAO advertisementDAO;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private CategoryDAO categoryDAO;

    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @GetMapping("/edytuj-ogloszenie")
    public String editAd(@RequestParam Long id) {
        return advertisementDAO.findById(id).get().toString();
    }




    /**
     * Metoda pozwalająca na edytowanie istniejącego ogłoszenia
     *
     * @param request
     * @param model   JSON zawierający zedytowane dane ogłoszenia
     * @param files   pliki zawierające zdjęcia do ogłoszenia
     * @return Komunikat informujący czy udało się przeprowadzić edycję
     * @throws IOException
     */
    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @PutMapping("/edytuj-ogloszenie")
    public String editAd(HttpServletRequest request, @RequestParam("model") String model, @RequestParam("files") MultipartFile[] files) throws IOException {
        Advertisement advertisement = getAdvertisementFromModel(model);
        Advertisement oldAd = advertisementDAO.getOne(advertisement.getId());
        advertisement.setDateTime(oldAd.getDateTime());
        try {
            advertisement.setPhotos(uploadPhotos(files));
            removeOldPhotos(oldAd.getPhotos());
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "Failed to upload the file";
        }
        advertisement.setUser(getUser(request));
        advertisement.setCategory(getCategoryFromJson(model));

        advertisementDAO.save(advertisement);
        return "Updated";
    }




    /**
     * Metoda usuwająca stare zdjęcia z ogłoszenia
     *
     * @param photos nazwy plików ze zdjęciami
     * @throws IOException
     */
    private void removeOldPhotos(String photos) throws IOException {
        JSONParser parser = new JSONParser(photos);
        ArrayList<Object> messageJson = null;
        try {
            messageJson = parser.parseArray();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        for (Object file : messageJson) {
            fileStorageService.delete((String) file);
        }
    }




    /**
     * Metoda pozwalająca na dodanie nowego ogłoszenia
     *
     * @param request
     * @param model   JSON zawierający dane potrzebne do utworzenia nowego ogłoszenia
     * @param files   pliki ze zdjęciami do ogłoszenia
     * @return Komunikat informujacy czy udało się dodać nowe ogłosznie
     * @throws IOException Wyjątek związany z przesyłaniem plików
     */
    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/nowe-ogloszenie", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public String newAd(HttpServletRequest request, @RequestParam("model") String model, @RequestParam("files") MultipartFile[] files) throws IOException {
        request.setCharacterEncoding("UTF-8");
        Advertisement advertisement = getAdvertisementFromModel(model);
        try {
            advertisement.setPhotos(uploadPhotos(files));
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "Failed to upload the file";
        }
        advertisement.setUser(getUser(request));
        advertisement.setCategory(getCategoryFromJson(model));
        advertisement.setStatus("PENDING");

        advertisementDAO.save(advertisement);
        return "Uploaded";
    }




    /**
     * Metoda zwracająca konkretne ogłoszenie po numerze ID
     *
     * @param request request
     * @param id   Numer ID żądanego ogłoszenia
     * @return Żądane ogłoszenie
     */
    @ResponseBody
    @RequestMapping(value = "/public/ogloszenie", method = RequestMethod.GET)
    public ResponseEntity getAdById(HttpServletRequest request, @RequestParam Long id){
        Advertisement ad = advertisementDAO.findById(id).get();
        if(ad.getStatus() == "PENDING" && getUser(request).getRole().getName() != "ROLE_ADMIN")
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(new AdvertisementDTO(ad));
    }

    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/moje-ogloszenia",method = RequestMethod.GET)
    public ResponseEntity getUsersAds(HttpServletRequest request) {
        return ResponseEntity.ok(
                advertisementDAO.findByUserId(getUser(request).getId())
                        .stream()
                        .map(advertisement -> new AdvertisementDTO(advertisement))
        );
    }

    /**
     * Metoda odpowiedzialna za obsługę wyszukiwarki ogłoszeń
     *
     * @param request request
     * @param query   JSON zawierający pola "query" czyli szukaną frazę oraz "categoryId"
     * @return Lista znalezionych ogłoszeń
     */
    @ResponseBody
    @RequestMapping(value = "/public/szukaj", method = RequestMethod.GET)
    public ResponseEntity searchAd(HttpServletRequest request, @RequestParam(required = false,defaultValue = "") String query, @RequestParam(required = false) String catId) {

        if (catId == null) {
            return ResponseEntity.ok(
                    advertisementDAO.findByTitleContainingAndStatus(query,"OPEN")
                            .stream()
                            .map(advertisement -> new AdvertisementDTO(advertisement))
            );

        } else {
            long categoryId = Long.parseLong(catId);
            List<Category> categories = null;

            if (categoryId > 0)
                categories = categoryDAO.findAllById(Collections.singleton(categoryId));

            categories = getSubcategories(categories, categories);
            if (categories.isEmpty() || categories == null) {
                return ResponseEntity.ok(
                        advertisementDAO.findByTitleContainingAndStatus(query,"OPEN")
                                .stream()
                                .map(advertisement -> new AdvertisementDTO(advertisement))
                );
            } else {
                return ResponseEntity.ok(
                        advertisementDAO.findByTitleContainingAndCategoryInAndStatus(query, categories, "OPEN")
                                .stream()
                                .map(advertisement -> new AdvertisementDTO(advertisement))
                );
            }
        }
    }

    @ResponseBody
    @RequestMapping(value = "/public/podkategorie", method = RequestMethod.GET)
    public ResponseEntity searchAd(HttpServletRequest request,  @RequestParam String catId) {

        long categoryId = Long.parseLong(catId);
        List<Category> categories = null;

        if (categoryId > 0)
            categories = categoryDAO.findAllById(Collections.singleton(categoryId));

        categories = getSubcategories(categories, categories);
        return ResponseEntity.ok(categories);
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/pending-ads", method = RequestMethod.GET)
    public ResponseEntity getPendingAds(HttpServletRequest request) {
        return ResponseEntity.ok(advertisementDAO.findByStatus("PENDING")
                .stream()
                .map(advertisement ->
                    new AdvertisementDTO(advertisement)
                )
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(value = "/accept-ad", method = RequestMethod.PATCH)
    public ResponseEntity acceptAd(HttpServletRequest request, @RequestBody String model) {

        Advertisement ad = advertisementDAO.findById(getIdFromJson(model)).get();
        ad.setStatus("OPEN");
        advertisementDAO.save(ad);
        return ResponseEntity.ok("updated");
    }

    @PreAuthorize("hasAnyRole('USER,ADMIN')")
    @RequestMapping(value = "/close-ad", method = RequestMethod.PATCH)
    public ResponseEntity closeAd(HttpServletRequest request, @RequestBody String model) {

        Advertisement ad = advertisementDAO.findById(getIdFromJson(model)).get();
        if(!(getUser(request).getRole().getName().equals("ROLE_ADMIN")) && !getUser(request).equals(ad.getUser()))
            return ResponseEntity.status(401).build();
        ad.setStatus("CLOSED");
        advertisementDAO.save(ad);
        return ResponseEntity.ok("closed");
    }

        @GetMapping(value = "/public/resources/images/{path}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImage(HttpServletResponse response, @PathVariable String path) throws IOException {
        response.addHeader("Content-Type","image/png");
        return fileStorageService.getImageBytes(path);
    }

    /**
     * Metoda rekurencyjna pozwalająca pobrać listę wszystkich podkategorii
     *
     * @param allCategories lista wszystkich dotychczas pobranych kategorii
     * @param lowestLevel   lisa kategorii najniższego poziomu w iteracji
     * @return lista wszystkich podkategorii
     */
    public List<Category> getSubcategories(List<Category> allCategories, List<Category> lowestLevel) {

        List<Category> result = categoryDAO.findByParentIn(lowestLevel);
        if (result.isEmpty())
            return allCategories;
        allCategories.addAll(result);
        return getSubcategories(allCategories, result);
    }

    /**
     * Metoda pozwalająca na przetworzenie ogłoszenia zapisanego jako JSON na obiekt
     * <p>
     * <p>
     * Metoda pozwalająca na przetworzenie ogłoszenia zapisanego jako JSON na obiekt
     *
     * @param model JSON zawierający ogłoszenie
     * @return obiekt zawierający ogłoszenie
     * @throws JsonProcessingException
     */
    private Advertisement getAdvertisementFromModel(@RequestParam("model") String model) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(model, Advertisement.class);
    }

    /**
     * Metoda zwracająca ścieżki do przesłanych zdjęć
     *
     * @param files pliki zawierające zdjęcia ogłoszenia
     * @return pliki ze zdjęciami
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */

    private String uploadPhotos(MultipartFile[] files) throws IOException, NoSuchAlgorithmException {

        String photos = "[";
        for (MultipartFile file : files) {
            if (photos.equals("["))
                photos += "\"" + fileStorageService.upload(file) + "\"";
            else
                photos += ", \"" + fileStorageService.upload(file) + "\"";
        }
        photos += "]";
        return photos;
    }

    /**
     * Metoda zwracająca aktualnie zalogowanego użytkownika.
     *
     * @param request
     * @return aktualnie zalogowany użytkownik
     */
    private User getUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        Optional<User> optionalUser = userDAO.findByUsername(principal.getName());
        return optionalUser.get();
    }

    /**
     * Metoda zwracająca kategorię na podstawie id kategori zawartego w JSON
     *
     * @param model
     * @return obiekt odpowiedniej kategorii
     */
    private Category getCategoryFromJson(@RequestParam("model") String model) {
        JSONParser parser = new JSONParser(model);
        LinkedHashMap<String, Object> messageJson = null;
        try {
            messageJson = parser.parseObject();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        BigInteger id = (BigInteger) messageJson.get("categoryId");
        return categoryDAO.getOne(id.longValue());
    }
    private Long getIdFromJson(String model) {
        JSONParser parser = new JSONParser(model);
        LinkedHashMap<String, Object> messageJson = null;
        try {
            messageJson = parser.parseObject();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        BigInteger id = (BigInteger) messageJson.get("id");
        return id.longValue();
    }


}
