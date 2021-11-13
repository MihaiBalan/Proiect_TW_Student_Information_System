package TW.Proiect.appUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);
    List<AppUser> findByAppUserRole(AppUserRole role);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM AppUser a WHERE a.id = ?1")
    void deleteAppUserById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a SET a.firstName= ?1, a.lastName = ?2 where a.email = ?3")
    void updateAppUser(String firstname, String lastname, String email);

    Optional<AppUser> findAppUserById(Long id);
    
    Optional<Object> findByCNP(String cnp);

    Optional<Object> findByPhone(String phone);

    Optional<Object> findBySerialNumber(String serialNumber);
}
