package tds.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberVo {

    private int companyNumber;      //회사 고유 번호
    private int memberNumber;       //회원 고유 번호
    private String id;                           //회원 아이디
    private String password;              //회원 비밀번호
    private String name;                    //회원 이름
    private String phone;                   //회원 전화번호
    private String email;                    //회원 이메일

}
