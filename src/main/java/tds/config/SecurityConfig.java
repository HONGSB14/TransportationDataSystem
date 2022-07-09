package tds.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import tds.service.MemberService;

@Configuration

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    String loginFalse="loginFalse";
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests().antMatchers("/").permitAll()
                .and()
                .formLogin()
                .loginPage("/member/login")
                .loginPage("/member/signupsuccess")
                .loginProcessingUrl("/member/loginController")
                 //UsernamePassword Authentication Token 발생
                .usernameParameter("memberId")
                .passwordParameter("password")
                .failureUrl("/member/login/"+loginFalse)
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/")
                .and()
                .csrf()

                 //회사 가입 시
                .ignoringAntMatchers("/page/company/signup")
                .ignoringAntMatchers("/company/signupController")
                .ignoringAntMatchers("/company/check")
                .ignoringAntMatchers("/company/numberCheck")
                .ignoringAntMatchers("/company/signup")

                //회사 가입 성공 시
                .ignoringAntMatchers("/company/info")

                 //회원 가입 시
                .ignoringAntMatchers("/page/member/signup")
                .ignoringAntMatchers("/company/findNumber")
                .ignoringAntMatchers("/member/signupController")
                .ignoringAntMatchers("/member/signup")

                //회원 가입 성공 시
                .ignoringAntMatchers("/page/member/signupsuccess")

                // 로그인 시
                .ignoringAntMatchers("/page/member/login")
                .ignoringAntMatchers("/member/loginController")
                .ignoringAntMatchers("/member/loginSession")

                //아이디 찾기 시
                .ignoringAntMatchers("/member/findId")
                .ignoringAntMatchers("/member/findIdSuccess")

                //비밀번호 찾기 시
                .ignoringAntMatchers("/member/findPassword")

                //비밀번호 변경 시
                .ignoringAntMatchers("/page/member/findPassword")
                .ignoringAntMatchers("/member/passwordUpdate");
    }
    @Autowired
    private MemberService  memberService;

    @Override
    public void configure(AuthenticationManagerBuilder AMB) throws Exception {
           AMB.userDetailsService(memberService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
