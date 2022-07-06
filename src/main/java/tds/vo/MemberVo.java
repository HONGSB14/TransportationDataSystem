package tds.vo;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class MemberVo {

    private int companyNumber;      //회사 고유 번호
    private int memberNumber;       //회원 고유 번호
    private String memberId;                           //회원 아이디
    private String password;              //회원 비밀번호
    private String memberName;     //회원 이름
    private String phone;                   //회원 전화번호
    private String email;                    //회원 이메일

}
