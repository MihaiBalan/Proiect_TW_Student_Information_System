package TW.Proiect.Registration;

import TW.Proiect.appUser.AppUserGender;
import TW.Proiect.appUser.AppUserRole;
import TW.Proiect.appUser.AppUserStudyType;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.net.URL;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private final AppUserRole appUserRole;
    private final String birthday;
    private final String pictureUrl;
    private final String county;
    private final String college;
    private final String phone;
    private final AppUserStudyType studyType;
    private final String specialization;
    private final String serialNumber;
    private final Boolean tax;
    private final String CNP;
    private final String CI;
    private final Integer year;
    private final AppUserGender gender;
}
