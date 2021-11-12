package TW.Proiect.appUser;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/ProiectTW")
public class AppUserResource {


    private final AppUserService appUserService;

    public AppUserResource(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/all/{AppUserRole}")
    public ResponseEntity<List<AppUser>> getAllUsersByRole (@PathVariable("AppUserRole") AppUserRole role) {
        List<AppUser> users = appUserService.findAllUsersByRole(role);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<AppUser> getUserById (@PathVariable("id") Long id) {
        AppUser user = appUserService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AppUser> addUser(@RequestBody AppUser user){
        AppUser newUser = appUserService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user){
        AppUser updateUser = appUserService.updateAppUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        appUserService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
