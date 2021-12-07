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

    @GetMapping("/findById/{id}")
    public ResponseEntity<AppUser> getAppUserById (@PathVariable("id") Long id) {
        AppUser user = appUserService.findAppUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<AppUser> getAppUserByEmail (@PathVariable("email") String email) {
        AppUser user = appUserService.findAppUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

   /* @GetMapping("/cryptPass/{password}")
    public ResponseEntity<String> cryptPassword (@PathVariable("password") String password) {
        String cryptedPass = appUserService.cryptPassword(password);
        return new ResponseEntity<>(cryptedPass, HttpStatus.OK);
    } */

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
