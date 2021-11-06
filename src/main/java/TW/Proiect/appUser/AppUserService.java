package TW.Proiect.appUser;

import TW.Proiect.Exception.UserNotFoundException;
import TW.Proiect.Registration.token.ConfirmationToken;
import TW.Proiect.Registration.token.ConfirmationTokenRepository;
import TW.Proiect.Registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final AppUserRepository appUserRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists){
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.

            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public AppUser addUser(AppUser user){
        return appUserRepository.save(user);
    }

    public List<AppUser> findAllUsersByRole(AppUserRole role) {
        return appUserRepository.findByAppUserRole(role);
    }

    public AppUser updateAppUser(AppUser user){
        appUserRepository.updateAppUser(user.getFirstName(), user.getLastName(), user.getEmail());
        return user;
    }

    public void deleteUser(Long id){
        confirmationTokenRepository.deleteConfirmationTokensByAppUserID(appUserRepository.getById(id));
        appUserRepository.deleteAppUserById(id);
    }

    public AppUser findUserById(Long id){
        return appUserRepository.findAppUserById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

}
