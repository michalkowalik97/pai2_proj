package tk.solex.api.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl extends User implements UserDetails {


    public UserDetailsImpl(final User user) {
        super(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Role role = getRole();
        SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_"+role.getName());
        List<GrantedAuthority> authorities = Arrays.asList(grantedAuthority);

        return authorities;
    }

    @Override
    public String getPassword() {
        return super.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
