package TW.Proiect.Registration;

import TW.Proiect.Email.EmailSender;
import TW.Proiect.Registration.token.ConfirmationToken;
import TW.Proiect.Registration.token.ConfirmationTokenService;
import TW.Proiect.appUser.AppUser;
import TW.Proiect.appUser.AppUserRole;
import TW.Proiect.appUser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Email is not valid");
        }

        String token = appUserService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getBirthday(),
                        request.getPictureUrl(),
                        request.getCounty(),
                        request.getCollege(),
                        request.getPhone(),
                        request.getStudyType(),
                        request.getSpecialization(),
                        request.getSerialNumber(),
                        request.getTax(),
                        request.getCNP(),
                        request.getCI(),
                        request.getYear(),
                        request.getGender(),
                        request.getAppUserRole()
                )
        );

        String link = "http://localhost:8080/ProiectTW/confirm?token=" + token;
        emailSender.send(
                request.getEmail(),
                buildEmail(request.getFirstName(), link));

        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail());
        return "confirmed";
    }

    private String buildEmail(String name, String link) {
        return "Hi " + name + "! Thank you for registering. Please click on the link to activate your account: " + link + "\n Link will expire in 15 minutes!";
    }
}