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

        boolean checkValue = true;

        if( appUserRepository.findByCNP(appUser.getCNP()).isPresent() )
            {checkValue = false;
            throw new IllegalStateException("User with this CNP already exists");}

        else if( appUser.getAppUserRole() == AppUserRole.Student && appUserRepository.findBySerialNumber(appUser.getSerialNumber()).isPresent() )
            {checkValue = false;
                throw new IllegalStateException("A Student with this Serial Number already exists");
            }

        else if( appUserRepository.findByPhone(appUser.getPhone()).isPresent() )
            {checkValue = false;
                throw new IllegalStateException("This Phone Number is already used by another user");
            }
        else if (appUserRepository.findByEmail(appUser.getEmail()).isPresent() )
            {if( (LocalDateTime.now().isAfter(confirmationTokenRepository.findConfirmationTokenByAppUser(appUser).getExpiresAt())) && (confirmationTokenRepository.findConfirmationTokenByAppUser(appUser).getConfirmedAt()) == null)
                appUserRepository.deleteAppUserById(appUser.getId());
            else
                {checkValue = false;
                throw new IllegalStateException("This email is already taken");}}

        if(checkValue){
            String encodedPassword = bCryptPasswordEncoder
                    .encode(appUser.getPassword());

            appUser.setPassword(encodedPassword);

            appUserRepository.save(appUser);

            String token = UUID.randomUUID().toString();

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    appUser);

            confirmationTokenService.saveConfirmationToken(confirmationToken);

            return token;}
        return null;
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
        return appUserRepository.save(user);
    }

    public void deleteUser(Long id){
        confirmationTokenRepository.deleteConfirmationTokensByAppUserID(appUserRepository.getById(id));
        appUserRepository.deleteAppUserById(id);
    }

    public AppUser findAppUserById(Long id){
        return appUserRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public AppUser findAppUserByEmail(String email) {
        return appUserRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User by email " + email + " was not found"));
    }

    public String cryptPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }
}
