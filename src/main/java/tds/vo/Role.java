package tds.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
    MEMBER("ROLE_MEMBER", "MEMBER"),
    ADMIN("ROLE_ADMIN","ADMIN");

    private final String key;
    private final String value;
}
