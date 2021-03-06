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

    List<AppUser> findByAppUserRole(AppUserRole role);

    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM AppUser a WHERE a.id = ?1")
    void deleteAppUserById(Long id);

    Optional<AppUser> findById(Long id);

    Optional<Object> findByCNP(String cnp);

    Optional<Object> findBySerialNumber(String serialNumber);

    Optional<Object> findByPhone(String phone);

}
