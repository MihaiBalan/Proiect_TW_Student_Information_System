package TW.Proiect.Registration;

import TW.Proiect.appUser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/ProiectTW")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(path = "/add")
    public String register(@RequestBody AppUser user){
        return registrationService.register(user);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }
}
