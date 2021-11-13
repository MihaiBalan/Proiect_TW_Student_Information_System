package TW.Proiect.appUser;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {

    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String birthday;
    private String pictureURL;
    private String county;
    private String college;
    private String phone;
    private String specialization;
    private String serialNumber;
    private Boolean tax;
    private String CNP;
    private String CI;
    private Integer year;
    @Enumerated(EnumType.STRING)
    private AppUserStudyType studyType;
    @Enumerated(EnumType.STRING)
    private AppUserGender gender;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    private Boolean locked = false;
    private Boolean enabled = false;

    public AppUser(String firstName, String lastName, String email, String password, String birthday, String pictureURL, String county, String college, String phone, AppUserStudyType studyType, String specialization, String serialNumber, Boolean tax, String CNP, String CI, Integer year, AppUserGender gender, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.pictureURL = pictureURL;
        this.county = county;
        this.college = college;
        this.phone = phone;
        this.studyType = studyType;
        this.specialization = specialization;
        this.serialNumber = serialNumber;
        this.tax = tax;
        this.CNP = CNP;
        this.CI = CI;
        this.year = year;
        this.gender = gender;
        this.appUserRole = appUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
